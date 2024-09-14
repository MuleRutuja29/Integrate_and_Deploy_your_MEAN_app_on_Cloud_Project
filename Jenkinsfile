pipeline {
    agent any  // This specifies that the pipeline can run on any available agent


    stages {
        stage('Checkout') {
                steps {
                    // Checkout code from the specified Git repository
                    git credentialsId: '460295e7-e391-49e0-9c90-30c0b1482d48', url: 'https://github.com/MuleRutuja29/Integrate_and_Deploy_your_MEAN_app_on_Cloud_Project.git', branch: 'master'
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

