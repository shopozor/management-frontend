def myTest() {
  environment {
    GITHUB_CREDENTIALS = credentials('github-credentials')
    BACKEND_JPS = 'backend.jps'
    // CI_HOSTNAME = JENKINS_URL.split('/')[2].split(':')[0]
  }
  echo "hello world: $GITHUB_CREDENTIALS_USR"
}

return this;