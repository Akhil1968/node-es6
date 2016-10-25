
exports.loginHandler = function(req, res){
	res.render('login.handlebars', {});
}//loginHandler

exports.logoutHandler = function(req, res){
	req.session.destroy();
	res.render('login.handlebars', {LOGGEDIN:false});
}//logoutHandler

exports.landingHandler = function(req, res){
	// user comes to this handler after login, set loggedin variable in session to true.
	req.session.loggedin = true;

	var person;
	if (req.session.userName){   //session store has userName
		console.log("User Name already in session. It is " + req.session.userName);
		person = req.session.userName;
	}else{ //session store does NOT have userName
		// read username from req.query and keep into the session store
		person = req.query.nm;
		req.session.userName = person;
		console.log("User Name does not exist in session. Hence storing it in session store " + person);
	}

	res.render('landingpage.handlebars', {welcomeMessage:person, 
										LOGGEDIN:req.session.loggedin});
}//landingHandler

exports.cityHandler = function(req, res){
	var interestValue = req.body.interest;
	var cityNameValue, taglineValue;
	console.log("received interestValue  as " + interestValue);
	var imageArray = [];

	if (interestValue === 'history'){
		cityNameValue = 'Rome';
		taglineValue = 'The city of earliest civilization';
		imageArray = [1,2];
	}else if (interestValue === 'fashion'){
		cityNameValue = 'Paris';
		taglineValue = 'The fashion capital of the world';
		imageArray = [1,2,3];
	}else if (interestValue === 'finance'){
		cityNameValue = 'New York';
		taglineValue = 'The business capital of the world';
		imageArray = [1,2,3,4,5,6]; 
	}
	
	res.render('city.handlebars', {cityName:cityNameValue, 
						tagline: taglineValue, 
						welcomeMessage:req.session.userName,
						imageArray:imageArray,
						LOGGEDIN:req.session.loggedin});

}//cityHandler