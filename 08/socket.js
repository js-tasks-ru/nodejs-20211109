const socketIO = require('socket.io');
const socketRedis = require('socket.io-redis');
const config = require('./config');

function socket(server) {
  const io = socketIO(server);

  io.adapter(socketRedis(config.redis.url));

  io.use((socket, next) => {
    const token = socket.handshake.query.token;

    console.log(token);

    // await Session.findOne({token});

    socket.user = { email: 'asdasd@asdasd.com', name: 'user1' };

    next();
  });

  io.on('connection', socket => {
    console.log('connection', socket.id);

    socket.on('client_user_typing', (isTyping) => {
      console.log('client_user_typing', isTyping);
      // socket.emit();
      // io.emit();
      // socket.broadcast.emit();
      socket.broadcast.emit('server_user_typing', {
        user: socket.user.name,
        isTyping,
      });
    });

    socket.on('client_user_message', (msg) => {
      console.log('client_user_message', msg);

      socket.broadcast.emit('server_user_message', {
        user: socket.user.name,
        msg,
      });

      await Message.create({
        user: socket.user,
        text: msg,
        date: new Date(),
      });
    });

    socket.on('disconnect', () => {
      console.log('disconnect', socket.id);

      socket.broadcast.emit('user_disconnect', socket.id);
    });
  });
}

module.exports = socket;
