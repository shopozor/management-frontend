pipeline {
  // agent {
  //   docker {
  //     image "node:latest"
  //   }
  // }
  agent any
  tools { nodejs "node" }
  stages {
    stage('Node Modules Installation') {
      steps {
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm ci"
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
