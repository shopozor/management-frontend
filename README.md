# Shopozor management frontend

## Pull requests

### Workflow

* All Softozor members are whitelisted
* When a white-listed author opens a PR, she is triggering the corresponding unit and acceptance tests automatically
* When a white-listed member updates a PR, she is triggering the corresponding unit and acceptance tests again
* The end-to-end tests are not run automatically because not all necessary components might be ready for such tests, thus reducing the relevance of their results (e.g. it can be that the frontend implements a login functionality but that functionality is not present in the backend yet; in that case, the e2e would fail) 
* When a non-whitelisted member opens a PR, the builder will publish the question `Can one of the admins verify this patch?` to the PR's comment; in that case, one of Softozor's admins can
 
  * comment `ok to test` to accept the PR for testing
  * comment `test this please` for one time test run
  * comment `add to whitelist` to add the PR's author to the whitelist

### Useful build commands

You can use the following commands in your comments:

* `retest this please`: this runs the unit and acceptance tests again
* `test management e2e`: this runs the end-to-end tests (seems to be currently buggy)

## Build statuses

[![e2e Build Status](http://shopozor-ci.hidora.com/buildStatus/icon?job=shopozor-management-e2e&subject=e2e%20tests)](http://shopozor-ci.hidora.com/job/shopozor-management-e2e/)
[![Acceptance Build Status](http://shopozor-ci.hidora.com/buildStatus/icon?job=shopozor-management-frontend-acceptance&subject=acceptance%20tests)](http://shopozor-ci.hidora.com/job/shopozor-management-frontend-acceptance/)
[![Unit Build Status](http://shopozor-ci.hidora.com/buildStatus/icon?job=shopozor-management-frontend-unit&subject=unit%20tests)](http://shopozor-ci.hidora.com/job/shopozor-management-frontend-unit/)

## Continuous integration

The articles below are pretty useful:

* [How to integrate Cypress and Cucumber in your development flow in just a few weeks](https://medium.com/@itortv/how-to-integrate-cypress-and-cucumber-in-your-development-flow-in-just-a-few-weeks-96a46ac9165a)
* [Cypress e2e Testing in the Jenkins Pipeline](https://medium.com/@ronnieschaniel/cypress-e2e-testing-in-the-jenkins-pipeline-cc0a0df29fb6)

## VSCode configuration

Make sure you run the script

```
.vscode/install-extensions.sh
```

## Test identifiers

* client@budzons.ch
* producteur@budzons.ch
* gerant@budzons.ch
* manager@budzons.ch
* softozor@budzons.ch
password: Budzonnerie1

## Development setup

### Run the saleor server

1. Browse your `saleor` project folder
2. Run the following commands

```
pipenv shell
python ./manage.py runserver
```

### Reset the database data

1. Browse your `saleor` project folder
2. Run the following commands

```
pipenv run ./resetDB.sh
```

### Run the frontend

Run `quasar dev`

## Acceptance testing

### Fixtures setup

The set of fixtures used in our acceptance tests is shared among our various applications' codebases. That is why they come as a submodule. To load that fixtures submodule, upon repo cloning, you need to 

```
git submodule init
git submodule update
```

During development, new fixture data will be added to the fixtures repo. Upon a `git pull` on the `shopozor-management-frontend`, those new fixtures will not be pulled automatically. You will also need to do a 

1. `git pull` (s'il y a du neuf, on est redirigé vers gnu nano)
2. dans gnu nano, ^X pour quitter, puis N pour ne pas créer de fichier
3. `git submodule update`

### Basic run

To run the tests headlessly (without GUI), run

```
npx cypress run
```

To run the tests and manage them with the GUI, run

```
npx cypress open
```

### Run for a specific tag

To run only a specific scenario or a specific feature

1. tag it in the feature file, e.g. with @focus
2. launch either

```
npx cypress run -e TAGS='@focus'
```

or

```
npx cypress open -e TAGS='@focus'
```

### Generate javascript step skeletons

It is pretty handy to get the skeleton code for each step of a feature file. That can be reached with the following command for the `LogAUserIn` feature

```
cd cypress/integration/Authentication
npx cucumber-js LogAUserIn.feature
```

which outputs for example

```
1) Scenario: Le membre du staff n'est pas encore enregistré # LogAUserIn.feature:13
   ? Etant donné un utilisateur non identifié
       Undefined. Implement with the following snippet:

         Given('un utilisateur non identifié', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Lorsqu'un utilisateur s'identifie avec un e-mail et un mot de passe invalides
       Undefined. Implement with the following snippet:

         When('un utilisateur s\'identifie avec un e-mail et un mot de passe invalides', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Alors il obtient un message d'erreur stipulant que ses identifiants sont incorrects
       Undefined. Implement with the following snippet:

         Then('il obtient un message d\'erreur stipulant que ses identifiants sont incorrects', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
```
## Unit testing

```
npm run test:unit
```
