node(){
    stage('Checkout SCM') {
        git branch: 'master', url: 'https://github.com/piyushsrivastava80/innovation_tracker_frontend.git'
    }

    stage('Install node modules') {
        nodejs('nodejs') {
            sh 'npm install --force'
            sh 'npm install --legacy-peer-deps'
            // sh 'npm i -g pm2'
            echo "Modules installed 1"
        }
        // sh 'npm install --force'
        // sh 'npm install --legacy-peer-deps'
        // echo "Modules installed"
    }

    stage('Build') {
        nodejs('nodejs') {
            sh 'npm run build'
            sh "npm run start"
            echo "Build completed 2"
        }
        // sh 'npm run build:frontend'
    }

    // stage('Deploy') {
    //     nodejs('nodejs') {
    //         sh "npm run start"
    //         // echo "Deploy completed 3"
    //     }
    // }
    
}

