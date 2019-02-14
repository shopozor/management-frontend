# Quasar App

> WIP

identifiants de test
--------------------

* client@budzons.ch
* producteur@budzons.ch
* gerant@budzons.ch
* manager@budzons.ch
* softozor@budzons.ch

mot de passe: Budzonnerie1

# Development setup

## Run the saleor server

1. Browse your `saleor` project folder
2. Run the following commands

```
pipenv shell
python ./manage.py runserver
```

## Reset the database data

1. Browse your `saleor` project folder
2. Run the following commands

```
pipenv run ./resetDB.sh
```

## Run the frontend

1. Run `quasar dev`

## Run e2e tests

Run

```
npm run e2e
``` 

## update fixtures

1. `git pull` (s'il y a du neuf, on est redirigé vers gnu nano)
2. dans gnu nano, ^X pour quitter, puis N pour ne pas créer de fichier
3. `git submodule update`