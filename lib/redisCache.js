'use strict';

var events = require('events');
var redis = require('redis');

function redisCache(param, logger){
	if(!param){
		throw new Error('please set redis listening host and port first.');
	}

	var client = redis.createClient(param.port, param.host, param.options || {});
	var eventEmitter = new events.EventEmitter();

	client.on('error', function(err){
		logger.error('redis cache error: ', err);

		eventEmitter.emit('error', err);
	});
		
	var redisCache = {
		events: eventEmitter,
		set: function(key, value, expire, callback){
			var stringfiedValue = value;

			if (typeof(value) === 'object'){
				stringfiedValue = JSON.stringify(value);
			}

			if(expire && typeof(expire) == 'function'){
				callback = expire;
				expire = null;
			}

			client.set(key, stringfiedValue, function(err, reply){
				if(expire){
					client.expire(key, expire);
				}

				callback && callback(err, reply);
			});
		},
		
		get: function(key, obj, callback){
			if(obj && typeof(obj) == 'function'){
				callback = obj;
				obj = null;
			}

			client.get(key, function(err, reply){
				var result;
				if(obj && reply){
					try
					{
						result = JSON.parse(reply);
					}
					catch(e){
						return callback && callback(e, null);
					}
				}else{
					result = reply;
				}

				callback && callback(err, result);
			});
		},

		del: function(key, callback){
			client.del(key, callback);
		}
		
	};

	return redisCache;
};

module.exports = redisCache;