def llPipeline = [
    module: 'll-web-ui',
    imgName: 'webui',
    paramFile: "src/environments/environment.ts", 
    current_env: '',
    ]

@Library("microservice-shared-library") _
llsetparams(llPipeline)
pipeline {
    agent { node { label 'jenkins-slave' } }
    stages {
        stage ('buid') {
            steps {    
                llbuildnodejs(llPipeline)
            }
        }
    
        stage('imagepushtoecr'){
            steps {
                script{
                    docker.withServer('tcp://ec2-34-197-64-173.compute-1.amazonaws.com:1111') {
                        withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'aws-cred', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                            llpushtoecr(llPipeline)
                        }
                    }
                }
            }
        }
        stage('deploytofargate'){
            steps {
        
                withCredentials([[$class: 'AmazonWebServicesCredentialsBinding', accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: "${llPipeline.credentialName}", secretKeyVariable: 'AWS_SECRET_ACCESS_KEY']]) {
                    lldeploytofargate(llPipeline)
                }
            }
        }
    }
    post {
        always {
             emailext attachLog: true, body: """$JOB_NAME -  Build $BUILD_DISPLAY_NAME - ${currentBuild.currentResult} : 
                
                Check console output at ${env.BUILD_URL} to view the details.""", subject: "$JOB_NAME -  Build $BUILD_DISPLAY_NAME - ${currentBuild.currentResult}", to: 'ML-LL-DevOps@motivitylabs.com'
             cleanWs()
        }
    }   
}