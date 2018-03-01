from __future__ import unicode_literals
from django.contrib import admin
from .models import Team, Player, Object, Session, Game

admin.site.register(Team)
admin.site.register(Player)
admin.site.register(Object)
admin.site.register(Session)
admin.site.register(Game)
