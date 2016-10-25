node {

	currentBuild.result = "SUCCESS"

	try {
		stage 'Stage Checkout'

	    	checkout scm

		stage 'Build'

			env.NODE_ENV = "Build"

			print "Environment will be : ${env.NODE_ENV}"
			    sh 'echo "stadur"'
			    sh 'pwd'

        	sh 'npm install'
        	sh 'bower install'
        	sh 'grunt build'
        	sh 'cp -RT dist /opt/app/html'
            sh 'cp -RT rest-API /opt/server'
            sh 'echo "stadur"'
            sh 'pwd'
            sh '/opt/server/npm install'

        stage 'Test'

            /*sh 'grunt test'*/

        stage 'Cleanup'

        	print "prune and cleanup"
        	sh 'npm prune'
        	sh 'rm -rf node_modules'
        	/*sh 'grunt clean'*/

        	/*
        	mail body: 'Project Build Successful',
        		from: 'einaragusta@gmail.com',
        		replyTo: 'einara12@ru.is',
        		subject: 'Project build successful',
        		to: ''
        	*/
	}
	catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}

}
