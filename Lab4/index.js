// Initialize an empty array to store notes
let notes = [];

// Check if there are any notes stored in localStorage
if (localStorage.getItem("notes")) {
  // If there are, parse the JSON string and assign it to the notes variable
  notes = JSON.parse(localStorage.getItem("notes"));
}

// Function to display all notes in a list on the page
function displayNotes() {
  // Clear any existing notes from the list
  document.querySelector("#notes-list").innerHTML = "";

  // Iterate through the notes array
  for (let i = 0; i < notes.length; i++) {
    let note = notes[i];
    let color = note.color;
    let pin = note.pin ? "pinned" : "";
    // Create a new list item for each note
    let noteItem = document.createElement("li");
    noteItem.innerHTML = `
      <h2 class="note-title ${color} ${pin}">${note.title}</h2>
      <p class="note-content ${color}">${note.content}</p>
      <p class="note-date ${color}">${note.date}</p>
      <button class="delete-button" data-index=${i}>Delete</button>
    `;
    // Add the note item to the list on the page
    document.querySelector("#notes-list").appendChild(noteItem);
  }
  // add event listener to delete buttons
  let deleteButtons = document.querySelectorAll(".delete-button");
  for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener("click", function(e) {
      let index = e.target.dataset.index;
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      displayNotes();
    });
  }
}
// Function to display the edit form for a specific note
function showEditForm(index) {
    // Get the note to edit
    let note = notes[index];
  
    // Create the form element
    let editForm = document.createElement("form");
    editForm.innerHTML = `
      <input type="text" id="edit-note-title" value="${note.title}">
      <textarea id="edit-note-content">${note.content}</textarea>
      <label for="edit-color-select">Select note color:</label>
      <select id="edit-color-select">
        <option value="white">White</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
        <option value="blue">Blue</option>
        <option value="pink">Pink</option>
      </select>
      <label for="edit-pin-checkbox">Pin note to top</label>
      <input type="checkbox" id="edit-pin-checkbox">
      <button type="submit">Save</button>
      <button type="button" id="cancel-edit-button">Cancel</button>
    `;
    // Set the selected value of the color select to the current color of the note
    editForm.querySelector("#edit-color-select").value = note.color;
    // Set the checked status of the pin checkbox to the current pin status of the note
    editForm.querySelector("#edit-pin-checkbox").checked = note.pin;
    // Add the form to the page
    document.body.appendChild(editForm);
  
    // Add event listener for the form submission
    editForm.addEventListener("submit", function(e) {
      e.preventDefault();
      // Get the new values from the form
      let newTitle = document.querySelector("#edit-note-title").value;
      let newContent = document.querySelector("#edit-note-content").value;
      let newColor = document.querySelector("#edit-color-select").value;
      let newPin = document.querySelector("#edit-pin-checkbox").checked;
      // Update the note in the notes array
      notes[index].title = newTitle;
      notes[index].content = newContent;
      notes[index].color = newColor;
      notes[index].pin = newPin;
      // Update the notes in localStorage
      localStorage.setItem("notes", JSON.stringify(notes));
      // Remove the form from the page
      document.body.removeChild(editForm);
      // Call the displayNotes function to update the list on the page
      displayNotes();
    });
  
    // Add event listener for the cancel button
    document.querySelector("#cancel-edit-button").addEventListener("click", function() {
      // Remove the form from the page
      document.body.removeChild(editForm);
    });
  }

// Call the displayNotes function to display any existing notes
displayNotes();

// Add event listener for the form to create a new note
document.querySelector("#new-note-form").addEventListener("submit", function(e) {
  // Prevent the form from submitting
  e.preventDefault();

  // Get the value of the input fields
  let newNoteTitle = document.querySelector("#new-note-title").value;
  let newNoteContent = document.querySelector("#new-note-content").value;
  let newNoteColor = document.querySelector("#color-select").value;
  let newNotePin = document.querySelector("#pin-checkbox").checked;
  let newNoteDate = new Date().toLocaleString();

  // Create new note object
  let newNote = {
    title: newNoteTitle,
    content: newNoteContent,
    color: newNoteColor,
    pin: newNotePin,
    date: newNoteDate
  }

  // Add the new note to the notes array
  if (newNotePin) {
    notes.unshift(newNote);
  } else {
    notes.push(newNote);
  }

  // Update the notes in localStorage
  localStorage.setItem("notes", JSON.stringify(notes));

  // Clear the input fields
  document.querySelector("#new-note-title").value = "";
  document.querySelector("#new-note-content").value = "";
  document.querySelector("#color-select").value = "white";
  document.querySelector("#pin-checkbox").checked = false;

  let noteItem = document.createElement("li");
  noteItem.innerHTML = `
    <h2 class="note-title ${note.color} ${pin}">${note.title}</h2>
    <p class="note-content ${note.color}">${note.content}</p>
    <p class="note-date ${note.color}">${note.date}</p>
    <button class="edit-button" data-index=${i}>Edit</button>
    <button class="delete-button" data-index=${i}>Delete</button>
  `;

  // Call the displayNotes function to update the list on the page
 
    displayNotes();

    
});