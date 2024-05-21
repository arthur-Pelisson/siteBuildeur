import Cryptr from 'cryptr';


export default class Key {
    protected static _cryptr = new Cryptr(process.env.SECRET_KEY_CRYPT);
    protected static _pepper: string = process.env.PEPPER;
}
