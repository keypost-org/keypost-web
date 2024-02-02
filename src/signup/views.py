from django.shortcuts import render
from django.http import HttpResponse


def index(request):
    return HttpResponse("Click <a href=\"/signup/#\">here</a> to Signup.")

