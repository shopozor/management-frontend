# Shopozor management frontend

> WIP

## Test identifiers

* client@budzons.ch
* producteur@budzons.ch
* gerant@budzons.ch
* manager@budzons.ch
* softozor@budzons.ch

password: Budzonnerie1

## Acceptance testing

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