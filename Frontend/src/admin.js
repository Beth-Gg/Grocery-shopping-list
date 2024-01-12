// Get the editUser and deleteUser buttons
const editUserButton = document.querySelector('.editUser');
const deleteUserButton = document.querySelector('.deleteUser');

// Get the userName element
const userNameElement = document.querySelector('.userName');

// Add event listener to the editUser button
editUserButton.addEventListener('click', () => {
  // Prompt the user to enter a new userName
  const newUserName = prompt('Enter the new userName:');
  
  // Update the userNameElement with the new userName
  userNameElement.querySelector('p').textContent = newUserName;
});

// Add event listener to the deleteUser button
deleteUserButton.addEventListener('click', () => {
  // Remove the parent div (user div) from the DOM
  const userDiv = deleteUserButton.closest('.user');
  userDiv.remove();
});