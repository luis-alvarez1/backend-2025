pipeline {
    agent any

    environment {
        // 🔧 Configuración de despliegue (ajusta según tu entorno)
        VM_IP          = '192.168.58.66'       // IP de la VM Debian
        VM_USER        = 'luis'                // Usuario SSH
        VM_DEPLOY_PATH = '/var/www/node-app'   // Ruta de despliegue
        ARTIFACT_NAME  = 'app-node.zip'        // Nombre del ZIP
        GIT_REPO       = 'https://github.com/luis-alvarez1/backend-2025.git'
    }

    stages {
        // 0. Clonar el repositorio de GitHub
        stage('Clonar repositorio') {
            steps {
                sh """
                    git clone ${GIT_REPO} . || true  # Continúa si el directorio ya existe
                    git pull origin main             # Asegura la versión más reciente
                """
            }
        }

        // 1. Generar archivo .env
        stage('Configurar entorno') {
            steps {
                sh """
                    cat > .env <<EOF
						DB_USER="user"
						DB_PASSWORD="pass"
						DB_HOST="mariadb"
						DB_PORT=3306
						DB_NAME="ecommerce"
						SECRET="backend-2025"
						EOF
                """
            }
        }

        // 2. Instalar dependencias y compilar
        stage('Instalar dependencias') {
            steps {
                sh 'npm install'
                sh 'npm run build'  // Si existe el script
            }
        }

        // 3. Empaquetar en .zip (excluyendo node_modules y .env)
        stage('Empaquetar') {
            steps {
                sh """
                    zip -r ${ARTIFACT_NAME} . -x "node_modules/*" -x ".git/*"
                """
            }
        }

        // 4. Desplegar en la VM Debian via SSH
        stage('Desplegar en VM') {
            steps {
                script {
                    withCredentials([sshUserPrivateKey(
                        credentialsId: 'vm-debian-ssh-key',
                        keyFileVariable: 'SSH_KEY',
                        usernameVariable: 'SSH_USER'
                    )]) {
                        sh """
                            # Copia el ZIP a la VM
                            scp -i ${SSH_KEY} -o StrictHostKeyChecking=no \
                                ${ARTIFACT_NAME} \
                                ${VM_USER}@${VM_IP}:${VM_DEPLOY_PATH}

                            # Conecta a la VM, descomprime y configura
                            ssh -i ${SSH_KEY} -o StrictHostKeyChecking=no \
                                ${VM_USER}@${VM_IP} "
                                cd ${VM_DEPLOY_PATH} && \
                                unzip -o ${ARTIFACT_NAME} && \
                                npm install -g pm2 && \
                                npm install --production && \
                                pm2 restart index.js || pm2 start index.js
                            "
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ ¡Despliegue exitoso!: ${env.JOB_NAME} (#${env.BUILD_NUMBER})"
        }
        failure {
            echo '❌ Error en el despliegue.'
        }
    }
}