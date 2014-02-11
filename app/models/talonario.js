/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    config = require('../../config/config'),
    Schema = mongoose.Schema;


/**
 * Talonario Schema
 */
var TalonarioSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: 'Mi talonario',
        trim: true
    },
    description: {
        type: String,
        default: 'Ultimo Talonario creado',
        trim: true
    },
    state: {
        type: String,
        default: 'INI',
        trim: true
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    talones: [{
        type: Schema.ObjectId,
        ref: 'Article'
    }],
});


/**
 * Statics
 */
TalonarioSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user', 'name username email').populate('talones').exec(cb);
    }
};

mongoose.model('Talonario', TalonarioSchema);