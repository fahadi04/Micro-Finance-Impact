from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from . import models, serializers
import uuid
from datetime import datetime
from ml.predict import predict_for_borrower

class BorrowerList(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        borrowers = models.Borrower.objects.all()
        data = []
        for b in borrowers:
            data.append({
                "borrower_id": b.borrower_id,
                "name": b.name,
                "age": b.age,
                "business_type": b.business_type,
                "monthly_income": b.monthly_income
            })
        return Response(data)

    def post(self, request):
        data = request.data.copy()
        data.setdefault("borrower_id", str(uuid.uuid4()))
        ser = serializers.BorrowerSerializer(data=data)
        ser.is_valid(raise_exception=True)
        b = ser.save()
        return Response({"borrower_id": b.borrower_id}, status=status.HTTP_201_CREATED)

class LoanCreate(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = request.data.copy()
        data.setdefault("loan_id", str(uuid.uuid4()))
        ser = serializers.LoanSerializer(data=data)
        ser.is_valid(raise_exception=True)
        loan = ser.save()
        return Response({"loan_id": loan.loan_id}, status=201)

class PredictOutcome(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        borrower_id = request.data.get("borrower_id")
        loan_id = request.data.get("loan_id")
        if not borrower_id:
            return Response({"error":"borrower_id required"}, status=400)
        pred = predict_for_borrower(borrower_id, loan_id)
        return Response(pred)
