// server.js (Backend)

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Configuración de MongoDB URI (conectar a MongoDB Atlas)
const uri = "mongodb+srv://Gybran:vFj5M67VCB9az_A@cluster0.4z69f1m.mongodb.net/test?retryWrites=true&w=majority"; // Reemplaza esto con tu URI

// Conectar a MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a la base de datos con Mongoose'))
  .catch(err => console.error('Error de conexión a la base de datos con Mongoose', err));

// Middleware para analizar solicitudes JSON y permitir CORS
app.use(express.json());
app.use(cors());

// Definir el esquema del usuario
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  certification: String
});

const User = mongoose.model('User', userSchema);

// Ruta para el registro de usuarios (POST)
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, certification } = req.body;

    if (!name || !email || !phone || !certification) {
      return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    // Crear un nuevo usuario
    const newUser = new User({ name, email, phone, certification });

    // Guardar el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar usuario', error: error.message });
  }
});

// Ruta raíz para verificar que el servidor está funcionando
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

