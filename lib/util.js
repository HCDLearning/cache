var async = require('async');

var loadx = function(cacheKey, parameter, isObject, expire, noCacheCallback, cb) {
    var cache = this;

    async.waterfall([
        function(callback) {
            cache.get(cacheKey, isObject, function(err, reply) {
                callback(err, reply);
            });
        },

        function(fromCache, callback) {

            if (fromCache) {
                callback(null, fromCache);
            } else {
                noCacheCallback(parameter, function(err, result) {
                    if (!err) {
                        cache.set(cacheKey, result, expire);
                    }
                    callback(err, result);
                });
            }
        }
    ], function(err, result) {
        cb && cb(err, result);
    });

};

module.exports = {
    loadx : loadx
};