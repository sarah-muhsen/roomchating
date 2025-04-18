import CryptoJS from "crypto-js";
export const generateencrypt=({plaintext="",signature=process.env.ENCRYPTION_SIGN})=>{
    const encrypted=CryptoJS.AES.encrypt(plaintext,signature).toString()
    return encrypted
}
export const generatedecrypt=({ciphertext="",signature=process.env.ENCRYPTION_SIGN})=>{
    const decrypted=CryptoJS.AES.decrypt(ciphertext,signature).toString(CryptoJS.enc.Utf8)
    return decrypted
}