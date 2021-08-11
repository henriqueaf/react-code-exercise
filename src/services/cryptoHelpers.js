import CryptoJS from 'crypto-js';

const ENCRYPTION_SECRET = 'n2r5u8x!A%D*G-KaPdSgVkYp3s6v9y$B?E(H+MbQeThWmZq4t7w!z%C*F)J@NcRf'

export const encrypt = (jsonParams) => {
  const paramsString = JSON.stringify(jsonParams);
  return CryptoJS.AES.encrypt(paramsString, ENCRYPTION_SECRET).toString();
}

export const decrypt = (string) => {
  const decrypted = CryptoJS.AES.decrypt(string, ENCRYPTION_SECRET);
  return JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));
}
