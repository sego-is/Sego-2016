node {

	currentBuild.result = "SUCCESS"

	try {
		stage 'Stage Checkout'

	    	checkout scm
        
        stage 'Cleanup'

        	print "prune and cleanup"
        	sh 'npm prune'
        	sh 'rm -rf node_modules'
        	/*sh 'grunt clean'*/

            
		stage 'Build'

			env.NODE_ENV = "Build"

			print "Environment will be : ${env.NODE_ENV}"

        	sh 'npm install'
        	sh 'bower install'
        	sh 'grunt build'
        	sh 'cp -RT dist /opt/app/html'
            sh 'cp -RT rest-API /opt/server'
            /*sh 'npm --prefix /opt/server install /opt/server'*/
            
        	/*
        	mail body: 'Project Build Successful',
        		from: 'einaragusta@gmail.com',
        		replyTo: 'einara12@ru.is',
        		subject: 'Project build successful',
        		to: ''
        	*/

        stage 'Test'
            /*sh 'grunt test'*/

        
	}
	catch (err) {
		currentBuild.result = "FAILURE"
		throw err
	}
}
