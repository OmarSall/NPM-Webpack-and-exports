import { getMoveButton } from "./dom.js";

export function addTaskToColumn(columnId, taskName) {
    const column = document.getElementById(columnId);
    const taskElement = document.createElement("div");
    taskElement.classList.add("task");
    taskElement.innerHTML = `
        <div class="task-name">${taskName}</div>
        <div class="task-buttons">
            <div class="left-button">${getMoveButton(columnId, "left")}</div>
            <div class="center-button">
                <button class="delete" title="Delete">🗑️</button>
            </div>
            <div class="right-button">${getMoveButton(columnId, "right")}</div>
        </div>
    `
    column.appendChild(taskElement);
}