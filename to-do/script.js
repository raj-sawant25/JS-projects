document.addEventListener("DOMContentLoaded",() =>{
    const input =  document.getElementById('todo-input');
    const add = document.getElementById('add-task-btn');
    const list = document.getElementById('todo-list');

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach( task => renderTask(task));

    function saveTask(){
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }

    function renderTask(task){
        
        const li = document.createElement("li")
        li.setAttribute('data-id',task.id)

        if (task.completed) li.classList.add("completed");
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `;

        li.addEventListener('click', (e) => {
            if(e.target.tagName === 'BUTTON')return
            task.completed = ! task.completed
            li.classList.toggle('completed')
            saveTask();
        })

        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation()
            tasks = tasks.filter(t => t.id !== task.id)
            li.remove()
            saveTask();
        })
        list.appendChild(li)
    }

    add.addEventListener('click', () => {
        const taskText = input.value.trim();
        if (taskText==='') return;
    
        const newtask = {
            id: Date.now(),
            text: taskText,
            completed: false
        }
        tasks.push(newtask)
        saveTask()
        renderTask(newtask);
        input.value=""
        console.log(tasks);
    })
})

