// def myTest(backendJPS, backendNamePsw, ) {
//   environment {
//     GITHUB_CREDENTIALS = credentials('github-credentials')
//     BACKEND_JPS = 'backend.jps'
//     // CI_HOSTNAME = JENKINS_URL.split('/')[2].split(':')[0]
//   }
//   sh "curl -o $BACKEND_JPS $BACKEND_NAME_PSW"
//   sh "sed -i \"s/GIT_USER/$GITHUB_CREDENTIALS_USR/g\" $BACKEND_JPS"
//   sh "sed -i \"s/GIT_PASSWORD/$GITHUB_CREDENTIALS_PSW/g\" $BACKEND_JPS"
//   sh "sed -i \"s/GIT_BRANCH/dev/g\" $BACKEND_JPS"
//   sh "chmod u+x ./common/e2e/deploy-to-jelastic.sh"
//   sh "./common/e2e/deploy-to-jelastic.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $BACKEND_NAME_USR cp $BACKEND_JPS"
// }

def deploy(backendJps, backendEnvName) {
  environment {
    JELASTIC_APP_CREDENTIALS = credentials('jelastic-app-credentials')
    JELASTIC_CREDENTIALS = credentials('jelastic-credentials')
  }
  sh "chmod u+x ./common/e2e/deploy-to-jelastic.sh"
  sh "./common/e2e/deploy-to-jelastic.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $backendEnvName cp $backendJps"
}

return this;