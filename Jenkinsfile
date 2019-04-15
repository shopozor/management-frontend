pipeline {
  agent {
    docker {
      // image "node:latest"
      image 'cypress/base:11.13.0'
    }
  }
  // needs apt install xvfb libxss1 libgconf2-4
  // agent any
  // tools { nodejs "node" }
  stages {
    stage('Node Modules Installation') {
      steps {
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm i"
      }
    }
    stage('Start frontend test server') {
      steps {
        sh "nohup npm run start:dev&"
      }
    }
    stage('Performing acceptance tests') {
      steps {
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm run cypress:acceptance"
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
