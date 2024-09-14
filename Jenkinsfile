pipeline {
    agent any  // This specifies that the pipeline can run on any available agent


    stages {
        stage('Checkout') {
                steps {
                    // Checkout code from the specified Git repository
                    git credentialsId: '3b6d7420-9c6f-4bdc-b1a4-b5fddead3cdd', url: 'https://github.com/MuleRutuja29/Integrate_and_Deploy_your_MEAN_app_on_Cloud_Project.git', branch: 'master'
                }
            }
        

        stage('Build') {
            steps {
                // Run Docker build command
                bat 'docker-compose build'
            }
        }
        stage('Tag Image'){
            steps{
                bat 'docker tag health-app rutujamule/health-app:latest'
            }
        }
        stage('Push Image'){
            steps{
                bat 'docker login -u rutujamule -p Pass@12345'
                bat 'docker push rutujamule/health-app:latest'
            }
        }
    }
}

