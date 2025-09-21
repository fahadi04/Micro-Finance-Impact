import os
import joblib
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.model_selection import train_test_split
from sklearn.metrics import roc_auc_score, mean_squared_error
from .utils import borrowers_to_df, loans_to_df, repayments_to_df

MODEL_DIR = os.path.join(os.path.dirname(__file__), "models")
os.makedirs(MODEL_DIR, exist_ok=True)

def build_features():
    bdf = borrowers_to_df()
    ldf = loans_to_df()
    rdf = repayments_to_df()

    df = ldf.merge(bdf, on="borrower_id", how="left")
    # Aggregated repayment features:
    rep_summary = rdf.groupby("loan_id").agg(
        paid_amount=("amount", "sum"),
        n_repayments=("repayment_id", "count"),
        late_count=("status", lambda x: (x=="late").sum()),
        missed_count=("status", lambda x: (x=="missed").sum())
    ).reset_index()

    df = df.merge(rep_summary, left_on="loan_id", right_on="loan_id", how="left")
    df.fillna(0, inplace=True)

    # Create target(s) — for demo we make default label heuristic:
    # If missed_count > 0 and late_count > 1 -> default (1), else 0
    df["default_label"] = ((df["missed_count"] > 0) & (df["late_count"] > 1)).astype(int)
    # Income delta: synthetic: new_monthly_income - monthly_income
    df["future_income"] = df["monthly_income"] * (1 + np.random.normal(0.02, 0.1, size=len(df)))
    df["income_delta"] = df["future_income"] - df["monthly_income"]

    # select features
    df["gender_m"] = (df["gender"] == "Male").astype(int)
    X = df[["amount", "interest_rate", "term_months", "monthly_income", "paid_amount", "n_repayments", "late_count", "missed_count", "gender_m"]]
    y_cls = df["default_label"]
    y_reg = df["income_delta"]
    return X, y_cls, y_reg

def train_and_save():
    X, y_cls, y_reg = build_features()
    if len(X) < 5:
        print("Not enough data to train. Insert sample data or use seed_data.py")
        return
    X_train, X_test, y_train, y_test = train_test_split(X, y_cls, test_size=0.2, random_state=42)
    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X_train, y_train)
    preds = clf.predict_proba(X_test)[:,1]
    auc = roc_auc_score(y_test, preds) if len(set(y_test))>1 else None
    print("Classification AUC:", auc)

    # Regression
    X_train_r, X_test_r, y_train_r, y_test_r = train_test_split(X, y_reg, test_size=0.2, random_state=42)
    reg = RandomForestRegressor(n_estimators=100, random_state=42)
    reg.fit(X_train_r, y_train_r)
    ypred = reg.predict(X_test_r)
    mse = mean_squared_error(y_test_r, ypred)
    print("Regression MSE:", mse)

    joblib.dump(clf, os.path.join(MODEL_DIR, "rf_default.pkl"))
    joblib.dump(reg, os.path.join(MODEL_DIR, "rf_income.pkl"))
    print("Models saved in", MODEL_DIR)

if __name__ == "__main__":
    train_and_save()
