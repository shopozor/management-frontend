def prepareBackendConfiguration(gitUser, gitPwd, gitBranch, backendJps, backendJpsUrl) {
  sh "curl -o $backendJps $backendJpsUrl"
  sh "sed -i \"s/GIT_USER/$gitUser/g\" $backendJps"
  sh "sed -i \"s/GIT_PASSWORD/$gitPwd/g\" $backendJps"
  sh "sed -i \"s/GIT_BRANCH/$gitBranch/g\" $backendJps"
}

def buildDockerImage() {
  sh "docker login -u $DOCKER_CREDENTIALS_USR -p $DOCKER_CREDENTIALS_PSW"
  sh "cp e2e/Dockerfile ."
  sh "docker build -t $DOCKER_REPO ."
  sh "docker push $DOCKER_REPO"
}

def deploy(backendJps, backendEnvName) {
  sh "chmod u+x ./common/e2e/deploy-to-jelastic.sh"
  sh "./common/e2e/deploy-to-jelastic.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $backendEnvName cp $backendJps"
}

def deleteFolder(folderName) {
  dir(folderName) {
    deleteDir()
  }
}

def retrieveTestResults(jenkinsEnvName, targetNodeGroup, targetPath, frontendName, sourceNodeGroup) {
  deleteFolder(TEST_REPORTS_FOLDER)
  deleteFolder(VIDEOS_FOLDER)
  deleteFolder(SCREENSHOTS_FOLDER)
  sh "chmod u+x ./common/e2e/mount-test-results.sh"
  sh "./common/e2e/mount-test-results.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $jenkinsEnvName $targetNodeGroup $targetPath $frontendName $sourceNodeGroup $PATH_TO_TEST_RESULTS"
  sh "cp -R /mnt/cypress/${SCREENSHOTS_FOLDER} ."
  sh "cp -R /mnt/cypress/${VIDEOS_FOLDER} ."
  sh "cp -R /mnt/${TEST_REPORTS_FOLDER} ."
}

def buildArtifacts() {
  archiveArtifacts artifacts: "${VIDEOS_FOLDER}/**/*.mp4, ${SCREENSHOTS_FOLDER}/**/*.png"
  junit "${TEST_REPORTS_FOLDER}/*.xml"
}

def deleteEnvironment(envName) {
  sh "chmod u+x ./common/e2e/delete-jelastic-env.sh"
  sh "./common/e2e/delete-jelastic-env.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $envName"
}

def stopEnvironment(envName) {
  sh "chmod u+x ./common/e2e/stop-jelastic-env.sh"
  sh "./common/e2e/stop-jelastic-env.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $envName"
}

return this