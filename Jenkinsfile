pipelines{
    agent any 
   

    stages{
        stage('checkout'){
            steps{
                git url: 'file:///E:/Integrate and Deploy your MEAN app on Cloud/Integrate and Deploy your MEAN app on Cloud-project/myExpress-app', branch: 'master',
                
            }
        }

        stage('Build'){
            steps{
                bat 'docker-compose build --no-cache'
            }
        }
    }
}