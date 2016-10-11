node {

	currentBuild.result = "SUCCESS"

	try {
		stage 'Stage Checkout'

	    	checkout scm

		stage 'Build'

			env.NODE_ENV = "Build"

			print "Environment will be : ${env.NODE_ENV}"

        	sh '/usr/local/bin/node -v'
        	sh '/usr/local/bin/npm -v'

	}
	catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}

}
