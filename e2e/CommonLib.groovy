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

def retrieveTestResults(screenshotsFolder, videosFolder, reportsFolder, jenkinsEnvName, targetNodeGroup, targetPath, frontendName, sourceNodeGroup, pathToTestResults) {
  deleteFolder(reportsFolder)
  deleteFolder(videosFolder)
  deleteFolder(screenshotsFolder)
  sh "chmod u+x ./common/e2e/mount-test-results.sh"
  sh "./common/e2e/mount-test-results.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $jenkinsEnvName $targetNodeGroup $targetPath $frontendName $sourceNodeGroup $pathToTestResults"
  sh "cp -R /mnt/cypress/${screenshotsFolder} ."
  sh "cp -R /mnt/cypress/${videosFolder} ."
  sh "cp -R /mnt/${reportsFolder} ."
}

def deleteEnvironment(envName) {
  sh "chmod u+x ./common/e2e/delete-jelastic-env.sh"
  sh "./common/e2e/delete-jelastic-env.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $envName"
}

def stopEnvironment(envName) {
  sh "chmod u+x ./common/e2e/stop-jelastic-env.sh"
  sh "./common/e2e/stop-jelastic-env.sh $JELASTIC_APP_CREDENTIALS_USR $JELASTIC_APP_CREDENTIALS_PSW $JELASTIC_CREDENTIALS_USR $JELASTIC_CREDENTIALS_PSW $envName"
}

return this;