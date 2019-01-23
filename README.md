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

To work efficiently with Cypress, I recommend you install it globally:

```
npm -g i cypress
```

To run the tests headlessly (without GUI), run

```
cypress run
```

To run the tests and manage them with the GUI, run

```
cypress open
```

To run only a specific scenario or a specific feature

1. tag it in the feature file, e.g. with @focus
2. launch either

```
cypress run -e TAGS='@focus'
```

or

```
cypress open -e TAGS='@focus'
```