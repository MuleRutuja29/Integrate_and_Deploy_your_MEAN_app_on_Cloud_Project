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
    }
}

