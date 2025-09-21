from django.apps import AppConfig
from django.conf import settings
import mongoengine

class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    def ready(self):
        # connect to MongoDB when app starts
        mongo_user = settings.MONGO_USER or None
        mongo_pass = settings.MONGO_PASS or None
        if mongo_user and mongo_pass:
            mongoengine.connect(settings.MONGO_DB, host=f"mongodb://{mongo_user}:{mongo_pass}@{settings.MONGO_HOST}:{settings.MONGO_PORT}/{settings.MONGO_DB}")
        else:
            mongoengine.connect(settings.MONGO_DB, host=settings.MONGO_HOST, port=settings.MONGO_PORT)
