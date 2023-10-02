
// --------- ADMIN CONTENT ---------
const todoContainer = document.querySelector(".todo-list"),
  taskInput = todoContainer.querySelector(".input-box input"),
  addButton = todoContainer.querySelector(".todo-list #add-btn"),
  tasksList = todoContainer.querySelector(".tasks"),
  displayMsg = tasksList.querySelector(".display-msg"),
  taskContent = tasksList.querySelector(".task-content"),
  closeContentBtn = taskContent.querySelector("i");

const dateNow = document.querySelector(".todo-list .date"),
  info = document.querySelector(".todo-list .info");

let tasksArray = JSON.parse(window.localStorage.getItem("tasks")) || [];
updateLocale(tasksArray);
loadTasks();

dateNow.textContent = new Date().toLocaleDateString().replace(/\//g, "-");
todoContainer.addEventListener("click", (e) => {
  if (e.target != taskInput) {
    info.classList.remove("show");
  }
});

function loadTasks() {
  tasksArray.forEach((task) => {
    const li = document.createElement("li");
    li.className = task.completed ? "task completed" : "task";
    li.innerHTML = ` <i onclick="updateComplete(this)" class="bx ${
      task.completed ? "bx-check-circle" : "bx-info-circle"
    } check-btn"></i>
            <div class="task-field">
              <input type="text" value="${
                task.title
              }" onfocus="getCurrentTask(this)" onblur="checkTask(this)" onkeydown="validTask(event)" onclick="showContent(this)" readonly />
              <span class="tooltip">**Task is empty!</span>
            </div>
            <div class="btns">
              <i class="bx bx-pencil edit-btn" onclick="editTask(this)"></i>
              <i class="bx bx-trash del-btn" onclick="removeTask(this)"></i>
              </div>
        `;

    tasksList.append(li);
  });
}

const addTask = () => {
  // Return an alert message if task is empty
  if (taskInput.value === "") {
    info.textContent = "*** Please add some task!";
    info.classList.add("show");
    return false;
  }
  // Check whether task is already exist
  for (let todo of tasksArray) {
    if (todo.title === taskInput.value) {
      info.textContent = "*** Task already exist!";
      info.classList.add("show");
      taskInput.value = "";
      return;
    }
  }

  // Hide info element
  info.classList.remove("show");
  // Add task to taskArray
  const task = {
    title: taskInput.value.replace(/"/g, "'").trim(),
    completed: false,
  };
  tasksArray.push(task);

  // Add task to locale storage
  updateLocale(tasksArray);

  // Add task to page
  const li = document.createElement("li");
  li.className = "task";
  li.innerHTML = ` <i onclick="updateComplete(this)" class="bx bx-info-circle check-btn"></i>
        <div class="task-field">
            <input type="text" value="${task.title}" onfocus="getCurrentTask(this)" onblur="checkTask(this)" onkeydown="validTask(event)" onclick="showContent(this)" readonly />
            <span class="tooltip"></span>
        </div>
            <div class="btns">
              <i class="bx bx-pencil edit-btn" onclick="editTask(this)"></i>
              <i class="bx bx-trash del-btn" onclick="removeTask(this)"></i>
            </div>`;

  tasksList.append(li);
  // Clear input field
  taskInput.value = "";
};

document.querySelector(".todo-list form").addEventListener("submit", (e) => {
  e.preventDefault();
  addTask();
  setTimeout(() => info.classList.remove("show"), 2000);
});

// Store current task to track changes
var currentTask = null;

function editTask(e) {
  let taskField = e.parentElement.previousElementSibling.children[0];
  taskField.readOnly = false;
  taskField.focus();
}

function getCurrentTask(e) {
  currentTask = e.value;
}

function checkTask(e) {
  let tooltip = e.nextElementSibling;
  e.readOnly = true;
  if (e.value === "") {
    tooltip.textContent = "** Task is empty!!";
    tooltip.classList.add("show");
    e.value = currentTask;
    setTimeout(() => tooltip.classList.remove("show"), 2000);
    return;
  }

  for (let task of tasksArray) {
    if (task.title === e.value && e.value != currentTask) {
      tooltip.textContent = "** Task already exist!!";
      tooltip.classList.add("show");
      setTimeout(() => tooltip.classList.remove("show"), 2000);
      e.value = currentTask;
      return;
    }
  }

  tasksArray.forEach((task) => {
    if (task.title === currentTask) {
      task.title = e.value;
    }
  });

  updateLocale(tasksArray);
}

function updateComplete(e) {
  tasksArray.forEach((task) => {
    if (task.title == e.nextElementSibling.children[0].value) {
      task.completed = !task.completed;
    }
  });
  e.classList.toggle("bx-info-circle");
  e.classList.toggle("bx-check-circle");
  e.parentElement.classList.toggle("completed");
  updateLocale(tasksArray);
}

function validTask(event) {
  if (event.key == "Enter") {
    checkTask(event.target);
    currentTask = event.target.value;
  }
}

function removeTask(e) {
  tasksArray.forEach((task, i) => {
    if (
      task.title == e.parentElement.previousElementSibling.children[0].value
    ) {
      tasksArray.splice(i, 1);
    }
    e.parentElement.parentElement.remove();
    updateLocale(tasksArray);
  });
}

function showContent(e) {
  if (e.readOnly) {
    taskContent.innerHTML = `${e.value}<i class="bx bx-x-circle"></i>`;
    taskContent.classList.add("show");
    taskContent
      .querySelector("i")
      .addEventListener("click", () => taskContent.classList.remove("show"));
  }
}

function updateLocale(tasksArray) {
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
  if (tasksArray.length == 0) {
    displayMsg.classList.add("show");
  } else {
    displayMsg.classList.remove("show");
  }
}

// ---------- STATISTICS -----------
const statHeader = document.querySelector(".statistics header"),
  statButtons = statHeader.querySelectorAll(".statistics header button"),
  statLists = document.querySelectorAll(".statistics .list");

statButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    statButtons.forEach((btn) => btn.classList.remove("active"));
    btn.classList.add("active");
    statLists.forEach((list) => {
      list.dataset.name === btn.id
        ? list.classList.add("show")
        : list.classList.remove("show");
      btn.id == "statistics"
        ? statHeader.classList.remove("active")
        : statHeader.classList.add("active");
    });
  });
});

