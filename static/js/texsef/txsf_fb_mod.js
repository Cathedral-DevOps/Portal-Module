  // Your web app's Firebase configuration
  
  
document.addEventListener("DOMContentLoaded", ()=>{
  const loadFirebaseConfig = async () => {
    const response = await fetch('/api/firebase-config', { credentials: 'same-origin' });
    if (!response.ok) {
      throw new Error(`Failed to load Firebase config: ${response.status}`);
    }
    const data = await response.json();
    if (!data.firebaseConfig || !data.firebaseConfig.apiKey) {
      throw new Error('Firebase config is missing from /api/firebase-config.');
    }
    return data.firebaseConfig;
  };

  loadFirebaseConfig().then(firebaseConfig => {
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
          });
        });
      } catch (error) {
        console.error("Firestore read failed:", error);
        outputElement.innerText = `Failed to get data. 206`;
      }
    });



  // This code is for the VOD, Event, and News functions
      const bootstrapModal = new bootstrap.Modal(document.getElementById('entryModal'));
      const submitPopupBtn = document.getElementById('submit-popup-btn');
      const popNameInput = document.getElementById('pop-vodName');
      const popLinkInput = document.getElementById('pop-link');
  
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
      });

      const bootstrapNewsModal = new bootstrap.Modal(document.getElementById('newsModal'));
      const submitPopupBtn2 = document.getElementById('submit-popup-btn2');
      const popNewsInput = document.getElementById('pop-eventName');
      const popContentInput = document.getElementById('pop-content');


      submitPopupBtn2.addEventListener('click', ()=>{
        const enteredName = popNewsInput.value;
        const enteredContent = popContentInput.value;
        
        db.collection("news").add({
          title: enteredName,
          content: enteredContent,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("Written!");
            popNewsInput.value = '';
            popContentInput.value = '';
            bootstrapNewsModal.hide();
        })
        .catch((error)=>{
          console.error("Error:", error);
        })
      });

      const bootstrapEventModal = new bootstrap.Modal(document.getElementById('eventModal'));
      const submitPopupBtn3 = document.getElementById('submit-popup-btn3');
      const popEventInput = document.getElementById('pop-event2Name');
      const popDateTimeInput = document.getElementById('pop-dti');
      const popDescriptionInput = document.getElementById('pop-description');


      submitPopupBtn3.addEventListener('click', ()=>{
        const enteredName = popEventInput.value;
        const enteredDateTime = popDateTimeInput.value;
        const enteredDescription = popDescriptionInput.value;
        const registered = 0;

        db.collection("events").add({
          title: enteredName,
          description: enteredDescription,
          DateTime: enteredDateTime,
          registered: registered,
          createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
            console.log("Written!");
            popEventInput.value = '';
            popDateTimeInput.value = '';
            popDescriptionInput.value = '';


            bootstrapEventModal.hide();
        })
        .catch((error)=>{
          console.error("Error:", error);
        })
      });

  // Import functions- for release: only need the import by selected event and import most recent

      

});
