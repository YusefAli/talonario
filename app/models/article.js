/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Article Schema
 */
var ArticleSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    content: {
        type: String,
        default: '',
        trim: true
    },
    image: {
        type: String,
        default: 'undefined.jpg',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: String,
        default: '',
        trim: true
    }]
});

/**
 * Validations
 */
ArticleSchema.path('title').validate(function(title) {
    return title.length;
}, 'El título no puede estar vacío');

/**
 * Statics
 */
ArticleSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username talonario').exec(cb);
    },
    imageUrl: function(id) {
        cloudinary.image("{{article._id}}", {width: 100, height: 100, crop: "fill"});
    }
};

mongoose.model('Article', ArticleSchema);