import { taskMainBlock } from "./tasks";

const archiveBlock = document.getElementById("archive-block");

export function showTasksArchive() {
    console.log("Hello! From archivedTasks");
    taskMainBlock.style.display = "none"; 
    archiveBlock.style.display = "block"; 
}