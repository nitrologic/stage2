from __future__ import unicode_literals
from django.conf import settings
from django.db import models
from datetime import timedelta
from django.contrib.auth.models import User
from django.utils import timezone

def jsonify(object,fields):
    fields=[]
    for field in fields:
        fields.append('"'+field+'":"'+object[field]+'"')
    return "{"+",".join(fields)+"}" 

class Team(models.Model):
    name = models.CharField(max_length=200)
    callout = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def json(self):
        return jsonify(object=self,fields=["name","callout"])

class Player(models.Model):
    name = models.CharField(max_length=200)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    isGuest = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class Object(models.Model):
    name = models.CharField(max_length=200)
    information = models.CharField(max_length=200)
    contact = models.CharField(max_length=200)
    created = models.DateTimeField(default=timezone.now)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)
    owner = models.ForeignKey(Player, on_delete=models.CASCADE)

    def __str__(self):
        return self.name

    def json(self):
        fields=[]
        fields.append('"name":"'+self.name+'"')
        fields.append('"info":"'+self.information+'"')
        fields.append('"contact":"'+self.contact+'"')
        fields.append('"owner":"'+self.owner+'"')
        return "{"+",".join(fields)+"}"

class Session(models.Model):
    player = models.ForeignKey(Player, on_delete=models.CASCADE)
    began = models.DateTimeField(default=timezone.now)
    duration = models.DurationField(default=timedelta(minutes=0))

class Game(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)

    def __str__(self):
        return self.name

    def json(self):
        fields=[]
        fields.append('"name":"'+self.name+'"')
        fields.append('"desc":"'+self.description+'"')
        return "{"+",".join(fields)+"}"
