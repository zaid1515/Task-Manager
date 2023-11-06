document.addEventListener('DOMContentLoaded', () => {
    const taskIDDOM = document.querySelector('.task-edit-id');
    const taskNameDOM = document.querySelector('.task-edit-name');
    const taskCompletedDOM = document.querySelector('.task-edit-completed');
    const editFormDOM = document.querySelector('.task-form');
    const editBtnDOM = document.querySelector('.task-edit-btn');
    const formAlertDOM = document.querySelector('.form-alert');
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    let tempName;
  
    const showTask = async () => {
      try {
        const response = await axios.get(`/api/task/${id}`);
        const task = response.data.task;
        const { _id: taskID, completed, name } = task;
  
        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        if (completed) {
          taskCompletedDOM.checked = true;
        }
      } catch (error) {
        console.error(error);
      }
    };
  
    showTask();
  
    editFormDOM.addEventListener('submit', async (e) => {
      e.preventDefault();
      editBtnDOM.textContent = 'Loading...';
      try {
        const taskName = taskNameDOM.value;
        const taskCompleted = taskCompletedDOM.checked;
  
        const response = await axios.patch(`/api/task/${id}`, {
          name: taskName,
          completed: taskCompleted,
        });
  
        const task = response.data.task;
        const { _id: taskID, completed, name } = task;
  
        taskIDDOM.textContent = taskID;
        taskNameDOM.value = name;
        tempName = name;
        if (completed) {
          taskCompletedDOM.checked = true;
        }
  
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Success, edited task';
        formAlertDOM.classList.add('text-success');
      } catch (error) {
        console.error(error);
        taskNameDOM.value = tempName;
  
        formAlertDOM.style.display = 'block';
        formAlertDOM.textContent = 'Error, please try again';
      }
  
      editBtnDOM.textContent = 'Edit';
  
      setTimeout(() => {
        formAlertDOM.style.display = 'none';
        formAlertDOM.classList.remove('text-success');
      }, 3000);
    });
  });
  