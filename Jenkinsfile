pipeline {
  agent {
    docker {
      image 'cypress/base:11.13.0'
    }
  }
  environment {
    REPORTS_FOLDER = 'junit-reports'    
  }
  stages {
    stage('Node Modules Installation') {
      steps {
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm i"
      }
    }
    stage('Start frontend test server') {
      steps {
        sh "nohup npm run start:dev &"
      }
    }
    stage('Performing acceptance tests') {
      steps {
        if(fileExists($REPORTS_FOLDER)) {
          dir($REPORTS_FOLDER) {
            deleteDir()
          }
        }
        // TODO: try to use concurrently instead of nohup and pkill
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm run cypress:acceptance"
      }
    }
  }
  post {
    always {
      echo 'Stopping local server'
      sh 'pkill -f node'
      junit "**/$REPORTS_FOLDER/*.xml"
    }
  }
}
