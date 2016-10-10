node('node)' {
	stage 'Stage Checkout'

	    checkout scm

	stage 'build'

        sh 'node -v'

        sh 'npm prune'

        sh 'npm install'

        sh 'grunt'

        echo "Búið"
}