const progressLevels = document.querySelectorAll(".stats .progress span");
progressLevels.forEach((level) => (level.style.width = level.dataset.level));

// --------- LATEST CHAT -----------
const chatBox = document.querySelector(".latest-chat .chat-body"),
  chatInput = document.querySelector(".latest-chat .chat-input textarea"),
  sendChatBtn = document.querySelector(".latest-chat .chat-input span");

const chatInputHeight = chatInput.scrollHeight;
let adminMessage;

const createChatLi = (message, className) => {
  const chatLi = document.createElement("li");
  chatLi.classList.add("chat", className);
  let chatContent =
    className === "outgoing"
      ? `
      <p>${message}</p>
      <span><i class="bx bx-user-circle"></i> </span>
  `
      : `
      <span><img src="imgs/customer1.jpg" alt="Customer" /></span>
      <p>${message}</p>
  `;
  chatLi.innerHTML = chatContent;
  return chatLi;
};

const generateResponse = (chatIncomingLi) => {
  const messageElement = chatIncomingLi.querySelector("p");
  fetch("chatDatabase.json")
    .then((response) => response.json())
    .then(
      (data) => (messageElement.textContent = data.choices[0].message.content)
    )
    .catch((e) => {
      messageElement.classList.add("error");
      messageElement.textContent = `Oops! Something went wrong. Please try again.`;
    })
    .finally(() => {
      chatBox.scrollTo({
        top: chatBox.scrollHeight,
        behavior: "smooth",
      });
    });
};

const handleChat = () => {
  adminMessage = chatInput.value.trim();
  if (adminMessage === "") return;
  chatInput.value = "";
  chatInput.style.height = `${chatInputHeight}px`;
  chatBox.append(createChatLi(adminMessage, "outgoing"));
  chatBox.scrollTo({
    top: chatBox.scrollHeight,
    behavior: "smooth",
  });

  setTimeout(() => {
    const chatIncomingLi = createChatLi("Thinking...", "incoming");
    chatBox.append(chatIncomingLi);
    generateResponse(chatIncomingLi);
  }, 600);
};

