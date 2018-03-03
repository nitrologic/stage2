from django.http import HttpResponse
from django.template import loader
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from .models import Team, Player, Object, Session

import json

class Response:
    def toJSON(self):
        return json.dumps(self, default=lambda o: o.__dict__, sort_keys=True, indent=4)

    def toHTTP(self):
        return HttpResponse('{"jsonrpc":"2.0","result":'+toJSON(self)+'}') 

class HelloResponse(Response):
    def __init__():
        self.Objects=Object.objects.all()

def index(request):
    template = loader.get_template('index.html')
    context = {}
    return HttpResponse(template.render(context, request))

def jsonify(all):
    result=[]
    for instance in all:
        result.append(instance.json())
    results=",".join(result)
    return HttpResponse('{"jsonrpc":"2.0","result":['+results+']}')    

def hello(request):
    return jsonify(Object.objects.all())
