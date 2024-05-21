class Regex {

    static readonly emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    static readonly passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%&])[a-zA-Z\d!@#$%&]{8,}$/;
    
    static validateEmail(email: string): boolean {
        return this.emailRegex.test(this.trimString(email));
    }

    static validatePassword(password: string): boolean {
        return this.passwordRegex.test(password);
    }

    static trimString(str: string): string {
        return str.trim();
    }
}
export default Regex;