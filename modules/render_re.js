// DOM Rendering Functions


export function renderTasks(tasks, taskList, emptyState, filter = "all"){


    taskList.innerHTML = "";



    let filteredTasks = tasks.filter(task => {


        if(filter === "active"){

            return !task.completed;

        }


        if(filter === "completed"){

            return task.completed;

        }


        return true;


    });



    if(filteredTasks.length === 0){

        emptyState.classList.remove("hidden");

        return;

    }
    else{

        emptyState.classList.add("hidden");

    }




    filteredTasks.forEach(task => {



        const li = document.createElement("li");

        li.className = "task-item fade-in";



        li.innerHTML = `


        <div class="task-left">


            <input 
            type="checkbox"
            class="complete-checkbox"
            data-id="${task.id}"
            ${task.completed ? "checked" : ""}>


            <span class="task-text 
            ${task.completed ? "completed" : ""}">

                ${task.text}

            </span>


        </div>



        <div class="actions">


            <button 
            class="delete-btn"
            data-id="${task.id}">

                Delete

            </button>


        </div>


        `;



        taskList.appendChild(li);



    });



}