let all = [];
let complete = [];
let pending = [];
let current = "all";
let tasks = document.getElementById("tasks");
let pendings = document.getElementById("pending-list");
let completed = document.getElementById("complete-list");

// to toggle between all-pending-current list
document.querySelector("#current").addEventListener("change", (event) => {
  if (event.target.value === "pending") {
    current = "pending";
    document.getElementById("tasks").style.display = "none";
    document.getElementById("complete-list").style.display = "none";
    document.getElementById("pending-list").style.display = "flex";
    createPendingList();
  } else if (event.target.value === "complete") {
    current = "complete";
    document.getElementById("tasks").style.display = "none";
    document.getElementById("complete-list").style.display = "flex";
    document.getElementById("pending-list").style.display = "none";
    createCompleteList();
  } else {
    current = "all";
    document.getElementById("tasks").style.display = "flex";
    document.getElementById("complete-list").style.display = "none";
    document.getElementById("pending-list").style.display = "none";
    create();
  }
});

// on click clear button
document.querySelector("#clearInput").addEventListener("click", () => {
  document.getElementById("userInput").value = null;
});

// on click clear all button
document.querySelector("#clearAll").addEventListener("click", () => {
  all = [];
  complete = [];
  pending = [];
  create();
  createPendingList();
  createCompleteList();
});

// on enter key
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    add();
  }
});

// adding value to the all list
document.querySelector("#addItem").addEventListener("click", add());

// function to add nnew item in all list
function add() {
  let input = document.getElementById("userInput").value.trim();
  if (input != "") {
    let flag = true;
    for (let i = 0; i < all.length; i++) {
      if (all[i] === input) {
        flag = false;
        alert("Item already in the List!");
        break;
      }
    }
    if (flag == true) {
      all.push(input);
      document.getElementById("userInput").value = null;
      create();
    }
  } else {
    // alert("No Item!")
  }
}

// function to create the new item in the html
function create() {
  tasks.innerHTML = "";
  for (let i = 0; i < all.length; i++) {
    let todoTask = "";
    if (complete.includes(all[i])) {
      todoTask = `
      <div class="item">
          <p class="list-item" id="list-item" style="text-decoration: line-through;">${all[i]}</p>
          <button class="delete">Delete</button>
          <button class="complete">Complete</button>
      </div>
      `;
    } else {
      todoTask = `
      <div class="item">
          <p class="list-item" id="list-item">${all[i]}</p>
          <button class="delete">Delete</button>
          <button class="complete">Complete</button>
      </div>
      `;
    }
    tasks.innerHTML += todoTask;
  }
  deleteItem();
  completeItem();
  pendingItems();
}

// function to create pending list
function createPendingList() {
  pendings.innerHTML = "";
  for (let i = 0; i < pending.length; i++) {
    let todoTask = `
        <div class="item">
            <p class="list-item" id="list-item">${pending[i]}</p>
            <button class="delete">Delete</button>
            <button class="complete">Complete</button>
        </div>
        `;
    pendings.innerHTML += todoTask;
  }
  deleteItem();
  completeItem();
}

// function to create complete list
function createCompleteList() {
  completed.innerHTML = "";
  for (let i = 0; i < complete.length; i++) {
    let todoTask = `
        <div class="item">
            <p class="list-item" style="text-decoration: line-through; id="list-item">${complete[i]}</p>
            <button class="delete">Delete</button>
            <button class="complete">Complete</button>
        </div>
        `;
    completed.innerHTML += todoTask;
  }
  deleteItem();
  completeItem();
}

// function to add delete event to all the delete buttons
function deleteItem() {
  const items = document.querySelectorAll(".item .delete");
  items.forEach((ele) => {
    ele.addEventListener("click", () => {
      // to remove the item from all list
      if (all.includes(ele.parentElement.firstElementChild.textContent)) {
        all.splice(
          all.indexOf(ele.parentElement.firstElementChild.textContent),
          1
        );
      }
      // to remove the item from complete list
      if (complete.includes(ele.parentElement.firstElementChild.textContent)) {
        complete.splice(
          complete.indexOf(ele.parentElement.firstElementChild.textContent),
          1
        );
      }
      // to remove the item from pending list
      if (pending.includes(ele.parentElement.firstElementChild.textContent)) {
        pending.splice(
          pending.indexOf(ele.parentElement.firstElementChild.textContent),
          1
        );
      }
      create();
      createPendingList();
      createCompleteList();
    });
  });
}

// function to add complete event to each item
function completeItem() {
  const items = document.querySelectorAll(".item .complete");
  items.forEach((ele) => {
    ele.addEventListener("click", () => {
      let flag = true;
      for (let i = 0; i < complete.length; i++) {
        if (complete[i] === ele.parentElement.firstElementChild.textContent) {
          flag = false;
          break;
        }
      }
      if (flag == true) {
        ele.parentElement.firstElementChild.style.textDecoration =
          "line-through";
        complete.push(ele.parentElement.firstElementChild.textContent);
        pendingItems();
      }
    });
  });
}

// function to create pending items list
function pendingItems() {
  let tempArr = [];
  for (let i = 0; i < all.length; i++) {
    if (!complete.includes(all[i])) {
      tempArr.push(all[i]);
    }
  }
  pending = tempArr;
  createPendingList();
}
