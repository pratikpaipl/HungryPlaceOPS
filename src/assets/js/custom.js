function encryptData(valueToEncrypt) {
    // encrypt value
    // let valueToEncrypt = '123456' // this could also be object/array/whatever
    password = '123456';
    encrypted = CryptoJSAesJson.encrypt(valueToEncrypt, password);
    // let encrypted = JSON.stringify({"ct":"LDEK0T6tv4fVhTuKMSjF+g==","iv":"88079871713f16ddf23cb263a2721fbb","s":"dc0eb6cda6684973"});
    console.log('Encrypted:', encrypted);
    // something like: {"ct":"10MOxNzbZ7vqR3YEoOhKMg==","iv":"9700d78e12910b5cccd07304333102b7","s":"c6b0b7a3dc072248"}
    decrypted = CryptoJSAesJson.decrypt(encrypted, password);
    console.log('Decrypted:', decrypted);
}

function callSound() {
    var bleep = new Audio();
    //bleep.src = '../audio/bell_ring.mp3';
    bleep.src = 'assets/audio/bell_ring.mp3';
    bleep.play();

}