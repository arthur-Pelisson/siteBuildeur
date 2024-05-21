import { Request, Response, NextFunction  } from 'express';
import rateLimit from 'express-rate-limit';
class RateLimite {
    static CreateLimiteRateRequest(windowMs: number, max: number) {
        const limiter =  rateLimit({ 
            windowMs: windowMs,
            max: max,
            message: {fr:"Trop de requêtes effectuées, veuillez réessayer plus tard.", en: "Too many requests made, please try again later."},
        });
        return  limiter;
    }

    static async addTimeToRequest(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        setTimeout(() => {
            next();
          }, 2000);
    }
}

export default RateLimite;