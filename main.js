import { addTaskToColumn } from "./tasks.js";
import { getMoveButton } from "./dom.js"

const addTaskButton = document.getElementById("addTask");

addTaskButton.addEventListener("click", () => {
    const taskInput = document.getElementById("taskName");
    const taskName = taskInput.value.trim();

    if (taskName) {
        addTaskToColumn("toDo", taskName);
        taskInput.value = "";
    }
});

document.body.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete")) {
        const taskElement = event.target.closest(".task");
        if (taskElement) {
            taskElement.remove();
        }
    }

    if (event.target.classList.contains("move-left") || event.target.classList.contains("move-right")) {
        const targetColumnId = event.target.dataset.target;
        if(!targetColumnId) {
            return;
        }

        const taskElement = event.target.closest(".task");
        const targetColumn = document.getElementById(targetColumnId);
        if (!taskElement || !targetColumn) {
            return;
        }

        taskElement.setAttribute("data-column", targetColumnId);
        targetColumn.appendChild(taskElement);

        const buttonsContainer = taskElement.querySelector(".task-buttons");
        if (buttonsContainer) {
            buttonsContainer.innerHTML = `
            <div class="left-button">${getMoveButton(targetColumnId, "left")}</div>
            <div class="center-button">
            <button class="delete" title="Delete">🗑️</button>
            </div>
            <div class="right-button">${getMoveButton(targetColumnId, "right")}</div>
            `;
        }
    }
});