node {

	currentBuild.result = "SUCCESS"

	try {
		stage 'Stage Checkout'

	    	checkout scm

		stage 'Build'

			env.NODE_ENV = "Build"

			print "Environment will be : ${env.NODE_ENV}"

        	sh 'node -v'
        	sh 'npm -v'
        	sh 'npm install'
        	sh 'bower install'

	}
	catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}

}
