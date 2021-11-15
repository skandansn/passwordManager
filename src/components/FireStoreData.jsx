// // react component to get data from firestore
// import React, { useState, useEffect } from 'react';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// function FirestoreData () {
//     const config = {
//         apiKey: "AIzaSyDmbfQ_MUn2eY13V4X_nhVyThs2SH3BF0c",
//         authDomain: "infosec-929eb.firebaseapp.com",
//         projectId: "infosec-929eb",
//         storageBucket: "infosec-929eb.appspot.com",
//         messagingSenderId: "684273163070",
//         appId: "1:684273163070:web:b71b35a67f9b4a60a0ea6f"
//     };
//     const firebase = initializeApp(config);
//     const db = getFirestore(firebase);
//     const [data, setData] = useState([]);
//     const [loading, setLoading] = useState(true);
    
//     useEffect(() => {
        
//         const fetchData = async () => {
//         const citiesCol = collection(db, 'col');
//         const citySnapshot = await getDocs(citiesCol);
//         const cityList = citySnapshot.docs.map(doc => doc.data());
//         console.log(cityList)
//         setLoading(false);
//         };
//         fetchData();
//     }, []);
    
//     return (
//         <div>
//         {loading ? <div>Loading...</div> : <div> {data} </div>}
//         </div>
//     );
// }

// export default FirestoreData;