pipeline {

    agent any

    tools {
        nodejs 'NodeJS-26'
    }

    options {
        skipDefaultCheckout(true)
        timestamps()
        disableConcurrentBuilds()
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint'
            }
        }

        stage('Tests') {
            steps {
                sh 'npm run test:ci'
            }

            post {
                always {
                    junit testResults: 'reports/junit/junit.xml'
                }
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Package') {
            steps {
                sh '''
                    tar -czf node-demo-${BUILD_NUMBER}.tar.gz \
                        dist package.json package-lock.json
                '''

                archiveArtifacts artifacts: "node-demo-${BUILD_NUMBER}.tar.gz"
            }
        }

        stage('Deploy') {

            when {
                branch 'master'
            }

            steps {

                sh '''
                    set -e

                    DEPLOY_ROOT=/opt/cicd-demo/node
                    RELEASE_DIR="$DEPLOY_ROOT/releases/$BUILD_NUMBER"

                    echo "Deploying build $BUILD_NUMBER"
                    echo "Release directory: $RELEASE_DIR"

                    rm -rf "$RELEASE_DIR"
                    mkdir -p "$RELEASE_DIR"

                    ARTIFACT="node-demo-${BUILD_NUMBER}.tar.gz"

                    tar -xzf "$ARTIFACT" -C "$RELEASE_DIR"

                    cd "$RELEASE_DIR"

                    npm ci --omit=dev

                    if [ -f "$DEPLOY_ROOT/app.pid" ]; then

                        OLD_PID=$(cat "$DEPLOY_ROOT/app.pid" || true)

                        if [ -n "$OLD_PID" ] && kill -0 "$OLD_PID" 2>/dev/null; then

                            echo "Stopping old application: $OLD_PID"

                            kill "$OLD_PID" || true

                            sleep 2
                        fi
                    fi

                    ln -sfn "$RELEASE_DIR" "$DEPLOY_ROOT/current"

                    echo "Starting new application"

                    JENKINS_NODE_COOKIE=dontKillMe \
                    APP_VERSION="$BUILD_NUMBER" \
                    PORT=3000 \
                    nohup node dist/server.js \
                    > "$DEPLOY_ROOT/app.log" 2>&1 &

                    echo $! > "$DEPLOY_ROOT/app.pid"

                    echo "Application PID:"
                    cat "$DEPLOY_ROOT/app.pid"
                '''
            }
        }

        stage('Smoke Test') {

            when {
                branch 'master'
            }

            steps {
                sh '''
                    sleep 2
                    curl -f http://127.0.0.1:3000/health
                '''
            }
        }
    }

    post {

        success {
            echo 'PIPELINE SUCCESSFUL'
        }

        failure {
            echo 'PIPELINE FAILED - deployment was blocked'
        }
    }
}