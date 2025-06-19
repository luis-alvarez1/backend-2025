pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        GIT_REPO_URL = 'https://github.com/luis-alvarez1/backend-2025.git'
        DOCKER_IMAGE_NAME = 'luisalvarez1106/ecommerce-backend'
    }

     stages {
        stage('Clone Repository') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/backend-2025']],
                    userRemoteConfigs: [[url: env.GIT_REPO_URL]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Docker Login') {
            steps {
                sh """
                    docker login -u ${env.DOCKER_CREDS_USR} -p ${env.DOCKER_CREDS_PSW}
                """
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    def buildNumber = env.BUILD_NUMBER
                    sh """
                        docker build -t ${env.DOCKER_IMAGE_NAME}:${buildNumber} .
                        docker tag ${env.DOCKER_IMAGE_NAME}:${buildNumber} ${env.DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Push to Docker Hub') {
            steps {
                script {
                    def buildNumber = env.BUILD_NUMBER
                    sh """
                        docker push ${env.DOCKER_IMAGE_NAME}:${buildNumber}
                        docker push ${env.DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }

        stage('Docker Logout') {
            steps {
                sh 'docker logout'
            }
        }
    }

    post {
        always {
            sh 'docker logout || true'  // Ensure clean logout even if previous steps failed
            cleanWs()  // Optional: clean workspace after build
        }
        success {
            echo "Success! Images pushed to Docker Hub: ${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} and :latest"
        }
        failure {
            echo 'Pipeline failed - check logs for details'
        }
    }
}