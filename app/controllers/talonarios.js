/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Talonario = mongoose.model('Talonario'),
    PDFDocument = require('pdfkit'),
    fs = require('fs'),
    _ = require('underscore');


/**
 * Find talonario by id
 */
exports.talonario = function(req, res, next, id) {
    Talonario.load(id, function(err, talonario) {
        if (err) return next(err);
        if (!talonario) return next(new Error('Failed to load talonario ' + id));
        req.talonario = talonario;
        next();
    });
};

/**
 * paypal a talonario
 */
exports.paypal = function(req, res) {
    console.log(req.params);
    res.jsonp(req);
};

/**
 * paypal OK a talonario
 */
exports.paypalOK = function(req, res) {
    console.log(req.params);
};

/**
 * Find talonario by id
 */
exports.pdf = function(req, res) {
    Talonario.findOne({
            _id: req.params.talonarioId
        }).populate('talones').exec(function(err, talonario) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            doc = new PDFDocument;
           // doc.image('/media/Datos/Aptana_Poryectos/prueba/public/img/articles/52a2fdf28870b2660c000004.jpg');
            var talones = talonario.talones;
             console.log(talones);

             var prePath='./public/img/articles/';

            fs.realpath(prePath, null, function (err, resolvedPath) {
                for (var i=0; i<talones.length; i++) {
                        var talon = talones[i];
                        console.log(i+talon._id);

                        var path=resolvedPath+'/'+talon._id+talon.image;

                        console.log(path);
                        doc.text(talon.title)
                            .image(path,{ width: 400 })
                            .text(talon.content);

                        //doc.image('http://res.cloudinary.com/hn9rn0xhn/image/upload/w_1000,h_500/'+talon._id+'.jpg', 100, 100);
                        
                }
                doc.output(function(string) {
                  res.end(string);
                }); 
             }); 
        }
    });
      
   

};

/**
 * Create a talonario
 */
exports.create = function(req, res) {
    var talonario = new Talonario();
    

	for (var i in req.body.talones) {
	  var talon = req.body.talones[i];
	  talonario.talones.push(mongoose.Types.ObjectId(talon._id));
	}    

    talonario.user = req.user;
    

    talonario.save(function(err) {
        if (err) {
        		console.log("ERRORRRRRRRRRRRRRRRRRR",err);
            return res.send('users/signup', {
                errors: err.errors,
                talonario: talonario
            });
        } else {
            res.jsonp(talonario);
        }
    });
};

/**
 * Update a talonario
 */
exports.update = function(req, res) {
    var talonario = req.talonario;

    talonario = _.extend(talonario, req.body);

    talonario.save(function(err) {
        res.jsonp(talonario);
    });
};

/**
 * Delete an talonario
 */
exports.destroy = function(req, res) {
    var talonario = req.talonario;

    talonario.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(talonario);
        }
    });
};

/**
 * Show an talonario
 */
exports.show = function(req, res) {
     Talonario.findOne({
            _id: req.params.talonarioId
        }).populate('talones').exec(function(err, talonarios) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(talonarios);
        }
    });
};

/**
 * List of Talonarios
 */
exports.all = function(req, res) {
    Talonario.find().sort('-created').populate('user', 'name username').populate('talones').exec(function(err, talonarios) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(talonarios);
        }
    });
};



