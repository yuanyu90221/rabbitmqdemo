// receive_logs.js
let amqp = require('amqplib/callback_api')

amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch){
    let ex = 'logs'

    ch.assertExchange(ex, 'fanout', {durable: false})

    ch.assertQueue('', {exclusive: true}, function(err, q) {
      console.log(" [*] Waiting for message in %s. To exit press CTRL+ C", q.queue)

      ch.bindQueue(q.queue, ex, '')

      ch.consume(q.queue, function(msg) {
        console.log(" [x] %s", msg.content.toString())
      }, {noAck: true})
    })
  })
})