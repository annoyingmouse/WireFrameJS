/*
Grandpa has a Christmas wish list to keep track of all the gifts he wants to ask for. But there’s a problem: if he forgets he’s already added something, the list gets clogged up with duplicates. This happened last year, and he ended up with 8 talking picture frames on Christmas Day!

Your task is to complete the `checkDuplicate()` function 👇 to ensure no duplicates are added to the list. But here’s the tricky part: Grandpa sometimes hits the spacebar more than once, making it harder to spot duplicates.

For example, only one of these entries should be added to the list — the others should be flagged as duplicates:

- "talking picture frames"
- "talking  picture frames"
- "talking picture    frames"
- " talking picture frames "

**Your tasks:**
1. Ensure no duplicates can be added to the list.
2. Account for extra spaces at the beginning/end and between words.

**Stretch Goals:**
1. Case Sensitivity: Handle cases where capitalization differs. For example:
   - `"Cat Hammock"` should be flagged as a duplicate of `"cat hammock"`.
   - Preserve Grandpa’s original capitalization (e.g., if `"Cat Hammock"` is added first, that should be added to the list). Do not simply convert all entries to lower case - Grandpa might well want to capitalize some words.

2. Additional Features: Add functionality to delete or edit items on the list.
*/

// Get references to DOM elements
const itemInput = document.getElementById("item-input");
const addItemButton = document.getElementById("add-item-button");
const shoppingList = document.getElementById("shopping-list");
const listArr = [];

// Function to check item is not duplicate
function checkDuplicate() {
  const itemText = itemInput.value.trim().split(/\s+/).join(" ");
  const tempListArray = [...listArr.map((a) => a.toLowerCase())];
  if (
    itemText &&
    (!listArr.length || !tempListArray.includes(itemText.toLowerCase()))
  ) {
    listArr.push(itemText);
  }
  renderList();
}

// Function to add an item to the shopping list
function renderList() {
  shoppingList.innerHTML = "";
  listArr.forEach((gift) => {
    const listItem = document.createElement("li");
    const div = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = gift;
    div.appendChild(span);
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    const action = document.createElement("div");
    div.appendChild(action);
    const deleteButton = document.createElement("span");
    deleteButton.textContent = "❌";
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener("click", () => {
      listArr.splice(listArr.indexOf(gift), 1);
      renderList();
    });
    action.appendChild(deleteButton);
    const editButton = document.createElement("span");
    editButton.textContent = "✏️";
    editButton.style.cursor = "pointer";
    editButton.addEventListener("click", () => {
      let newGift = prompt("Edit gift:", gift);
      if (newGift) {
        newGift = newGift.trim().split(/\s+/).join(" ");
      }
      listArr.splice(listArr.indexOf(gift), 1, newGift);
      renderList();
    });
    action.appendChild(editButton);
    listItem.appendChild(div);
    shoppingList.appendChild(listItem);
  });
  itemInput.value = ""; // Clear the input field
}

// Add event listener to button
addItemButton.addEventListener("click", checkDuplicate);

// Allow adding items by pressing Enter key
itemInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    checkDuplicate();
  }
});
