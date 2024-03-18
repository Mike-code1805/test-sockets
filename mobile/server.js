const net = require('net');

function startServer(port, onDataCallback) {
  const server = net.createServer((socket) => {
    console.log('Cliente conectado.');

    // Manejar datos del cliente
    socket.on('data', (data) => {
      console.log('Datos recibidos:', data.toString());
      onDataCallback(data.toString());
    });

    // Manejar cierre de conexión
    socket.on('end', () => {
      console.log('Cliente desconectado.');
    });
  });

  server.listen(port, () => {
    console.log('Servidor escuchando en el puerto:', port);
  });
}

module.exports = { startServer };
