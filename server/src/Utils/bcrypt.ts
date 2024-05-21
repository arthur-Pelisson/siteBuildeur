import * as bcrypt from 'bcrypt';
import Key from '../config/key';

class Bcrypt extends Key {

    public static addPepper(password: string): string {
        return password + this._pepper;
    }
    
    public static async hashPassword(password: string): Promise<string> {
        password = this.addPepper(password);
        password = await bcrypt.hash(password, 10);
        password = await this.encryptPassword(password);
        return password;
    }

    public static async encryptText(text: string): Promise<string> {
        return this.encryptPassword(text);
    }
    
    public static async decryptText(text: string): Promise<string> {
        return this.decryptPassword(text);
    }

    private static async encryptPassword(password: string): Promise<string> {
        return this._cryptr.encrypt(password);
    }

    private static async decryptPassword(password: string): Promise<string> {
        return this._cryptr.decrypt(password);
    }

    public static async comparePassword(password: string, hash: string): Promise<boolean> {
        hash = await this.decryptPassword(hash);
        try {
            return await bcrypt.compare(this.addPepper(password), hash);
        } catch (error) {
            return false;
        }
    }
}

export default Bcrypt;