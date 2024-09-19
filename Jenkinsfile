pipeline {
    agent any  // This specifies that the pipeline can run on any available agent
    environment{
        SSH_KEY_PATH='C:\\Users\\DELL\\Downloads\\login2.pem'
        SSH_USER='ec2-user'
        SSH_HOST='34.207.238.166'
    }
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
         stage('Deploy'){
            steps{
                bat """
                ssh -i ${SSH_KEY_PATH} -o StrictHostKeyChecking=no ${SSH_USER}@${SSH_HOST} ^
                "docker stop health-app || true && docker rm health-app || true && docker rmi rutujamule/health-app:latest && docker pull rutujamule/health-app:latest && docker run -d --name health-app -p 3000:3000 rutujamule/health-app:latest
                """
            }
        }
    }
}

