import db from '../db/models';
import { decodeToken, tokenExpired } from '../utils';


class Middleware {
    static async authenticate(req, res, next) {
        const token = req.headers['x-access-token'];
    
        try {
          const decodedToken = decodeToken(token);
    
          const { email } = decodedToken;
    
          const user = await db.user.findOne({
            where: { email },
          });
    
          if (!user) {
            return res.status(401).send({
              message: 'Unauthorized',
            });
          }
          req.user = user;
          next();
        } catch (error) {
          return res.status(400).send({
            message: 'Unauthorized',
          });
        }
      }

      static async isAdmin(req, res, next) {
        const { role } = req.user;
    
        if (role !== 'admin') {
          return res.status(401).send({
            error: 'Unauthorized',
          });
        }
        next();
      }

      static async isExpiredToken(req, res, next) {
        const token = req.headers['x-access-token'];
    
        const isblocked = await tokenExpired(token);
    
        if (isblocked) {
          return res.status(403).send({
            message: 'Unauthorized',
          });
        }
    
        next();
      }
}

export default Middleware;
