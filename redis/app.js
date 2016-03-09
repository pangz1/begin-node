var redis = require('redis');

var client = redis.createClient('6379', '127.0.0.1');

client.on('error', function (err){
  console.log('Error ' + err);
});

// after create the client, manipulate the data with client object

/**
 * hash table  name         element    value
 *             camping      cooking    walle
 *                          shelter    2 person tent
 */

client.set('color', 'green', redis.print); // print method prints the result or error if one occurs
client.get('color', function (err, value){
  if(err){
    console.log('get error ' + err);
  }
  console.log('Got value ' + value);
});

// hash table data structure

client.hmset('comping', {    // hmset 
  'shelter': '2 person tent',
  'cooking': 'walle'
}, redis.print);

client.hget('comping', 'cooking', function (err, value){  // get element's cooking
  if(err) console.log('Error ' + err);
  console.log('Cooking by ' + value);
});

client.hkeys('comping', function (err, list){   // hkeys list the keys of each element in a hash table
  if(err) console.log('Error ' + err);
  list.forEach(function (key, index){
    console.log('Key ' + key);
  });
});


/**
 * list data structure --- ordered string list
 * downside: retrieve perfomance
 */


// lpush command add value to list
client.lpush('task', 'read nodejs-in-action chapter6', client.print);
client.lpush('task', 'read nodejs-in-action chapter5', client.print);


// lrang retrieves a rang of list items using start and end arguments, 
// -1 end argument signifies the last item in the list, let to retrieves the whole list

client.lrang('task', 1, -1, function (err, items){
  if(err) throw err;
  items.forEach(function (item, index){
    console.log('item in task list is ' + item);
  });
});

/**
 * set data structure --- unordered data string
 * good retrieve performance
 * must have unique elements, if try to store two identical values to a set ,the second attempt will be ignored
 */

client.sadd('ip_address', '127.0.0.1', client.print);
client.sadd('ip_address', '127.0.0.1', client.print);
client.sadd('ip_address', '192.168.156.116', client.print);

client.smembers('ip_address', function (err, members){
  if(err) throw err;
  console.log(members)
});

/**
 * channel --- a data-delivery mechanisms that provide publish/subscribe functionality
 * A Redis client can either subscribe or publish to any given channel
 * Subscribing to a channel means you get any message sent to the channel. 
 * Publishing a message to a channel sends the message to all clients subscribed to that channel.
 */