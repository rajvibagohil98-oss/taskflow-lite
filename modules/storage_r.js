// Local Storage Key

const STORAGE_KEY = "tasks";


// Save Tasks

export function saveTasks(tasks){

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
    );

}



// Load Tasks

export function loadTasks(){

    const tasks = localStorage.getItem(STORAGE_KEY);


    if(tasks){

        return JSON.parse(tasks);

    }


    return [];

}