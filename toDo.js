const addTaskButton = document.getElementById("addTask");

addTaskButton.addEventListener("click", () => {
    const taskInput = document.getElementById("taskName");
    const taskName = taskInput.value.trim();

    if (taskName) {
        addTaskToColumn("toDo", taskName);
        taskInput.value = "";
    }
});

function addTaskToColumn(columnId, taskName) {
    const column = document.getElementById(columnId);
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <div class="task-name">${taskName}</div>
        <div class="task-buttons">
            <div class="left-button">${getMoveButton(columnId, "left")}</div>
            <div class="center-button">
                <button class="delete" title="Delete" onclick="deleteTask(event)">🗑️</button>
            </div>
            <div class="right-button">${getMoveButton(columnId, "right")}</div>
        </div>
    `
    column.appendChild(taskElement);
}

function getMoveButton(columnId, side) {
    let buttonClass = "";
    let buttonTitle = "";
    let targetColumnId = "";

    if (columnId === "toDo" && side === "right") {
        buttonClass = "right-button";
        buttonTitle = "Move to Doing";
        targetColumnId = "doing";
    }
   
    if (columnId === "doing" && side === "left") {
            buttonClass = "left-button";
            buttonTitle = "Move to To Do";
            targetColumnId = "toDo";
        }

    if (columnId === "doing" && side === "right") {
            buttonClass = "right-button";
            buttonTitle = "Move to Done";
            targetColumnId = "done";
        }

    if (columnId === "done" && side === "left") {
        buttonClass = "left-button";
        buttonTitle = "Move to Doing";
        targetColumnId = "doing";
    }

    if (!buttonClass) return "";

    return `<button class="${buttonClass}" title="${buttonTitle}" onclick="moveTask(event, '${targetColumnId}')">${side === "right" ? "🡺" : "🡸"}</button>`;
}

function deleteTask(event) {
    const taskElement = event.target.closest(".task");
    taskElement.remove();
}

function moveTask(event, targetColumnId) {
    const taskElement = event.target.closest(".task");

    const targetColumn = document.getElementById(targetColumnId);
    targetColumn.appendChild(taskElement);
    
    const buttonsContainer = taskElement.querySelector(".task-buttons");
    if (buttonsContainer) {
        buttonsContainer.innerHTML = `
            <div class="left-button">${getMoveButton(targetColumnId, "left")}</div>
            <div class="center-button">
                <button class="delete" title="Delete" onclick="deleteTask(event)">🗑️</button>
            </div>
            <div class="right-button">${getMoveButton(targetColumnId, "right")}</div>
        `;
    }
}