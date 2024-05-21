class trimData {
    
    static trimBody(req: any, res: any, next: any) {
        for (const key in req.body) {
            if (typeof req.body[key] === 'string') {
              req.body[key] = req.body[key].trim();
            }
          }
        next();
    }

    static trimParams(req: any, res: any, next: any) {
        for (const key in req.query) {
            if (typeof req.query[key] === 'string') {
              req.query[key] = req.query[key].trim();
            }
          }
        next();
    }

    static trimString = (str: string): string => {
        return str.trim();
    }

}

export default trimData;