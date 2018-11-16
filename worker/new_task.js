//name worker.js
let amqp = require('amqplib/callback_api')
// connect to the rabbitmq server
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    let q = 'task_queue'
    let msg = process.argv.slice(2).join(' ') || "Hello World!"
    ch.assertQueue(q, {durable: true})
    
    ch.sendToQueue(q, new Buffer(msg), {persistent: true})
    console.log("[x] Sent '%s'", msg)
  })
  setTimeout(function(){
    conn.close()
    process.exit(0)
  }, 500)
})