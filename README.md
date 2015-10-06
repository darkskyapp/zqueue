# zqueue

A little redis-backed queue dingus.


```
var zqueue = require('zqueue')
var redis = require('redis').createClient(...)

// Create a new queue
var queue = zqueue.queue('myQueueName', redis)

// Add items to the queue (providing a "priority" for each)
queue.add([item0, itemPriority0, item1, itemPriority1, ...], function(err) {
  // ...
})

// Grab the next item (ordered by priority)
queue.pop(function(err, item) {
  // ...
})

// Remove items from the queue
queue.remove([item0, item1, ...], function(err) {
  // ...
})

// Empty the queue
queue.empty(function() {
  // ...
})

// Get a list of all items in the queue, sorted by priority
queue.inspect(function(err, item) {
  // ...
})
```
