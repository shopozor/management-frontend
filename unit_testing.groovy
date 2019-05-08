pipeline {
  agent any
  environment {
    REPORTS_FOLDER = 'junit-reports'    
  }
  stages {
    stage('Node Modules Installation') {
      steps {
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache yarn"
      }
    }
    stage('Building application') {
      environment {
        GRAPHQL_API = 'http://localhost:8000/graphql/'
      }
      steps {
        sh "yarn build"
      }
    }
    stage('Performing unit tests') {
      steps {
        deleteFolder(REPORTS_FOLDER)
        echo "Need to trigger unit tests!"
        sh "exit 1"
      }
    }
  }
  post {
    always {
      junit "**/$REPORTS_FOLDER/*.xml"
    }
  }
}

def deleteFolder(folderName) {
  script {
    dir(folderName) {
      deleteDir()
    }
  }
}
