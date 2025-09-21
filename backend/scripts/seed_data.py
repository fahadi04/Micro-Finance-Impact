import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "microfinance.settings")

import django
django.setup()

from api.models import Borrower, Loan, Repayment
import random, uuid
from datetime import datetime, timedelta

# Clear existing
for c in [Borrower, Loan, Repayment]:
    c.objects.delete()

# Create 50 borrowers
for i in range(50):
    bid = str(uuid.uuid4())[:8]
    b = Borrower(borrower_id=bid,
                 name=f"Borrower {i}",
                 age=random.randint(20,55),
                 gender=random.choice(["Male","Female"]),
                 education=random.choice(["None","Primary","Secondary"]),
                 business_type=random.choice(["Retail","Service","Agriculture"]),
                 monthly_income=random.uniform(5000,30000))
    b.save()
    # Create a loan
    loan = Loan(loan_id=str(uuid.uuid4())[:10],
                borrower=b,
                amount=random.uniform(5000,50000),
                interest_rate=random.choice([10,12,14]),
                term_months=random.choice([6,12,18]),
                disbursed_date=datetime.utcnow() - timedelta(days=random.randint(0,365)),
                purpose="working_capital",
                status="active")
    loan.save()

    # random repayments
    for r in range(random.randint(0,12)):
        Repayment(repayment_id=str(uuid.uuid4())[:10], loan=loan, date=datetime.utcnow()-timedelta(days=random.randint(0,300)),
                  amount=random.uniform(100,1000), status=random.choice(["on_time","late","missed"])).save()

print("Seeded sample data.")
