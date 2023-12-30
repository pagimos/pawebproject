// Function to toggle the visibility of the add form
function toggleForm() {
  var form = document.getElementById("addForm");
  form.style.display = form.style.display === "none" ? "flex" : "none";
}

// Function to make a row editable
function makeRowEditable(row) {
  for (let i = 0; i < 6; i++) {
    let cellValue = row.cells[i].innerHTML;
    let inputType = i === 5 ? "email" : "text";
    row.cells[i].innerHTML = `<input type="${inputType}" value="${cellValue}">`;
  }
  row.cells[6].innerHTML =
    '<button class="save" onclick="saveRow(this.parentNode.parentNode)">Sauvgarder</button> ' +
    '<button class="delete" onclick="deletePerson(this)">Supprimer</button>';
}

// Function to save the edited data in a row
function saveRow(row) {
  for (let i = 0; i < 6; i++) {
    let input = row.cells[i].getElementsByTagName("input")[0].value;
    if (!input) {
      alert("All fields must be filled out!");
      return;
    }
    row.cells[i].innerHTML = input;
  }
  row.cells[6].innerHTML =
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
  var fields = ["nom", "prenom", "domaine", "grade", "adresse", "email"];
  for (let i = 0; i < fields.length; i++) {
    let fieldValue = document.getElementById(fields[i]).value;
    if (!fieldValue) {
      alert("All fields must be filled out!");
      return;
    }
    newRow.insertCell(i).innerHTML = fieldValue;
  }
  newRow.insertCell(6).innerHTML =
    '<button class="edit" onclick="makeRowEditable(this.parentNode.parentNode)">Modifier</button> ' +
    '<button class="delete" onclick="deletePerson(this)">Supprimer</button>';
  // Clear the input fields after adding
  fields.forEach((field) => (document.getElementById(field).value = ""));
  toggleForm(); // Hide the form again after adding
}
