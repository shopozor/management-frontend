pipeline {
  agent {
    docker {
      image "node:latest"
    }
  }
  stages {
    stage('Node Modules Installation') {
      steps {
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm ci"
        sh "apt install xvfb"
      }
    }
    stage('Performing acceptance tests') {
      steps {
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm run cypress:ci"
      }
    }
  }
  post {
    always {
      script {
         junit "**/junit-reports/*.xml"
      }
    }
  }
}
