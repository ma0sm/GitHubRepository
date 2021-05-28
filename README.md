### Dept Recruitment Exercise
The following exercise was assigned to me by Dept as part of their recruitment process:

> Automate the below scenarios
> 
> We also talked about automation. To see what your knowledge is regarding this subject we would like you to automate the scenarios below using a tech stack of your > choice. To be able to review this we would like to receive the codebase (through git/zip) and a small tutorial on how to get it up and running.
> 
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
