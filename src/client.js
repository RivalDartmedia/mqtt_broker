const mqtt = require('mqtt');

// Options for connecting with username and password
const options = {
  username: 'user2',
  password: 'password2'
};

const client = mqtt.connect('mqtt://localhost:1883', options);

client.on('connect', () => {
  console.log('Client connected');
  client.subscribe('rivaldm/test', (err) => {
    if (!err) {
      client.publish('rivaldm/test', 'Hello MQTT');
    }
  });
});

client.on('message', (topic, message) => {
  console.log('Received message:', topic, message.toString());
});

client.on('close', () => {
  console.log('Client disconnected');
});
