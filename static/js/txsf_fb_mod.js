  // Your web app's Firebase configuration
  
  
document.addEventListener("DOMContentLoaded", ()=>{  
  const firebaseConfig = {
    apiKey: "AIzaSyBFiUuROwzKQo2aojDa5RD89ZRLzCQZnmE",
    authDomain: "txsf-flutter.firebaseapp.com",
    projectId: "txsf-flutter",
    storageBucket: "txsf-flutter.firebasestorage.app",
    messagingSenderId: "665008585152",
    appId: "1:665008585152:web:113d1d1210ea4711863025"
  };

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const counterBtn = document.getElementById('cBtn');
const outputElement = document.getElementById('aEr');

  counterBtn.addEventListener('click', async () => {
  outputElement.innerText = "Fetching data...";

  try {

    db.collection("events").onSnapshot((querySnapshot)=>{
      let runningTotal = 0;
    
      querySnapshot.forEach((doc)=>{
      const data = doc.data();
        runningTotal += data.registered;
        outputElement.textContent = runningTotal;
      })
      
      
    })
      

  } catch (error) {
      console.error("Firestore read failed:", error);
      outputElement.innerText = `Failed to get data. 206`;
  }
  });


  const submitPopupBtn = document.getElementById('submit-popup-btn');
  const popNameInput = document.getElementById('pop-vodName');
  const popLinkInput = document.getElementById('pop-link');
  const bootstrapModal = new bootstrap.Modal(document.getElementById('entryModal'));
  submitPopupBtn.addEventListener('click', ()=>{
    const enteredName = popNameInput.value;
    const enteredlink = popLinkInput.value;
    
    db.collection("vod").add({
      title: enteredName,
      link: enteredlink,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
        console.log("Written!");
        popNameInput.value = '';
        popLinkInput.value = '';
        bootstrapModal.hide();
    })
    .catch((error)=>{
      console.error("Error:", error);
    })
  })

});