sendChatBtn.addEventListener("click", handleChat);
chatInput.addEventListener("input", () => {
  chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    handleChat();
  }
});

// --------- LATEST POST -------
const commentBtn = document.querySelector(".latest-post .comment-btn i"),
  postComments = document.querySelector(".latest-post .comments");

commentBtn.addEventListener("click", () => {
  commentBtn.classList.toggle("active");
  postComments.classList.toggle("show");
});

// --------- LATEST PROJECTS --------

// --------- MAIN ASIDE ------------
// NOTIFICATIONS
const noteBtn = document.querySelector(".note-icon");

noteBtn.addEventListener("click", () => noteBtn.classList.toggle("show-list"));

// CALENDAR
const calendar = document.querySelector(".calendar"),
  month = calendar.querySelector(".month"),
  year = calendar.querySelector(".year"),
  daysHolder = calendar.querySelector(".days"),
  controlBtns = calendar.querySelectorAll(".control-btn"),
  timeSpan = calendar.querySelector(".time span");

let currentMonth = today.getMonth(),
  newDate = today,
  date;

const updateTime = () => {
  let dateComp = new Date().toLocaleTimeString().split(":");
  timeSpan.textContent = `${dateComp[0]}:${dateComp[1]}`;
};

updateTime();
// setInterval(updateTime, 60000);

const updateDate = () => {
  // Update the date
  date = new Date(new Date(newDate).setMonth(currentMonth));
  // Empty daysHolder List
  daysHolder.innerHTML = "";
  // Get year, Month, Day_of_month
  let y = date.getFullYear(),
    m = date.getMonth(),
    d = date.getDate(), // Day of the month
    // Number of month's days
    daysCount = months[m].count;
  if (m == 1) {
    new Date(new Date(date).setDate(29)).getDate() != 1
      ? (daysCount = 29)
      : (daysCount = 28);
  }

  // Get the index of the first and last days of the month
  let fstDay = new Date(new Date(date).setDate(1)).getDay(),
    lastDay = new Date(new Date(date).setDate(daysCount)).getDay();
  // Update month and year
  month.textContent = months[m].name;
  year.textContent = y;

  for (let i = 1; i <= daysCount; i++) {
    let dayLi = document.createElement("li");
    dayLi.textContent = i;
    daysHolder.append(dayLi);
  }

  let daysLi = document.querySelectorAll(".days li");
  daysLi.forEach((day, i) => {
    let dayNb = new Date(new Date(date).setDate(i + 1)).getDay();
    day.classList.remove("active", "inactive");

    if (i == 0) {
      for (let j = fstDay == 0 ? 5 : fstDay - 2; j >= 0; j--) {
        let prevDay = new Date(date).setDate(-j);
        let li = document.createElement("li");
        li.textContent = new Date(prevDay).getDate();
        li.className = "inactive";
        day.before(li);
      }
    } else if (i == daysCount - 1 && lastDay != 0) {
      for (let k = 7 - lastDay; k >= 1; k--) {
        let nextDay = new Date(date).setDate(k + daysCount);
        let li = document.createElement("li");
        li.textContent = new Date(nextDay).getDate();
        li.className = "inactive";
        day.after(li);
      }
    }
    if (day.textContent == d) {
      day.classList.add("active");
    }
    if (dayNb == 0) {
      day.classList.add("sun");
    }
  });
};

updateDate();
controlBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.id == "prev" ? --currentMonth : ++currentMonth;
    updateDate();
  });
});

// ------- QUICK DRAFT ---------
const draftBtn = document.querySelector(".draft-btn"),
  draft = document.querySelector(".draft"),
  cancelBtn = draft.querySelector(".cancel-btn"),
  saveBtn = draft.querySelector(".save-btn"),
  closePopBtn = draft.querySelector(".save-popup .close-icon");

draftBtn.addEventListener("click", () => draft.classList.toggle("show"));
cancelBtn.addEventListener("click", () => draft.classList.remove("show"));
saveBtn.addEventListener("click", () => draft.classList.add("show-popup"));
closePopBtn.addEventListener("click", () =>
  draft.classList.remove("show-popup")
);
