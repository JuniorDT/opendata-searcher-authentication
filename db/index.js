const mongoose = require('mongoose');
const config = require('../config.js');

const defaultOptions = {
    useNewUrlParser: true,
};

module.exports = class {

    static connect(app, options) {
        switch(app.get('env')) {
            case 'development': {
                mongoose.connect(config.connectStr, options || defaultOptions)
                    .then(() => console.log('connect successfully'))
                    .catch(() => console.error('connect failure'));
                break;
            }
            case 'production': {
                mongoose.connect(config.connectStr, options || defaultOptions)
                    .then(() => console.log('connect successfully'))
                    //** Something prod db handling and middleware **//
                    .catch(() => console.error('connect failure'));
                break;
            }
            default:
                throw new Error('Unknown error ' + app.get('env'));

        }
    }

};