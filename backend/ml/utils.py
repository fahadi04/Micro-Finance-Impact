import pandas as pd
import numpy as np
import mongoengine
from api.models import Borrower, Loan, Repayment, Prediction

def borrowers_to_df():
    rows = []
    for b in Borrower.objects:
        rows.append({
            "borrower_id": b.borrower_id,
            "age": b.age or np.nan,
            "gender": b.gender or "",
            "education": b.education or "",
            "business_type": b.business_type or "",
            "monthly_income": b.monthly_income or 0.0
        })
    return pd.DataFrame(rows)

def loans_to_df():
    rows = []
    for l in Loan.objects:
        rows.append({
            "loan_id": l.loan_id,
            "borrower_id": l.borrower.borrower_id if l.borrower else None,
            "amount": l.amount or 0.0,
            "interest_rate": l.interest_rate or 0.0,
            "term_months": l.term_months or 0,
            "status": l.status
        })
    return pd.DataFrame(rows)

def repayments_to_df():
    rows = []
    for r in Repayment.objects:
        rows.append({
            "repayment_id": r.repayment_id,
            "loan_id": r.loan.loan_id if r.loan else None,
            "date": r.date,
            "amount": r.amount or 0.0,
            "status": r.status
        })
    return pd.DataFrame(rows)
