pipeline {
    agent any

    environment {
        DOCKER_HUB_CREDENTIALS = credentials('docker-hub-credentials')
        GIT_REPO_URL = 'https://github.com/luis-alvarez1/backend-2025.git'
        DOCKER_IMAGE_NAME = 'luisalvarez1106/ecommerce-backend'
    }

    stages {
        stage('Descargar Repositorio') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/backend-2025']],
                    userRemoteConfigs: [[url: env.GIT_REPO_URL]]
                ])
            }
        }

        stage('Instalar Dependencias') {
            steps {
                sh 'npm install'
            }
        }

		stage('Login a Docker Hub') {
            steps {
                script {
                    // Login a Docker Hub usando las credenciales almacenadas
                    sh "echo ${env.DOCKER_HUB_CREDENTIALS_PSW} | docker login -u ${env.DOCKER_HUB_CREDENTIALS_USR} --password-stdin"
                }
            }
        }

        stage('Construir Imagen Docker') {
            steps {
                script {
                    // Usamos el número de build de Jenkins para versionar
                    def buildNumber = env.BUILD_NUMBER
                    
                    // Construir imagen con tag del build number y latest
                    docker.build("${env.DOCKER_IMAGE_NAME}:${buildNumber}")
                    docker.build("${env.DOCKER_IMAGE_NAME}:latest")
                }
            }
        }

        stage('Push a Docker Hub') {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', env.DOCKER_HUB_CREDENTIALS) {
                        def buildNumber = env.BUILD_NUMBER
                        
                        // Hacer push de ambas versiones
                        docker.image("${env.DOCKER_IMAGE_NAME}:${buildNumber}").push()
                        docker.image("${env.DOCKER_IMAGE_NAME}:latest").push()
                    }
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline ejecutado con éxito! Imagen ${env.DOCKER_IMAGE_NAME}:${env.BUILD_NUMBER} subida a Docker Hub."
        }
        failure {
            echo 'Pipeline falló. Revisar los logs para más información.'
        }
    }
}