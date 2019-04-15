// process.env.CACHE_CONFIG_PATH = '../config/cache.config';

var async = require('async');
var cache = require('../index');

cache.init(
{
  "host": "uat.redis.server",
  "port": 6379,
  "log": {"name": "1"}
}
  );


var cacheClient = cache();
//  cacheKey, parameter, expire, noCacheCallback, callback

cacheClient.get('testid111', false, function(err, data){
  console.log('22222');
console.log(data);
});


cacheClient.load("testid111", 112, false, 30*60, function(param, callback){
console.log(param);
  callback(null,1002);
}, function(err, data){
  console.log(err);
  console.log(data);
});

return;

cacheClient.events.on('error', function(err){

  console.error('111error:' , err);
});

var key = 'testid';

var a = [
    function (callback) {
        cacheClient.get(key, function(err, data){
        	console.log("1:");
           	console.log(err);
           	console.log(data);

        	//callback && callback(data ? 'data': '');
        });
    },
    function(data, callback){
    	cacheClient.set(key, '1', function(err, data){
    		console.log("2:");
           	console.log(err);
        	console.log(data);

           	//(callback || data)(data);
    	});
    },
    function(data, callback){
	    cacheClient.set(key, '1', 1000*60*50, function(err, data){
    		console.log("3:");
           	console.log(data);

           	//(callback || data)(data);
    	});	
    },
    function (data, callback) {
        cacheClient.get(key, function(err, data){
        	console.log("4;");
           	console.log(data);

        	//(callback || data)(data);
        });
    },
    function (data, callback) {
        cacheClient.del(key, function(err, data){
          console.log("5;");
            console.log(data);

          //(callback || data)(data);
        });
    },
    function (data, callback) {
        cacheClient.del(key, function(err, data){
          console.log("5;");
            console.log(data);

          //(callback || data)(data);
        });
    }
];

// a[0]();
// a[1]();
a[2]();
//a[3]();
// a[4]();





