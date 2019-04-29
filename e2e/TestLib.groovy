def prepareBackendConfiguration(gitUser, gitPwd, gitBranch, backendJps, backendJpsUrl) {
  sh "curl -o $backendJps $backendJpsUrl"
  sh "sed -i \"s/GIT_USER/$gitUser/g\" $backendJps"
  sh "sed -i \"s/GIT_PASSWORD/$gitPwd/g\" $backendJps"
  sh "sed -i \"s/GIT_BRANCH/$gitBranch/g\" $backendJps"
}


def deploy(backendJps, backendEnvName) {
  environment {
    JELASTIC_APP_CREDENTIALS = credentials('jelastic-app-credentials')
    JELASTIC_CREDENTIALS = credentials('jelastic-credentials')
  }
  sh "chmod u+x ./common/e2e/deploy-to-jelastic.sh"
  sh "./common/e2e/deploy-to-jelastic.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $backendEnvName cp $backendJps"
}

return this;