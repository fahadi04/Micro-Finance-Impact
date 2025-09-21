import mongoengine as me
from datetime import datetime

class Borrower(me.Document):
    meta = {"collection": "borrowers"}
    borrower_id = me.StringField(required=True, unique=True)
    name = me.StringField()
    age = me.IntField()
    gender = me.StringField()
    education = me.StringField()
    business_type = me.StringField()
    monthly_income = me.FloatField()
    created_at = me.DateTimeField(default=datetime.utcnow)

class Loan(me.Document):
    meta = {"collection": "loans"}
    loan_id = me.StringField(required=True, unique=True)
    borrower = me.ReferenceField(Borrower)
    amount = me.FloatField()
    interest_rate = me.FloatField()
    term_months = me.IntField()
    disbursed_date = me.DateTimeField()
    purpose = me.StringField()
    status = me.StringField(choices=("active","closed","defaulted"), default="active")

class Repayment(me.Document):
    meta = {"collection": "repayments"}
    repayment_id = me.StringField(required=True, unique=True)
    loan = me.ReferenceField(Loan)
    date = me.DateTimeField()
    amount = me.FloatField()
    status = me.StringField(choices=("on_time","late","missed"))

class Prediction(me.Document):
    meta = {"collection": "predictions"}
    borrower = me.ReferenceField(Borrower)
    loan = me.ReferenceField(Loan, required=False)
    timestamp = me.DateTimeField(default=datetime.utcnow)
    pred_income_delta = me.FloatField()     # predicted % change in income
    pred_default_prob = me.FloatField()     # probability of default
    pred_survival_prob = me.FloatField()    # probability business survives
    model_name = me.StringField()
    metadata = me.DictField()
