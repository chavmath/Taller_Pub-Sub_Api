const express = require("express");
const amqp = require("amqplib");
const app = express();
const PORT = 3000;

app.use(express.json());

const RABBITMQ_URL = "amqp://user:pass@localhost";

app.post("/subir-tarea", async (req, res) => {
  const tarea = req.body;

  try {
    const connection = await amqp.connect(RABBITMQ_URL);
    const channel = await connection.createChannel();
    const exchange = "entregas.tareas";

    await channel.assertExchange(exchange, "fanout", { durable: true });
    channel.publish(exchange, "", Buffer.from(JSON.stringify(tarea)));

    console.log("📤 Mensaje enviado:", tarea);

    await channel.close();
    await connection.close();

    res.status(200).json({ mensaje: "Tarea publicada correctamente" });
  } catch (error) {
    console.error("❌ Error al enviar mensaje:", error);
    res.status(500).json({ error: "No se pudo enviar la tarea" });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Publicador corriendo en http://localhost:${PORT}`);
});
