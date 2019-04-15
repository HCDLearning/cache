'use strict';

var events = require('events');
var configReload = require('config-reload');
var provider = require('node-provider');
var cacheClient = require('./lib/redisCache');
var logger = require('./lib/log');
var util = require('./lib/util');

var innerCache = null, cacheConfig = null;
configReload.setEnvName('CACHE_CONFIG_PATH');


var cacheEvent = new events.EventEmitter();
function cache(){

	if(!innerCache){
		throw new Error('error, cache should be initialized fist.');
	}

	return {
		events: cacheEvent,
		set: function(key, value, expire, cb){
			innerCache.set(key, value, expire, cb);
		},
		
		get: function(key, obj, cb){
			innerCache.get(key, obj, cb);
		},

		del: function(key, cb){
			innerCache.del(key, cb);
		},

		load: function(cacheKey, parameter, isObject, expire, noCacheCallback, callback){
			util.loadx.call(this, cacheKey, parameter, isObject, expire, noCacheCallback, callback);
		}
		
	};
};

cache.init = function(param){
	cacheConfig = configReload(param);

	if(cacheConfig){
		if(cacheConfig.log){
			var tmp = provider.log(cacheConfig.log);
			if(tmp){
				logger = tmp;
			}
		}

		innerCache = cacheClient(cacheConfig, logger);
		innerCache.events.on('error', function(err){
			cacheEvent.emit('error', err);
		});
	}
};

cache.init();

module.exports = cache;