import configs from '../configs/index.js';
import {APIError, Cryptographer} from '../utils/index.js';

const authorizationHandler = async (req, _, next) => {
  try {
    const {authorization} = req.headers;

    if (!authorization) throw new APIError(403, 'Unauthorized');

    const token = authorization.split(' ')[1];

    const {email} = await Cryptographer.verifyToken(token, configs.AT_SECRET);

    req.email = email;
    next();
  } catch (error) {
    next(error);
  }
};

export default authorizationHandler;
