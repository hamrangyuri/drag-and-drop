const draggable_list = document.getElementById("draggable-list");
const check = document.getElementById("check");

const richestPeople = [
  "Cheetah",
  "Pronghorn",
  "Springbo",
  "Blue Wildebeest",
  "Blackbuck",
  "Lion",
  "Greyhound",
  "Jackrabbit",
  "African Wild Dog",
  "Kangaroo",
];

const listItems = [];

let dragStartIndex;

// Insert list items into DOM
function createList() {
  [...richestPeople]
    .map((a) => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value)
    .forEach((person, index) => {
      const listItem = document.createElement("li");

      listItem.setAttribute("data-index", index);
      listItem.innerHTML = `<span class="number">${index + 1}</span>
        <div class="draggable" draggable="true">
        <p class="person-name">${person}</p>
        <i class="fas fa-grip-lines"></i>
        </div>    
        `;

      listItems.push(listItem);
      draggable_list.appendChild(listItem);
    });

  addEventListeners();
}

// Swapping Items
function swapItems(from, to) {
  const itemOne = listItems[from].querySelector(".draggable");
  const itemTwo = listItems[to].querySelector(".draggable");
  listItems[from].appendChild(itemTwo);
  listItems[to].appendChild(itemOne);
}

// Drag & Drop
function dragStart() {
  dragStartIndex = +this.closest("li").getAttribute("data-index");
  console.log(dragStartIndex);
}

function dragEnter() {
  this.classList.add("over");
}

function dragOver(e) {
  e.preventDefault();
}

function dragLeave() {
  this.classList.remove("over");
}

function dragDrop() {
  const dragEndIndex = +this.getAttribute("data-index");
  swapItems(dragStartIndex, dragEndIndex);

  this.classList.remove("over");
}

function checkOrder() {
  listItems.forEach((item, index) => {
    const name = item.querySelector(".draggable").innerText.trim();
    if (name !== richestPeople[index]) {
      item.classList.add("wrong");
    } else {
      item.classList.remove("wrong");
      item.classList.add("right");
    }
  });
}

// Event Listeners
function addEventListeners() {
  const draggables = document.querySelectorAll(".draggable");
  const dragListItems = document.querySelectorAll(".draggable-list li");

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", dragStart);
  });

  dragListItems.forEach((item) => {
    item.addEventListener("dragover", dragOver);
    item.addEventListener("drop", dragDrop);
    item.addEventListener("dragenter", dragEnter);
    item.addEventListener("dragleave", dragLeave);
  });
}

check.addEventListener("click", checkOrder);

createList();
