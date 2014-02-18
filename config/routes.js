module.exports = function(app, passport, auth) {
    //User Routes
    var users = require('../app/controllers/users');
    app.get('/signin', users.signin);
    app.get('/signup', users.signup);
    app.get('/signout', users.signout);

    //Setting up the users api
    app.post('/users', users.create);

    app.post('/users/session', passport.authenticate('local', {
        failureRedirect: '/signin',
        failureFlash: 'Invalid email or password.'
    }), users.session);

    app.get('/users/me', users.me);
    app.get('/users/:userId', users.show);

    //Setting the facebook oauth routes
    app.get('/auth/facebook', passport.authenticate('facebook', {
        scope: ['email', 'user_about_me'],
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the github oauth routes
    app.get('/auth/github', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/github/callback', passport.authenticate('github', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the twitter oauth routes
    app.get('/auth/twitter', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.signin);

    app.get('/auth/twitter/callback', passport.authenticate('twitter', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Setting the google oauth routes
    app.get('/auth/google', passport.authenticate('google', {
        failureRedirect: '/signin',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ]
    }), users.signin);

    app.get('/auth/google/callback', passport.authenticate('google', {
        failureRedirect: '/signin'
    }), users.authCallback);

    //Finish with setting up the userId param
    app.param('userId', users.user);

    //Article Routes
    var articles = require('../app/controllers/articles');
    app.get('/articles', articles.all);
    app.post('/articles', auth.requiresLogin, articles.create);
    app.get('/articles/:articleId', articles.show);
    app.put('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
    app.del('/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);
    //Finish with setting up the articleId param
    app.param('articleId', articles.article);
    
    //save image
    app.post('/saveImage', auth.requiresLogin, articles.saveImage);
    //app.get('/saveImage', auth.requiresLogin, articles.saveImage);
    
    //Talonario Routes
    var talonarios = require('../app/controllers/talonarios');
    app.get('/talonarios', talonarios.all);
    app.post('/talonarios', talonarios.create);
    app.get('/talonarios/pdf/:talonarioId',talonarios.pdf);
    app.get('/talonarios/:talonarioId', talonarios.show);
    app.put('/talonarios/:talonarioId',  talonarios.update);
    app.del('/talonarios/:talonarioId',  talonarios.destroy);

    //Paypal
    app.get('/paypal', talonarios.paypal);
    app.get('/paypal/OK', talonarios.paypalOK);
    app.post('/paypal', talonarios.paypal);
    app.post('/paypal/OK', talonarios.paypalOK);

     //Finish with setting up the talonarioId param
    app.param('talonarioId', talonarios.talonario);

    

    //Home route
    var phantom = require('node-phantom');
    var index = require('../app/controllers/index');
   // app.get('/', index.render);
    // app.get('/', index.render);

	app.get('/', function(req, res){ 
		// If there is _escaped_fragment_ option, it means we have to // generate the static HTML that should normally return the Javascript 
		if(typeof(req.query._escaped_fragment_) !== "undefined") { 
			console.log("_escaped_fragment_");
			phantom.create(function(err, ph) { 
				return ph.createPage(function(err, page) { 
					// We open phantomJS at the proper page.
					console.log("createPage"); 
					return page.open("http://valeporun.com/#!" + req.query._escaped_fragment_, function(status) {
						console.log("createPage FIN");  
						return page.evaluate((function() { 
							console.log("page.evaluate"); 
							// We grab the content inside <html> tag... 
							return document.getElementsByTagName('html')[0].innerHTML; }), function(err, result) {
								console.log("page.evaluate FIN");  
								// ... and we send it to the client. 
								res.send(result); 
								return ph.exit(); 
							});
						});
					});
				});
		} else 
		{
			console.log("index");		
			// If there is no _escaped_fragment_, we return the normal index template. 
			res.render('index');
		}
	});
};
