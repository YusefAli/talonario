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
    price: {
        type: Number,
        default: 0
    },
    url: {
        type: String,
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
    }
};

mongoose.model('Article', ArticleSchema);