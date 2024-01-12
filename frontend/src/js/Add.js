// Event listener for the Add button
const addButton = document.querySelector('#formin button');
addButton.addEventListener('click', () => {
  const listNameInput = document.getElementById('List-name');
  const listName = listNameInput.value.trim();
  
  // Perform any necessary validation on the input
  
  // Call the function to add the list
  addList(listName);
});

// Function to add a list
function addList(listName) {
  // Prepare the data to be sent in the request body
  const data = {
    name: listName
  };

  // Make an AJAX request to your backend server
  fetch('http://localhost:3000/add-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => {
    if (response.ok) {
      // List added successfully, perform any necessary actions
      console.log('List added successfully');
    } else {
      // Handle the error
      console.error('Failed to add list');
    }
  })
  .catch(error => {
    console.error('An error occurred:', error);
  });
}