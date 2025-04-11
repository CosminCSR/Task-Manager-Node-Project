// selected elements from the HTML
const tasksDOM = document.querySelector('.tasks')
const loadingDOM = document.querySelector('.loading-text')
const formDOM = document.querySelector('.task-form')
const taskInputDOM = document.querySelector('.task-input')
const formAlertDOM = document.querySelector('.form-alert')

// loaded tasks from the server and displayed them
const showTasks = async () => {
  loadingDOM.style.visibility = 'visible'
  try {
    const {
      data: { tasks },
    } = await axios.get('/api/v1/tasks') // sent a GET request to get all tasks

    // if there were no tasks, showed a message
    if (tasks.length < 1) {
      tasksDOM.innerHTML = '<h5 class="empty-list">No tasks in your list</h5>'
      loadingDOM.style.visibility = 'hidden'
      return
    }

    // created HTML for each task
    const allTasks = tasks
      .map((task) => {
        const { completed, _id: taskID, name } = task
        return `<div class="single-task ${completed && 'task-completed'}">
            <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
            <div class="task-links">

            <!-- edit link -->
            <a href="task.html?id=${taskID}" class="edit-link">
            <i class="fas fa-edit"></i>
            </a>

            <!-- delete button -->
            <button type="button" class="delete-btn" data-id="${taskID}">
            <i class="fas fa-trash"></i>
            </button>

            </div>
            </div>`
      })
      .join('')

    // added the tasks to the page
    tasksDOM.innerHTML = allTasks

  } catch (error) {
    // showed an error message if something went wrong
    tasksDOM.innerHTML = '<h5 class="empty-list">There was an error, please try later....</h5>'
  }

  loadingDOM.style.visibility = 'hidden'
}

showTasks()

// handled task deletion when delete button was clicked
tasksDOM.addEventListener('click', async (e) => {
  const el = e.target
  if (el.parentElement.classList.contains('delete-btn')) {
    loadingDOM.style.visibility = 'visible'
    const id = el.parentElement.dataset.id

    try {
      await axios.delete(`/api/v1/tasks/${id}`) // sent a DELETE request to remove the task
      showTasks() // reloaded the task list
    } catch (error) {
      console.log(error)
    }

    loadingDOM.style.visibility = 'hidden'
  }
})

// handled form submission to create a new task
formDOM.addEventListener('submit', async (e) => {
  e.preventDefault()
  const name = taskInputDOM.value

  try {
    await axios.post('/api/v1/tasks', { name }) // sent a POST request to add a task
    showTasks() // reloaded tasks
    taskInputDOM.value = '' // cleared the input
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, task added`
    formAlertDOM.classList.add('text-success')
  } catch (error) {
    // showed error message if something failed
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }

  // removed the alert after a few seconds
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 3000)
})
