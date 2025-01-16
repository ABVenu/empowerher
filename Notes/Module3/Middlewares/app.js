const crypto = require('crypto'); 
 
// Function to encrypt a message 
function encrypt(text, key) { 
    const iv = crypto.randomBytes(16); // Generate a random IV 
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv); 
    let encrypted = cipher.update(text, 'utf8', 'hex'); 
    encrypted += cipher.final('hex'); 
    return { iv: iv.toString('hex'), encryptedData: encrypted }; 
} 
 
// Function to decrypt a message 
function decrypt(encryptedData, key, iv) { 
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(iv, 'hex')); 
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8'); 
    decrypted += decipher.final('utf8'); 
    return decrypted; 
} 
 
// Example usage 
// const key = crypto.randomBytes(32); // AES-256 key 
// const message = "Hello, World!"; 
// const encrypted = encrypt(message, key); 
// console.log("Encrypted:", encrypted); 
 
// const decrypted = decrypt(encrypted.encryptedData, key, encrypted.iv); 
// console.log("Decrypted:", decrypted);
console.log(crypto.randomUUID())