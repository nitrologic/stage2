rem pip install django
rem django-admin startproject roa
pushd roa
python manage.py createsuperuser --username=admin2 --email=nitrologic@gmail.com
rem python manage.py startapp junrei
popd
