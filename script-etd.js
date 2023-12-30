// Function to toggle the visibility of the add form
function toggleForm() {
  var form = document.getElementById("addForm");
  form.style.display = form.style.display === "none" ? "flex" : "none";
}

// Function to make a row editable
function makeRowEditable(row) {
  var fields = ["numCarte", "nom", "prenom", "annee", "email"];
  fields.forEach((field, index) => {
    let cellValue = row.cells[index].innerHTML;
    let inputType = field === "email" ? "email" : "text";
    row.cells[
      index
    ].innerHTML = `<input type="${inputType}" value="${cellValue}">`;
  });
  row.cells[5].innerHTML =
    '<button class="save" onclick="saveRow(this.parentNode.parentNode)">Sauvgarder</button> ' +
    '<button class="delete" onclick="deletePerson(this)">Supprimer</button>';
}

// Function to save the edited data in a row
function saveRow(row) {
  var fields = ["numCarte", "nom", "prenom", "annee", "email"];
  fields.forEach((field, index) => {
    let input = row.cells[index].getElementsByTagName("input")[0].value;
    if (!input) {
      alert("All fields must be filled out!");
      return;
    }
    row.cells[index].innerHTML = input;
  });
  row.cells[5].innerHTML =
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
  var newRow = table.insertRow();
  var fields = ["numCarte", "nom", "prenom", "annee", "email"];
  fields.forEach((field) => {
    let fieldValue = document.getElementById(field).value;
    if (!fieldValue) {
      alert("All fields must be filled out!");
      return;
    }
    newRow.insertCell().innerHTML = fieldValue;
  });
  newRow.insertCell().innerHTML =
    '<button class="edit" onclick="makeRowEditable(this.parentNode.parentNode)">Modifier</button> ' +
    '<button class="delete" onclick="deletePerson(this)">Supprimer</button>';
  // Clear the input fields after adding
  fields.forEach((field) => (document.getElementById(field).value = ""));
  toggleForm(); // Hide the form again after adding
}
