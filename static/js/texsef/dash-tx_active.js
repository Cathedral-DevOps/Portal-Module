function add(){
  // 1. Get input elements
  let name = document.getElementById("nameInput");
  let school = document.getElementById("schoolInput");
  let coach = document.getElementById("coachInput");
  let game = document.getElementById("gameInput");

  // 2. Validate that at least the name is provided
  if (name.value.trim() === "") {
    alert("Please enter a player name!");
    return;
  }

  // 3. Create a new table row element
  let newRow = document.createElement("tr");

  // 4. Fill row with HTML matching the Bootstrap layout
  newRow.innerHTML = `
    <td class="fw-bold">${name.value}</td>
    <td>${school.value || 'N/A'}</td>
    <td>${coach.value || 'N/A'}</td>
    <td>${game.value || 'N/A'}</td>
    <td class="text-center">
      <button onclick="toggleCheckIn(this)" class="btn btn-sm btn-secondary">Not Checked In</button>
    </td>
  `;

  // 5. Append to the table body
  document.getElementById("rosterTableBody").appendChild(newRow);

  // 6. Clear fields for next entry
  name.value = "";
  school.value = "";
  coach.value = "";
  game.value = "";
}

function toggleCheckIn(button) {
  if (button.classList.contains("btn-secondary")) {
    button.classList.replace("btn-secondary", "btn-success");
    button.textContent = "Checked In";
    // ADD FIREBASE BOOLEAN CHANGE
  } else {
    button.classList.replace("btn-success", "btn-secondary");
    button.textContent = "Not Checked In";
    // ADD FIREBASE BOOLEAN CHANGE
  }
}

//CheckedIn
// false
// (boolean)

// Coach
// ""
// (string)

// Game
// ""
// (string)

// Name
// ""
// (string)

// School
// ""

document.addEventListener("DOMContentLoaded", () => {
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
        db.collection("events").onSnapshot((querySnapshot) => {
          let runningTotal = 0;

          querySnapshot.forEach((doc) => {
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

    let docOfinterest = '';
    const bootstrapImportModal = new bootstrap.Modal(document.getElementById('ImportSelModal'));
    const submitPopupBtn = document.getElementById('submit-popup-btn-i');
    const popNameInput = document.getElementById('pop-eventNamelu');
    const resultStr = document.getElementById('rstr');
    const importRegsBtn = document.getElementById('import-regs-btn');

    submitPopupBtn.addEventListener('click', () => {
      const enteredName = popNameInput.value;
      const targetField = "title";

      db.collection("events")
        .where(targetField, "==", enteredName)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("No matching document found.");
            resultStr.innerHTML = "No matching document found.";
            return;
          }

          querySnapshot.forEach((doc) => {
            console.log("Successfully found document ID:", doc.id);
            const itemsList = [];
            const documentData = doc.data();
            documentData.id = doc.id;
            console.log("Document fields contents:", documentData);
            itemsList.push(documentData);
            console.log(itemsList);
            docOfinterest = documentData.id;
            resultStr.innerHTML = "Found Data! " + "Registered: " + itemsList[0].registered;
          });

          popNameInput.value = '';
        })
        .catch((error) => {
          console.error("Error searching collection fields: ", error);
          resultStr.innerHTML = "Error: " + error;
        });
    });

    importRegsBtn.addEventListener('click', () => {
      db.collection("events")
        .doc(docOfinterest)
        .collection("registeredPlayers")
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("Subcollection found.");
            return;
          }

          const playerslist = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));

          console.log("Total documents pulled: ", playerslist.length);

          playerslist.forEach((player) => {
            const newRow = document.createElement("tr");
            newRow.innerHTML = `
              <td class="fw-bold">${player.PlayerName}</td>
              <td>${player.School || 'N/A'}</td>
              <td>${player.Coach || 'N/A'}</td>
              <td>${player.Game || 'N/A'}</td>
              <td class="text-center">
                <button onclick="toggleCheckIn(this)" class="btn btn-sm btn-secondary">Not Checked In</button>
              </td>
            `;
            document.getElementById("rosterTableBody").appendChild(newRow);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    });
  }).catch(error => {
    console.error('Firebase config load failed:', error);
  });
});
