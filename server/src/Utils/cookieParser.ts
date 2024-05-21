type TCookie = {
    domain:string;
    path:string;
    httpOnly:boolean;
    sameSite:string;
    secure:boolean;
    maxAge:number;
};


class cookieParser {

    public static parseCookie(cookie: string): { [key: string]: string } {
        const cookieArr = cookie.split(';');
        const cookieObj: { [key: string]: string } = {};
        cookieArr.forEach((cookie) => {
            const [key, value] = cookie.split('=');
            cookieObj[key.trim()] = value;
        });
        return cookieObj;
    }

    public static createCookieString(name, value, options:TCookie): string {
        let cookieStr = `${name}=${value}`;
        for (const key in options) {
            cookieStr += `;${key}=${options[key]}`;
        }
        return cookieStr;
    }

    public static getCookieValue(cookie: string, key: string): string {
        const cookieObj = cookieParser.parseCookie(cookie);
        return cookieObj[key];
    }

    public  static async setCookieValue(name: string, value: any, res): Promise<void> {
        await res.cookie(name, value, {domain: process.env.COOKIEDOMAIN, path: "/", httpOnly: true, sameSite: "strict", secure: true, maxAge: 1000 * 60 * 60 * 24});
        return;
    }

    public static async deleteCookie(name: string, res): Promise<void> {
        await res.cookie(name, '', {maxAge: 0, httpOnly: true, domain: process.env.COOKIEDOMAIN, path: "/", sameSite: "strict", secure: true});
        return;
    }
}

export default cookieParser;