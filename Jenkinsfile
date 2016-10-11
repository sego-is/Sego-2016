node {

	currentBuild.result = "SUCCESS"

	try {
		stage 'Stage Checkout'

	    	checkout scm

		stage 'Test'

			env.NODE_ENV = "test"

			print "Environment will be : ${env.NODE_ENV}"

        	sh 'node -v'
        	sh 'npm  install'
	}
	catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}
	
}