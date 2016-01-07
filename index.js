exports.queue = function(name, redis) {
  var queue = {};
  name = 'zqueue:'+name;
  
  /*
  Add one or more items to the queue.
  Must be provided as an array of scores / names, e.g. [score0, item0, score1, item1, ...]
  */
  queue.add = function(items, callback) {
    if(!(items instanceof Array))
      items = [0, items];
    
    redis.zadd([name].concat(items), callback);
  };
  
  /* Remove an item from the queue */
  queue.remove = function(items, callback) {
    if(!(items instanceof Array))
      items = [items];
    
    redis.zrem([name].concat(items), callback);
  };
  
  /* Pop the lowest scoring item from the queue and return it */
  queue.pop = function(callback) {
    redis.multi()
         .zrange([name, 0, 0, 'WITHSCORES'])
         .zremrangebyrank([name, 0, 0])
         .exec(function(err, r) {
            return callback(err && (err[0] || err[1]), r[0] && r[0][0])
         });
  };
  
  /* Empty the queue */
  queue.empty = function(callback) {
    redis.del(name, callback);
  };
  
  /* Return an array of a range of items in the queue, sorted by score */
  queue.inspectRange = function(start_i, stop_i, callback) {
    redis.zrange([name, start_i, stop_i], callback);
  };
  
  /* Return an array of all items in the queue, sorted by score */
  queue.inspect = function(callback) {
    queue.inspectRange(0, -1, callback);
  };
  
  return queue;
}
