var events = require('events');
var utils = require('util');

function test (argument) {
	// body...
}

utils.inherits(test, events.EventEmitter);

console.log(test.on);

var t = new test();
console.log(t.on);

var eventEmitter = new events.EventEmitter();
eventEmitter.on('c', function(){
	console.log('cccc');
});

eventEmitter.emit('c');