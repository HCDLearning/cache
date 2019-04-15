cache
=====================

redis cache for nodejs

usage
--------------------
1. require

```
var cache = require('cache');
```

2. init cache setting

- init with options object

```
cache.init({host:'host', port:6379});

```

- init with json config file

```
cache.init('./config/cache.config');
```

- init with env settings

```
CACHE_CONFIG_PATH="./config/cache.config"
export CACHE_CONFIG_PATH
```

and then do nothing

3. use cache

```
var cacheClient = cache();
```

4. error handle

```
cacheClient.events.on('error', function(err){
  console.error('error:' , err);
});

```

or you can use existing log in you applicationk, change option object and add log property with log module name.

```
{host:'host', port:6379, log:{name:"logger"}}
```