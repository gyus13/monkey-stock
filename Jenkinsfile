pipeline {
    agent any
    environment {
        DOCKERHUB_CREDS = credentials('docker-hub')
        APP_NAME = "backend-stock"
        IMAGE_NAME = "${DOCKERHUB_CREDS_USR}" + "/" + "${APP_NAME}"
        MANIFEST = "stock"
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
                        ./gradlew clean bootjar -Pdocker.repository=${DOCKERHUB_CREDS_USR} \
                                               -Pdocker.repository.username=${DOCKERHUB_CREDS_USR} \
                                               -Pdocker.repository.password=${DOCKERHUB_CREDS_PSW} \
                                               -Pdocker.image.name=${IMAGE_NAME}
                                               -Pdocker.image.tag=${env.BUILD_NUMBER}
                    """
                }
            }
        }

        stage('publish') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'docker-hub', 
                                 usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    script {
                        sh """
                            ./gradlew jib -Pdocker.repository=${DOCKERHUB_CREDS_USR} \
                                        -Pdocker.repository.username=${USERNAME} \
                                        -Pdocker.repository.password=${PASSWORD} \
                                        -Pdocker.image.name=${IMAGE_NAME}
                                        -Pdocker.image.tag=${env.BUILD_NUMBER}
                        """
                    }
                }
                
            }
        }

        stage('Update GitOps Repo') {
            steps {
                build job: 'updateManifest', parameters: [string(name: 'DOCKERIMAGE', value: IMAGE_NAME), string(name: 'DOCKERTAG', value: env.BUILD_NUMBER), string(name: 'MANIFEST', value: MANIFEST)]
            }
        }
    }
}