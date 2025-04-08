export function getMoveButton(columnId, side) {
    let buttonClass = side === "left" ? "move-left" : "move-right";
    let title = "";
    let target = "";

    if (columnId === "toDo" && side === "right") {
        title = "Move to Doing";
        target = "doing";
    }
   
    if (columnId === "doing" && side === "left") {
            title = "Move to To Do";
            target = "toDo";
        }

    if (columnId === "doing" && side === "right") {
            title = "Move to Done";
            target = "done";
        }

    if (columnId === "done" && side === "left") {
        title = "Move to Doing";
        target = "doing";
    }

    if (!buttonClass) return "";

    return `<button class="${buttonClass} ${side}-button" title="${title}" data-target="${target}">${side === "right" ? "🡺" : "🡸"}</button>`;
}


