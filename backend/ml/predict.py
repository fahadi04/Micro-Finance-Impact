import joblib, os
import numpy as np
from .utils import borrowers_to_df, loans_to_df, repayments_to_df
from api.models import Borrower, Loan, Prediction
from datetime import datetime

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
clf_path = os.path.join(MODEL_DIR, "rf_default.pkl")
reg_path = os.path.join(MODEL_DIR, "rf_income.pkl")
clf = joblib.load(clf_path) if os.path.exists(clf_path) else None
reg = joblib.load(reg_path) if os.path.exists(reg_path) else None

def feature_vector_for(borrower_id, loan_id=None):
    # naive one-row feature builder (same fields as train)
    b = Borrower.objects(borrower_id=borrower_id).first()
    l = Loan.objects(loan_id=loan_id).first() if loan_id else None
    if not b:
        raise ValueError("borrower not found")
    amount = l.amount if l else 0.0
    interest_rate = l.interest_rate if l else 0.0
    term_months = l.term_months if l else 0
    paid_amount = 0.0
    n_repayments = 0
    late_count = 0
    missed_count = 0
    if l:
        for r in l.repayment_set if hasattr(l, "repayment_set") else []:
            pass
    # simpler: query repayment collection
    from api.models import Repayment
    repayments = Repayment.objects(loan=l) if l else []
    for r in repayments:
        paid_amount += r.amount or 0.0
        n_repayments += 1
        if r.status == "late": late_count += 1
        if r.status == "missed": missed_count += 1

    gender_m = 1 if (b.gender or "").lower() == "male" else 0

    X = [amount, interest_rate, term_months, b.monthly_income or 0.0, paid_amount, n_repayments, late_count, missed_count, gender_m]
    return np.array(X).reshape(1, -1)

def predict_for_borrower(borrower_id, loan_id=None):
    fv = feature_vector_for(borrower_id, loan_id)
    result = {}
    if clf:
        p_default = float(clf.predict_proba(fv)[:,1][0])
    else:
        p_default = 0.05
    if reg:
        inc_delta = float(reg.predict(fv)[0])
    else:
        inc_delta = 0.0

    # transform into survival prob etc (toy)
    survival_prob = max(0.0, 1 - p_default)
    res = {
        "borrower_id": borrower_id,
        "loan_id": loan_id,
        "pred_default_prob": p_default,
        "pred_income_delta": inc_delta,
        "pred_survival_prob": survival_prob,
        "timestamp": datetime.utcnow().isoformat()
    }

    # Save to Predictions collection
    try:
        b = Borrower.objects(borrower_id=borrower_id).first()
        l = Loan.objects(loan_id=loan_id).first() if loan_id else None
        p = Prediction(borrower=b, loan=l, pred_income_delta=inc_delta, pred_default_prob=p_default, pred_survival_prob=survival_prob, model_name="rf_default_income", metadata={})
        p.save()
    except Exception as e:
        print("Warning: failed to save prediction:", e)

    return res
