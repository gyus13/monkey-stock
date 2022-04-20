pipeline {
    agent any
    environment {
        DOCKERHUB_USERNAME = "gyus13"
        APP_NAME = "chatbotapp"
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
                    docker.withRegistry('https://registry.hub.docker.com', 'docker-hub') {
                        docker_image.push("${env.BUILD_NUMBER}")
                    }
                }
            }
        }
        stage('Update GitOps Repo') {
            steps{
                build job: 'updatemanifest', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
            }
        }
    }
}