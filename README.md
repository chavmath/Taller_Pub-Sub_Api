# 📬 Sistema Pub/Sub con RabbitMQ y Node.js

Este proyecto implementa una arquitectura basada en el patrón **Publicador/Suscriptor (Pub/Sub)** usando **RabbitMQ** como middleware de mensajería. Los componentes están desarrollados en **Node.js** utilizando `Express` y `amqplib`.

---

## 📌 Objetivo

Simular el envío de tareas estudiantiles a través de una API REST, que al publicarse en RabbitMQ, es procesada en paralelo por distintos servicios:

- 📩 Servicio Notificador (simula enviar notificación al profesor)
- 📝 Servicio Logger (simula registrar el evento en consola)

---

## 📦 Estructura del Proyecto

```
Taller_Pub-Sub_Api/
├── docker-compose.yml
├── publicador/
│   ├── index.js
│   └── package.json
├── subscriptores/
│   ├── notificador.js
│   ├── logger.js
│   └── package.json
```

---

## 🚀 Requisitos

- Node.js >= 16
- Docker y Docker Compose
- Postman o curl (para pruebas)

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone <https://github.com/chavmath/Taller_Pub-Sub_Api>
cd Taller_Pub-Sub_Api
```

### 2. Levantar RabbitMQ

```bash
docker-compose up -d
```

Accede al panel en: [http://localhost:15672](http://localhost:15672)  
Usuario: `user` | Contraseña: `pass`

Verifica que el exchange `entregas.tareas` se cree como tipo `fanout`.

---

## ▶️ Ejecución

### 1. Publicador (API REST)

```bash
cd publicador
npm install
node index.js
```

El servidor quedará disponible en:  
`http://localhost:3000`

### 2. Subscriptores

En dos terminales separadas:

```bash
# Terminal 1
cd subscriptores
npm install
node notificador.js
```

```bash
# Terminal 2
cd subscriptores
node logger.js
```

---

## 🧪 Prueba desde Postman o curl

### Endpoint

```
POST http://localhost:3000/subir-tarea
```

### Body (JSON)

```json
{
  "estudiante": "Juan Perez",
  "curso": "Integración de Sistemas",
  "archivo": "tarea1.docx",
  "fechaEnvio": "2025-06-13T14:22:00"
}
```

### Respuesta esperada

```json
{
  "mensaje": "Tarea publicada correctamente"
}
```

Y los scripts mostrarán:

- 🔔 Notificador: `Notificación enviada al profesor...`
- 🧾 Logger: `Registro del evento en consola...`

---

