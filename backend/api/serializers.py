from rest_framework import serializers
from . import models
from mongoengine.queryset import Q

# Simple serializers that convert to/from dict because mongoengine objects aren't Django models

class BorrowerSerializer(serializers.Serializer):
    id = serializers.CharField(source='borrower_id')
    name = serializers.CharField(allow_blank=True, required=False)
    age = serializers.IntegerField(required=False)
    gender = serializers.CharField(required=False, allow_blank=True)
    education = serializers.CharField(required=False, allow_blank=True)
    business_type = serializers.CharField(required=False, allow_blank=True)
    monthly_income = serializers.FloatField(required=False)

    def create(self, validated_data):
        b = models.Borrower(**validated_data)
        b.save()
        return b

    def update(self, instance, validated_data):
        for k,v in validated_data.items():
            setattr(instance, k, v)
        instance.save()
        return instance

class LoanSerializer(serializers.Serializer):
    loan_id = serializers.CharField()
    borrower_id = serializers.CharField()
    amount = serializers.FloatField()
    interest_rate = serializers.FloatField(required=False)
    term_months = serializers.IntegerField(required=False)
    purpose = serializers.CharField(required=False, allow_blank=True)
    status = serializers.CharField(required=False, allow_blank=True)

    def create(self, validated_data):
        borrower = models.Borrower.objects(borrower_id=validated_data.pop("borrower_id")).first()
        loan = models.Loan(borrower=borrower, **validated_data)
        loan.save()
        return loan
