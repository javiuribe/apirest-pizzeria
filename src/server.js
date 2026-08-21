const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Lista de productos
const productos = [
  {
    "id": 1,
    "tipo": "pizza",
    "nombre": "Pizza Pepperoni",
    "precio": 9.0,
    "size": "GRANDE",
    "ingredientes": [
      { "id": 1, "nombre": "Queso mozzarella", "stock": 0, "esVegano": false },
      { "id": 2, "nombre": "Pepperoni", "stock": 0, "esVegano": false },
      { "id": 3, "nombre": "Salsa de tomate", "stock": 0, "esVegano": false },
      { "id": 4, "nombre": "Masa de pizza", "stock": 0, "esVegano": false }
    ]
  },
  {
    "id": 2,
    "tipo": "pizza",
    "nombre": "Pizza de Champiñones",
    "precio": 8.5,
    "size": "MEDIANA",
    "ingredientes": [
      { "id": 1, "nombre": "Queso mozzarella", "stock": 0, "esVegano": false },
      { "id": 5, "nombre": "Champiñones", "stock": 0, "esVegano": false },
      { "id": 3, "nombre": "Salsa de tomate", "stock": 0, "esVegano": false },
      { "id": 4, "nombre": "Masa de pizza", "stock": 0, "esVegano": false }
    ]
  },
  {
    "id": 3,
    "tipo": "pizza",
    "nombre": "Pizza Boloñesa",
    "precio": 10.0,
    "size": "PEQUENYA",
    "ingredientes": [
      { "id": 1, "nombre": "Queso mozzarella", "stock": 0, "esVegano": false },
      { "id": 6, "nombre": "Salsa boloñesa", "stock": 0, "esVegano": false },
      { "id": 4, "nombre": "Masa de pizza", "stock": 0, "esVegano": false }
    ]
  },
  {
    "id": 4,
    "tipo": "bebida",
    "nombre": "Cola",
    "precio": 2.0,
    "size": "MEDIANA",
    "ingredientes": []
  },
  {
    "id": 5,
    "tipo": "bebida",
    "nombre": "Naranja",
    "precio": 2.0,
    "size": "GRANDE",
    "ingredientes": []
  },
  {
    "id": 6,
    "tipo": "bebida",
    "nombre": "Agua",
    "precio": 1.5,
    "size": "PEQUENYA",
    "ingredientes": []
  },
  {
    "id": 7,
    "tipo": "pasta",
    "nombre": "Pasta Boloñesa",
    "precio": 7.5,
    "size": null,
    "ingredientes": [
      { "id": 6, "nombre": "Salsa boloñesa", "stock": 0, "esVegano": false },
      { "id": 7, "nombre": "Masa de pasta", "stock": 0, "esVegano": false }
    ]
  },
  {
    "id": 8,
    "tipo": "pasta",
    "nombre": "Pasta con Queso",
    "precio": 6.5,
    "size": null,
    "ingredientes": [
      { "id": 1, "nombre": "Queso mozzarella", "stock": 0, "esVegano": false },
      { "id": 7, "nombre": "Masa de pasta", "stock": 0, "esVegano": false }
    ]
  }
];

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  res.send(productos);  // Enviar solo la lista de productos
});

// Lista de clientes
let clientes = [
    {
        id: 1,
        dni: "12345678A",
        nombre: "Juan Pérez",
        direccion: "Calle Falsa 123",
        telefono: "555123456",
        email: "juan@gmail.com",
        password: "1234",
        pedidos: [] 
      }
]
app.get('/clientes', (req, res) => {
  res.send(clientes);
});

// Ruta para agregar un nuevo cliente
app.post('/clientes/registro', (req, res) => {
  console.log("Datos recibidos:" + req.body); 
  const { dni, nombre, direccion, telefono, email, password } = req.body;
  // Verificar si ya existe un cliente con el mismo email
  const clienteExistente = clientes.find(c => c.email === email);
  if (clienteExistente) {
    // Si el email ya está registrado, devolver un error
    return res.status(400).send({ message: 'El usuario con el email ${email} ya existe.' });
  }
  // Crear un nuevo cliente
  const nuevoCliente = {
    id: clientes.length + 1, // Generar un nuevo ID
    dni,
    nombre,
    direccion,
    telefono,
    email,
    password,
    pedidos: [] // Inicialmente vacío
  };

  // Agregar el nuevo cliente a la lista
  clientes.push(nuevoCliente);

  // Responder con el nuevo cliente
  res.status(201).send(nuevoCliente);
});

// Ruta para login de un cliente
app.post('/clientes/login', (req, res) => {
  const { email, password } = req.body;

  // Buscar el cliente por email
  const cliente = clientes.find(c => c.email === email);

  // Verificar si el cliente existe y si la contraseña coincide
  if (cliente && cliente.password === password) {
    res.status(200).send(cliente);
  } else {
    res.status(401).send({ message: 'Email o contraseña incorrectos' });
  }
});

// Servidor escuchando
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});