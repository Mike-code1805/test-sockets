// server.js en tu proyecto ReactJS
const net = require('net');

const server = net.createServer((socket) => {
  console.log('Cliente conectado desde la PC.');

  socket.on('data', (data) => {
    console.log('Datos recibidos desde la PC:', data.toString());
    // Aquí puedes manejar los datos recibidos, por ejemplo, enviar una respuesta al cliente
    socket.write('Mensaje recibido en el servidor de la PC.');
  });

  socket.on('end', () => {
    console.log('Cliente desde la PC desconectado.');
  });
});

const port = 3000; // Puedes elegir cualquier puerto disponible
server.listen(port, () => {
  console.log('Servidor en la PC escuchando en el puerto:', port);
});
