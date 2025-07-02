const amqp = require("amqplib");

async function iniciar() {
  const conn = await amqp.connect("amqp://user:pass@localhost");
  const ch = await conn.createChannel();
  const exchange = "entregas.tareas";

  await ch.assertExchange(exchange, "fanout", { durable: true });
  const q = await ch.assertQueue("", { exclusive: true });

  ch.bindQueue(q.queue, exchange, "");

  console.log("📩 Esperando tareas para notificar...");

  ch.consume(
    q.queue,
    (msg) => {
      const tarea = JSON.parse(msg.content.toString());
      console.log(
        `🔔 Notificación enviada al profesor sobre: ${tarea.archivo}`
      );
    },
    { noAck: true }
  );
}

iniciar();
