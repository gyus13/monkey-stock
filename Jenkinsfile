pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials('docker-hub')
        APP_NAME = "backend-stock"
        IMAGE_NAME = "${DOCKERHUB_CREDS_USR}" + "/" + "${APP_NAME}"
    }

    stages {

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('build') {
            steps {
                script {
                    sh """
                        chmod u+x ./gradlew
                        .gradlew clean bootjar -Pdocker.repository=${DOCKERHUB_CREDS_USR} \
                                               -Pdocker.repository.username=${DOCKERHUB_CREDS_USR} \
                                               -Pdocker.repository.password=${DOCKERHUB_CREDS_PSW} \
                                               -Pdocker.image.name=${IMAGE_NAME}
                    """
                }
            }
        }

        stage('publish') {
            steps {
                script {
                    sh """
                        ./gradlew jib -Pdocker.repository=${DOCKERHUB_CREDS_USR} \
                                      -Pdocker.repository.username=${DOCKERHUB_CREDS_USR} \
                                      -Pdocker.repository.password=${DOCKERHUB_CREDS_PSW} \
                                      -Pdocker.image.name=${IMAGE_NAME}
                    """
                }
            }
        }
    }
}