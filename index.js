import {server, logger} from './src/apps/index.js';
import configs from './src/configs/index.js';

server.listen(configs.PORT, () => {
  logger.info(`Server is listening at port ${configs.PORT}`);
});
