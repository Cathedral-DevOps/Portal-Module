document.addEventListener("DOMContentLoaded", ()=>{

  const firebaseConfig = window.APP_CONFIG?.firebaseConfig;
  if (!firebaseConfig || !firebaseConfig.apiKey) {
      throw new Error("Firebase config is missing from the server-rendered page.");
  }

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();


// 2. Initialize Firebase and Firestore


// 3. Function to fetch data and build the table
async function loadTableData() {
  const tableBody = document.getElementById("table-body");
  tableBody.innerHTML = ""; // Clear existing rows

  try {
    // Get all documents from the "users" collection
    
    db.collection("events").onSnapshot((querySnapshot)=>{
      let runningTotal = 0;
    
       querySnapshot.forEach((doc) => {
      const data = doc.data();
      
      // Pull out specific fields you want
      const name = data.title || "N/A";
      const datetime = data.DateTime || "N/A";
      const desc = data.description || "N/A";
      const registered = data.registered || "N/A";

      // Create a new table row element
      const row = document.createElement("tr");

      // Insert the fields into the row
      row.innerHTML = `
        <td>${name}</td>
        <td>${datetime}</td>
        <td>${registered}</td>
        <td>${desc}</td>
      `;

      // Append the row to the table body
      tableBody.appendChild(row);
    })
      
      
    })
    
   
  } catch (error) {
    console.error("Error getting documents: ", error);
  }
}

// Run the function when the page loads
loadTableData();



});