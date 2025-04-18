import bcrypt from 'bcryptjs' 
export const generatehash=({plaintext="",salt=process.env.SALT}={})=>{
    const hash=bcrypt.hashSync(plaintext,parseInt(salt))
    return hash
}
export const comparehash=({plaintext="",hashvalue=""}={})=>{
  const hash= bcrypt.compareSync(plaintext,hashvalue)
    return hash
}
