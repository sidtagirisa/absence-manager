import server from './server';
import config from './config';

server.listen(config.serverPort, () => {
  console.info(`Started on port ${config.serverPort}`);
});
