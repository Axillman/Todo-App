const taskForm = document.getElementById("task-form");
const closeFormBtn = document.getElementById("close-form-btn");
const createTaskBtn = document.getElementById("create-task");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");
const tasksContainer = document.querySelector(".tasks-container");
const addTaskBtn = document.getElementById("add-task");
const confirmDialog = document.getElementById("confirm-dialog");
const discardBtn = document.getElementById("discard-btn");
const cancelBtn = document.getElementById("cancel-btn");
const todoApp = document.querySelector(".todo-app");

const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};

const renderTasks = array => {
    const renderTask = array
        .map(({ title, date, description }) => {
            return `
        <div id="${title}" class="idk">
          <p>Title: ${title}</p>
          <p>Date: ${date}</p>
          <p>Description: ${description}</p>
          <button id="delete-btn" onclick="deleteF(this)">Delete</button>
          <button onclick="edit(this)">Edit</button>
      </div>
  `;
        })
        .join("");

    tasksContainer.innerHTML = renderTask;
};

if (taskData) {
    renderTasks(taskData);
}
const reset = () => {
    titleInput.value = "";
    dateInput.value = "";
    descriptionInput.value = "";
    taskForm.classList.toggle("hidden");
};

const addOrUpdateTask = array => {
    if (!titleInput.value.trim()) {
        alert("Cannot add empty task!");
        return;
    }

    taskObj = {
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value
    };

    const findArrIndex = array.findIndex(
        task1 => task1.title === taskObj.title
    );
    if (findArrIndex === -1) {
        array.unshift(taskObj);
    } else {
        array[findArrIndex] = taskObj;
    }

    reset();
    renderTasks(array);
    localStorage.setItem("data", JSON.stringify(taskData));
};

const edit = btn => {
    const findArrIndex = taskData.findIndex(
        task => task.title === btn.parentElement.id
    );
    taskForm.classList.toggle("hidden");
    currentTask = taskData[findArrIndex];
    titleInput.value = currentTask.title;
    dateInput.value = currentTask.date;
    descriptionInput.value = currentTask.description;
    addTaskBtn.innerText = "Update";
};

const deleteF = btn => {
    const findArrIndex = taskData.findIndex(
        task => task.title === btn.parentElement.id
    );
    taskData.splice(findArrIndex, 1);
    renderTasks(taskData);
    localStorage.setItem("data", JSON.stringify(taskData));
};

createTaskBtn.addEventListener("click", () => {
    taskForm.classList.toggle("hidden");
});

closeFormBtn.addEventListener("click", () => {
    const isInput =
        titleInput.value || dateInput.value || descriptionInput.value;
    const isUpdated =
        titleInput.value !== currentTask.title ||
        dateInput.value !== currentTask.date ||
        descriptionInput.value !== currentTask.description;
    if (isInput && isUpdated) {
        confirmDialog.showModal();
    } else {
        reset();
    }
});

discardBtn.addEventListener("click", () => {
    confirmDialog.close();
    taskForm.classList.toggle("hidden");
});

cancelBtn.addEventListener("click", () => {
    confirmDialog.close();
});

addTaskBtn.addEventListener("click", e => {
    e.preventDefault();
    addOrUpdateTask(taskData);
});
