### Automation Exercise

> Scenario's
> 
> Log in Github with a test account
> Create a Github repository
> Create a README.md file in the repository and commit&push it via the Github UI
> Delete the repository.

### How to execute
All Codeceptjs tests can be found in the github_repository directory. For local execution, copy tests to root of the repository and launch codeceptjs:
```sh
$ npx codeceptjs run -o '{"tests": "relative path to test"}' 
```
