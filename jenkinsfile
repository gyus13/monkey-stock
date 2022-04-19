pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = "dev210"
        APP_NAME = "monkey-client"
        IMAGE_NAME = "${DOCKERHUB_USERNAME}" + "/" + "${APP_NAME}"
    }

    stages {
        stage('Clean Workspace'){
            steps {
                script {
                    cleanWs()
                }
            }
        }

        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker_image = docker.build("${IMAGE_NAME}")
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    docker.withRegistry('', 'docker-hub') {
                        docker_image.push("${env.BUILD_NUMBER}")
                        docker_image.push("latest")
                    }
                }
            }
        }

        stage('Update GitOps Repo') {
            steps {
                build job: 'updateManifest', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
            }
        }
    }
}