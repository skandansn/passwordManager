import crypto from "crypto-js";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { addDoc,doc, getDoc,setDoc } from "firebase/firestore"; 

const config = {
    apiKey: "AIzaSyDmbfQ_MUn2eY13V4X_nhVyThs2SH3BF0c",
    authDomain: "infosec-929eb.firebaseapp.com",
    projectId: "infosec-929eb",
    storageBucket: "infosec-929eb.appspot.com",
    messagingSenderId: "684273163070",
    appId: "1:684273163070:web:b71b35a67f9b4a60a0ea6f"
};
const firebase = initializeApp(config);
const db = getFirestore(firebase);

function lsGet() {
  return localStorage.getItem("data");
}

function lsSet(data) {
  localStorage.setItem("data", data);
}

function HMAC(encrypted, key) {
  return crypto.HmacSHA256(encrypted, crypto.SHA256(key)).toString();
}

function encrypt(data, key) {
  console.log("All unencrypted data:",data);
  let encrypted = crypto.AES.encrypt(JSON.stringify(data), key).toString();
  console.log("AES Encrypted data:", encrypted);
  let hmac = HMAC(encrypted, key);
  console.log("HMAC hashed message:", hmac);
  console.log("HMAC+encrypted  message:", hmac + encrypted);
  return hmac + encrypted;
}

function decrypt(data, key){
  console.log("All encrypted data",data);
  let hmac = data.substring(0, 64);
  console.log("HMAC hashed message:", hmac);
  let encrypted = data.substring(64);
  console.log("AES Encrypted data:", encrypted);
  let decryptedHmac = HMAC(encrypted, key);
  console.log("Decrypted HMAC ", decryptedHmac);
  if (hmac === decryptedHmac) {
    let decrypted = crypto.AES.decrypt(encrypted, key).toString(
      crypto.enc.Utf8
    );
    console.log("Decrypted data:", decrypted);
    return JSON.parse(decrypted);
  } else return null;
}

function download(text) {
  let element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", `${(Date.now() / 1000) << 0}-data.txt`);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function fireStoreUpload(text,key) {
    setDoc(doc(db, "col", key), {text:text});
}

//async fucntion
// async function getDocs(db, collection, query) {
//     let docs = await getDocs(db, collection, query);
//     return docs;
// }


async function fireStoreDownload(keyx) {
    const querySnapshot = await getDocs(collection(db, "col"));
querySnapshot.forEach((doc) => {
    console.log(doc.id,keyx);
    if (doc.id === keyx) {
        console.log("Found data in firestore");
        let data = doc.data().text;
        alert(data);
        console.log(data);
    }
  });

    

}


function random() {
  return window.crypto.getRandomValues(new Uint32Array(1))[0] / 4294967296;
}

function generatePassword(length, symbols = false) {
  let chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  if (symbols) chars += "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";

  return [...Array(length).keys()]
    .map(_ => chars[(random() * chars.length) << 0])
    .join("");
}

function keyFilter(obj, key) {
  return Object.keys(obj)
    .filter(x => x !== key)
    .reduce((acc, key) => {
      return {
        ...acc,
        [key]: obj[key]
      };
    }, {});
}

export {
  lsGet,
  lsSet,
  encrypt,
  decrypt,
  download,
  generatePassword,
  keyFilter,
  fireStoreUpload,
  fireStoreDownload
};
