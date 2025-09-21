from django.urls import path
from .views import BorrowerList, LoanCreate, PredictOutcome

urlpatterns = [
    path("borrowers/", BorrowerList.as_view(), name="borrower_list"),
    path("loans/", LoanCreate.as_view(), name="loan_create"),
    path("predict/", PredictOutcome.as_view(), name="predict_outcome"),
]
