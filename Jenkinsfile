pipeline {
    agent any  // This specifies that the pipeline can run on any available agent


    stages {
        stage('Checkout') {
            steps {
                // Checkout code from the specified Git repository
                git url: 'file:///E:/Integrate and Deploy your MEAN app on Cloud/Integrate and Deploy your MEAN app on Cloud-project/myExpress-app', branch: 'master'
            }
        }

        stage('Build') {
            steps {
                // Run Docker build command
                bat 'docker-compose build'
            }
        }
    }
}

