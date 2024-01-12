// document.addEventListener("DOMContentLoaded", function () {
//   var lists = [];

//   var addListButton = document.getElementById("addListButton");
//   var formContainer = document.getElementById("formin");
//   var listContainer = document.getElementById("listContainer");
//   var updateModal = document.getElementById("updateModal");
//   var updateNameInput = document.getElementById("update-name-input");
//   var updateDateInput = document.getElementById("update-date-input");
//   var updateItemsTextarea = document.getElementById("update-items-textarea");
//   var updateDoneButton = document.getElementById("updateDoneButton");

//   addListButton.addEventListener("click", function () {
//       formContainer.classList.remove("hidden");
//   });

//   var addButton = document.getElementById("addButton");
//   addButton.addEventListener("click", function () {
//       var listNameInput = document.getElementById("list-name-input");
//       var dateInput = document.getElementById("date-input");

//       var listName = listNameInput.value;
//       var date = dateInput.value;

//       if (listName) {
//           var originalListName = listName;
//           var originalDate = date;

//           var newList = {
//               name: listName,
//               date: date,
//               items: [] // Array to store items for this list
//           };

//           lists.push(newList);
//           var newListCard = document.createElement("div");
//           newListCard.classList.add("w-100", "border-solid", "border-2", "border-slate-200", "shadow-lg", "my-6", "mx-3");

//           var headerContainer = document.createElement("div");
//           headerContainer.classList.add("w-100", "mb-4");

//           var listButtonContainer = document.createElement("button");
//           listButtonContainer.classList.add("text-4xl", "text-center", "h-24", "bg-blue-500", "w-full", "hover:bg-blue-700", "text-white", "font-bold", "py-2", "rounded", "focus:outline-none", "focus:shadow-outline");
//           listButtonContainer.textContent = listName + " - " + date;

//           var buttonsContainer = document.createElement("div");
//           buttonsContainer.classList.add("flex", "justify-center", "space-x-2");

//           var updateListButton = document.createElement("button");
//           updateListButton.classList.add("update-list-button", "border-2", "bg-blue-400", "hover:bg-blue-600", "text-white", "font-bold", "p-2", "rounded");
//           updateListButton.setAttribute("id", "updateListButton")
//           updateListButton.textContent = "Update List";

//           var deleteListButton = document.createElement("button");
//           deleteListButton.classList.add("delete-list-button", "border-2", "bg-blue-400", "hover:bg-blue-600", "text-white", "font-bold", "p-2", "rounded");
//           deleteListButton.textContent = "Delete List";

//           buttonsContainer.appendChild(updateListButton);
//           buttonsContainer.appendChild(deleteListButton);

//           headerContainer.appendChild(listButtonContainer);
//           headerContainer.appendChild(buttonsContainer);

//           newListCard.appendChild(headerContainer);

//           deleteListButton.addEventListener("click", function () {
//               newListCard.remove();
//               var index = lists.indexOf(newList);
//               if (index !== -1) {
//                   lists.splice(index, 1);
//               }
//           });

//           updateListButton.addEventListener("click", function () {
//               updateNameInput.value = originalListName; // Set the original name as default
//               updateDateInput.value = originalDate; // Set the original date as default
//               updateItemsTextarea.value = newList.items.join('\n'); // Set the items in textarea
//               updateModal.classList.remove("hidden");
//           });

//           var cancelUpdateButton = document.getElementById("cancelUpdateButton");
//           cancelUpdateButton.addEventListener("click", function () {
//               updateNameInput.value = originalListName;
//               updateDateInput.value = originalDate;
//               updateItemsTextarea.value = newList.items.join('\n');
//               updateModal.classList.add("hidden");
//           });

//           updateDoneButton.addEventListener("click", function () {
//               var updatedName = updateNameInput.value;
//               var updatedDate = updateDateInput.value;
//               var updatedItems = updateItemsTextarea.value.split('\n').map(item => item.trim());

//               if (updatedName && updatedDate) {
//                   newList.name = updatedName;
//                   newList.date = updatedDate;
//                   newList.items = updatedItems;

//                   // Update the button content to include items
//                   listButtonContainer.textContent = updatedName + " - " + updatedDate + " + (" + updatedItems.length + " items)";
//               }

//               updateModal.classList.add("hidden");
//           });

//           var newItemCard = document.createElement("div");
//           newItemCard.classList.add("item-card");

//           var itemInputContainer = document.createElement("div");
//           itemInputContainer.classList.add("input-container");

//           var itemInput = document.createElement("input");
//           itemInput.type = "text";
//           itemInput.classList.add("item-input", "w-4/5");
//           itemInput.placeholder = "Enter an item";

//           var plusButton = document.createElement("button");
//           plusButton.classList.add("plus-button", "mr-auto", "mr-0", "flex-shrink-0");
//           plusButton.textContent = "+";

//           plusButton.addEventListener("click", function handlePlusButtonClick() {
//               var newItem = itemInput.value.trim();

//               if (newItem) {
//                   newList.items.push(newItem);

//                   var listItem = document.createElement("li");
//                   listItem.textContent = newItem;

//                   var deleteButton = document.createElement("button");
//                   deleteButton.classList.add("delete-button", "border-2", "border-slate-200", "ml-12", "justify-end", "bg-red-400", "rounded");
//                   deleteButton.textContent = "Delete";

//                   deleteButton.addEventListener("click", function () {
//                       listItem.remove();
//                       deleteButton.style.display = "none";
//                       var itemIndex = newList.items.indexOf(newItem);
//                       if (itemIndex !== -1) {
//                           newList.items.splice(itemIndex, 1);
//                       }
//                   });

//                   var deleteContainer = document.createElement("div");
//                   deleteContainer.classList.add("flex", "items-center", "justify-evenly", "p-4", "mr-auto", "ml-auto", "mb-2");

//                   deleteContainer.appendChild(listItem);
//                   deleteContainer.appendChild(deleteButton);

//                   var itemList = document.createElement("ul");
//                   newList.items.forEach(function (item) {
//                       var listItem = document.createElement("li");
//                       listItem.textContent = item;
                      
//                   });

//                   deleteContainer.appendChild(itemList);

//                   newItemCard.appendChild(deleteContainer);

//                   // Update the button content to include items
//                   plusButton.textContent = `+ (${newList.items.length} items)`;

//                   itemInput.value = "";
//                   // Remove the event listener after the first click
//                   plusButton.removeEventListener("click", handlePlusButtonClick);
//                   // Hide the plus button and input
//                   plusButton.style.display = "none";
//                   itemInput.style.display = "none";
//               }
//           });

//           itemInputContainer.appendChild(itemInput);
//           itemInputContainer.appendChild(plusButton);

//           newItemCard.appendChild(itemInputContainer);

//           newListCard.appendChild(newItemCard);

//           listContainer.appendChild(newListCard);

//           listNameInput.value = "";
//           dateInput.value = "";
//           formContainer.classList.add("hidden");
//       }
//   });
// });
