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
    stage('Performing acceptance tests') {
      steps {
        deleteFolder(REPORTS_FOLDER)
        sh "CYPRESS_CACHE_FOLDER=$WORKSPACE/.cache npm run start:ci"
      }
    }
  }
  post {
    always {
      junit "**/$REPORTS_FOLDER/*.xml"
      archiveArtifacts artifacts: 'cypress/videos/**/*.mp4, cypress/screenshots/**/*.png'
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
