node {

	currentBuild.result = "SUCCESS"

	try {
		stage 'Stage Checkout'

	    	checkout scm

		stage 'Test'

			env.NODE_ENV = "test"

			print "Environment will be : ${env.NODE_ENV} on ${env.ITEM_ROOTDIR}"

        	sh '/usr/local/bin/node -v'
        	sh '/usr/local/bin/npm -v'

	}
	catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}

}
