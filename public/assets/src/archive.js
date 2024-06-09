import { taskMainBlock } from "./tasks";

const archiveBlock = document.getElementById("archive-block");

export function showTasksArchive() {
    taskMainBlock.style.display = "none"; 
    archiveBlock.style.display = "block"; 
}

export function hideTasksArchive() {
    archiveBlock.style.display = "none"; 
}