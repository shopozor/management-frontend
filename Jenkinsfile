pipeline {
  agent {
    docker {
      image 'cypress/browsers:node11.13.0-chrome73'
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
