const showButton = document.getElementById("showButton");
const listContainer = document.getElementById("listContainer");
const addListButton = document.getElementById("addListButton");

let listCount = 1;

showButton.addEventListener("click", function() {
  const myComponent = document.createElement("div");
  myComponent.classList.add("xs:mx-5", "Itemsin", "hidden","border-2"," my-2");

  const heading = document.createElement("h3");
  heading.classList.add("text-3xl");
  heading.textContent = "Items";

  const content = document.createElement("div");
  const item = document.createElement("div");
  item.classList.add("mx-2", "h-48", "grid", "sm:justify-items-center", "lg:justify-items-start", "border-solid", "border-2", "border-slate-200", "shadow-lg", "my-6", "lg:h-24");

 


 
  item.appendChild(itemHeading);

  content.appendChild(item);

  myComponent.appendChild(heading);
  myComponent.appendChild(content);

  listContainer.appendChild(myComponent);
});


const formContainer = document.getElementById("formin");
const addButton = document.querySelector("#formin button");
const nameInput = document.getElementById("List-name");
addListButton.addEventListener("click", function() {
formContainer.classList.remove("hidden");
});


addButton.addEventListener("click", function() {
const listName = nameInput.value;
if (listName) {
  const newListCard = document.createElement("div");
  newListCard.classList.add("border-solid", "border-2", "border-slate-200", "shadow-lg", "my-6", "mx-3");

  const newListButton = document.createElement("button");
  newListButton.classList.add("text-4xl", "text-center", "h-24", "align-middle");
  newListButton.textContent = listName;

  newListCard.appendChild(newListButton);

  listContainer.appendChild(newListCard);

  newListButton.addEventListener("click", function() {
    const newItemCard = document.createElement("div");
    newItemCard.classList.add("item-card");

    const itemInputContainer = document.createElement("div");
    itemInputContainer.classList.add("input-container");

    const itemInput = document.createElement("input");
    itemInput.type = "text";
    itemInput.classList.add("item-input");
    itemInput.placeholder = "Enter an item";

    const plusButton = document.createElement("button");
    plusButton.classList.add("plus-button","ml-auto", );
    plusButton.textContent = "+";
    const newListCard = document.createElement("div");
  newListCard.classList.add("border-solid", "border-2", "border-slate-200", "shadow-lg", "my-6", "mx-3");

  

  const deleteListButton = document.createElement("button");
  deleteListButton.classList.add("delete-list-button" ,"border-2", "flex", "justify-end", "flex-row","border-slate-200","bg-blue-400", );
  deleteListButton.textContent = "Delete List";

  newListCard.appendChild(newListButton);
  newListCard.appendChild(deleteListButton);

  listContainer.appendChild(newListCard);

  newListButton.addEventListener("click", function() {
    // List item functionality here
  });

  deleteListButton.addEventListener("click", function() {
    newListCard.remove();
  });


    plusButton.addEventListener("click", function() {
      const newItem = itemInput.value.trim();
      if (newItem) {
        const listItem = document.createElement("li");
        listItem.textContent = newItem;
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-button","border-2", "mx-48","border-slate-200","bg-blue-200");
        deleteButton.textContent = "Delete";

       
        listItem.appendChild(deleteButton);

        deleteButton.addEventListener("click", function() {
          listItem.remove();
        });

        

        const itemList = document.createElement("ul");
        itemList.appendChild(listItem);

        newItemCard.appendChild(itemList);
        itemInput.value = "";
      }
    });

    itemInputContainer.appendChild(itemInput);
    itemInputContainer.appendChild(plusButton);

    newItemCard.appendChild(itemInputContainer);

    newListCard.appendChild(newItemCard);
  });

  // Clear the input field
  nameInput.value = "";

  // Hide the form
  formContainer.classList.add("hidden");
}
});