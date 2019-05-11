# Shopozor project

## Workflow

* All Softozor members are whitelisted
* When a white-listed author opens a PR, she is triggering the corresponding unit and acceptance tests automatically
* When a white-listed member updates a PR, she is triggering the corresponding unit and acceptance tests again
* The end-to-end tests are not run automatically because not all necessary components might be ready for such tests, thus reducing the relevance of their results (e.g. it can be that the frontend implements a login functionality but that functionality is not present in the backend yet; in that case, the e2e would fail) 
* When a non-whitelisted member opens a PR, the builder will publish the question `Can one of the admins verify this patch?` to the PR's comment; in that case, one of Softozor's admins can
 
  * comment `ok to test` to accept the PR for testing
  * comment `test this please` for one time test run
  * comment `add to whitelist` to add the PR's author to the whitelist

## Useful build commands

You can use the following commands in your comments:

* `retest this please`: this runs the unit and acceptance tests again
* `test management e2e`: this runs the end-to-end tests (seems to be currently buggy)