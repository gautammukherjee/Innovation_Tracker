node(){
    stage('Checkout SCM') {
        git branch: 'master', url: 'https://github.com/piyushsrivastava80/innovation_tracker_frontend.git'
    }

    stage('Install node modules') {
        nodejs('nodejs') {
            sh 'npm install --force'
            sh 'npm install --legacy-peer-deps'
            sh 'npm i -g pm2'
            echo "Modules installed"
        }
        // sh 'npm install --force'
        // sh 'npm install --legacy-peer-deps'
        // echo "Modules installed"
    }

    stage('Build') {
        nodejs('nodejs') {
            sh 'npm run build'
            echo "Build completed"
        }
        // sh 'npm run build:frontend'
    }

    stage('Deploy') {
        nodejs('nodejs') {
            sh "pm2 start app.js"
            echo "Deploy completed"
        }
    }
    
}

