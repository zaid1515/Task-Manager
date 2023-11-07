document.addEventListener('DOMContentLoaded', () => {
    const tasksDOM = document.querySelector('.tasks');
    const loadingDOM = document.querySelector('.loading');
    const formDOM = document.querySelector('.form');
    const taskInputDOM = document.querySelector('#taskinp');
    const formAlertDOM = document.querySelector('.form-alert');
  
    // Function to display tasks
    const showTasks = async () => {
      
  loadingDOM.style.visibility = 'visible'
  loadingDOM.style.height='100px'
      // loadingDOM.textContent = 'Loading...';
      tasksDOM.innerHTML = ''; // Clear the tasks list
  
      try {
        // Fetch tasks from an API endpoint (you need to define this)
        const response = await fetch('/api/task');
        if (!response.ok) {
          throw new Error('Failed to fetch tasks');
        }
  
        const atasks = await response.json();
        const tasks=atasks.alltasks
        console.log(tasks)
        // tasks.forEach(task => {
        //   console.log(task.name);
        // })
        if (tasks.length === 0) {
          loadingDOM.style.visibility = 'hidden'
          loadingDOM.style.height='0px'
          tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>';

        } else {
          tasks.forEach((task) => {
            const taskElement = document.createElement('div');
            taskElement.classList.add('single-task');
            if (task.completed) {
              taskElement.classList.add('task-completed');
            }
            taskElement.innerHTML = `
            <h5>
            <span><i class="ri-checkbox-circle-line"></i></span>${task.name}
        </h5>
        <div class="task-links">
            <a href="task.html?id=${task._id}" class="edit-link">
                <i class="ri-edit-box-fill"></i>
            </a>
            <button type="button" class="delete-btn" data-id="${task._id}">
                <i class="ri-delete-bin-4-fill"></i>
            </button>
        </div>
            `;
            tasksDOM.appendChild(taskElement);
          });
        }
        
      } catch (error) {
        loadingDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>';
      }
      
  loadingDOM.style.visibility = 'hidden'
  loadingDOM.style.height='0px'
    };

    // delete-tasks
    tasksDOM.addEventListener('click', async (e) => {
      const el = e.target
      if (el.parentElement.classList.contains('delete-btn')) {
        loadingDOM.style.visibility = 'visible'
        loadingDOM.style.height='100px'
        const id = el.parentElement.dataset.id
        try {
          await axios.delete(`/api/task/${id}`)
          showTasks()
        } catch (error) {
          console.log(error)
        }
      }
      loadingDOM.style.visibility = 'hidden'
      loadingDOM.style.height='0px'
    })

    // Function to add a task
    const addTask = async (name) => {
      try {
        const response = await fetch('/api/task', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });
        if (!response.ok) {
          throw new Error('Failed to add task');
        }
        formAlertDOM.style.color="green"
        formAlertDOM.textContent = 'Success, task added';
        formAlertDOM.classList.add('text-success');
      } catch (error) {
        formAlertDOM.style.color="red"
        formAlertDOM.textContent = 'Error, please try again';
      } finally {
        // Clear the input field and hide the alert after a delay
        taskInputDOM.value = '';
        setTimeout(() => {
          formAlertDOM.textContent = '';
          formAlertDOM.classList.remove('text-success');
        }, 3000);
  
        showTasks(); // Refresh the task list
      }
    };
  
    // Event listener for form submission
    formDOM.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = taskInputDOM.value.trim();
      console.log(name)
      if (name !== '') {
        addTask(name);
      }
    });
  
    // Initial task loading
    showTasks();
  });
  