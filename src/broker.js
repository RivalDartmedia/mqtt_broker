const aedes = require('aedes')();
const net = require('net');
const port = 1883;

// Define users with their credentials
const users = {
  'user1': 'password1',
  'user2': 'password2',
  'espsensor': 'espdartmedia',
  'espcaller': 'espdartmedia',
  'mqttexplorer': 'espdartmedia'
};

// Authenticate the client
aedes.authenticate = (client, username, password, callback) => {
  if (username in users && users[username] === password.toString()) {
    callback(null, true);
  } else {
    const error = new Error('Authentication failed');
    error.returnCode = 4; // 'Bad username or password' MQTT error code
    callback(error, false);
  }
};

const server = net.createServer(aedes.handle);

server.listen(port, function () {
  console.log('Aedes MQTT broker is up and running on port', port);
});

aedes.on('client', (client) => {
  console.log('Client connected:', client.id);
});

aedes.on('clientDisconnect', (client) => {
  console.log('Client disconnected:', client.id);
});

aedes.on('publish', (packet, client) => {
  console.log('Published', packet.payload.toString());
});

aedes.on('subscribe', (subscriptions, client) => {
  console.log('Subscribed:', subscriptions.map(s => s.topic).join(', '));
});

aedes.on('unsubscribe', (subscriptions, client) => {
  console.log('Unsubscribed:', subscriptions.join(', '));
});
