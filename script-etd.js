// Function to toggle the visibility of the add form
function toggleForm() {
  var form = document.getElementById("addForm");
  form.style.display = form.style.display === "none" ? "flex" : "none";
}

// Function to make a row editable
function makeRowEditable(row) {
  var fields = ["nom", "prenom", "email", "password", "numCarte", "Annee"];
  fields.forEach((field, index) => {
    let cellValue = row.cells[index].innerHTML;
    let inputType =
      field === "email" ? "email" : field === "password" ? "password" : "text";
    row.cells[
      index
    ].innerHTML = `<input class="table" type="${inputType}" value="${cellValue}">`;
  });
  // Keep "Commentaire" and "Cour" columns unchanged
  let actionsCellIndex = fields.length + 2;
  row.cells[actionsCellIndex].innerHTML =
    '<button class="save" onclick="saveRow(this.parentNode.parentNode)">Sauvegarder</button> ' +
    '<button class="delete" onclick="deletePerson(this)">Supprimer</button>';
}

// Function to save the edited data in a row
function saveRow(row) {
  var fields = ["nom", "prenom", "email", "password", "numCarte", "Annee"];
  fields.forEach((field, index) => {
    let input = row.cells[index].getElementsByTagName("input")[0].value;
    if (!input) {
      alert("All fields must be filled out!");
      return;
    }
    row.cells[index].innerHTML = input;
  });
  // Keep "Commentaire" and "Cour" columns unchanged
  let actionsCellIndex = fields.length + 2;
  row.cells[actionsCellIndex].innerHTML =
    '<button class="edit" onclick="makeRowEditable(this.parentNode.parentNode)">Modifier</button> ' +
    '<button class="delete" onclick="deletePerson(this)">Supprimer</button>';
}

// Function to delete a row
function deletePerson(btn) {
  var row = btn.parentNode.parentNode;
  row.parentNode.removeChild(row);
}

// Function to add a new person to the table
function addNewPerson() {
  var table = document.getElementById("peopleTable");
  var newRow = table.insertRow(-1); // Use -1 to add the row at the end of the table
  var fields = ["nom", "prenom", "email", "password", "numCarte", "Annee"];

  // Check if all fields are filled out
  for (let i = 0; i < fields.length; i++) {
    let fieldValue = document.getElementById(fields[i]).value;
    if (!fieldValue) {
      alert("All fields must be filled out!");
      table.deleteRow(newRow.rowIndex); // Remove the newly added row
      return; // Stop the function if a field is empty
    }
  }

  // If all fields are filled, continue to add them to the table
  fields.forEach((field) => {
    let fieldValue = document.getElementById(field).value;
    newRow.insertCell().innerHTML = fieldValue;
  });

  // Insert empty cells for "Commentaire" and "Cour"
  newRow.insertCell().innerHTML = ""; // Commentaire
  newRow.insertCell().innerHTML = ""; // Cour

  // Add action buttons
  newRow.insertCell().innerHTML =
    '<button class="edit" onclick="makeRowEditable(this.parentNode.parentNode)">Modifier</button> ' +
    '<button class="delete" onclick="deletePerson(this)">Supprimer</button>';

  // Clear the input fields after adding
  fields.forEach((field) => (document.getElementById(field).value = ""));

  toggleForm(); // Hide the form again after adding
}
