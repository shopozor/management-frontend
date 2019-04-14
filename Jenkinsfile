pipeline {
  agent {
    docker {
      image "node:latest"
    }
  }
  stages {
    stage('Node Modules Installation') {
      steps {
        sh "npm install"
      }
    }
    stage('Performing acceptance tests') {
      steps {
        sh "npm run cypress:ci"
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
