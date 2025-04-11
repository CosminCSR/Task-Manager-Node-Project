// grabbed elements from the HTML page
const taskIDDOM = document.querySelector('.task-edit-id')
const taskNameDOM = document.querySelector('.task-edit-name')
const taskCompletedDOM = document.querySelector('.task-edit-completed')
const editFormDOM = document.querySelector('.single-task-form')
const editBtnDOM = document.querySelector('.task-edit-btn')
const formAlertDOM = document.querySelector('.form-alert')

// got the id of the task from the URL
const params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName // used this to keep the original name in case update fails

// fetched the task data and filled in the form with its details
const showTask = async () => {
  try {
    const {
      data: {task},
    } = await axios.get(`/api/v1/tasks/${id}`) // got the task from backend

    const {_id: taskID, completed, name} = task

    // showed task data on the page
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true // marked checkbox if task was done
    }
  } catch (error) {
    console.log(error)
  }
}

// called the function to show the task when page loads
showTask()

// when the form was submitted, tried to update the task
editFormDOM.addEventListener('submit', async (e) => {
  editBtnDOM.textContent = 'Loading...' // changed button while waiting
  e.preventDefault()

  try {
    const taskName = taskNameDOM.value
    const taskCompleted = taskCompletedDOM.checked

    // sent updated task info to the backend
    const {
      data: {task},
    } = await axios.patch(`/api/v1/tasks/${id}`, {
      name: taskName,
      completed: taskCompleted,
    })

    // updated the page with the new info
    const {_id: taskID, completed, name} = task
    taskIDDOM.textContent = taskID
    taskNameDOM.value = name
    tempName = name
    if (completed) {
      taskCompletedDOM.checked = true
    }

    // showed success message
    formAlertDOM.style.display = 'block'
    formAlertDOM.textContent = `success, edited task`
    formAlertDOM.classList.add('text-success')

  } catch (error) {
    // showed error if something went wrong
    console.error(error)
    taskNameDOM.value = tempName // went back to the original name
    formAlertDOM.style.display = 'block'
    formAlertDOM.innerHTML = `error, please try again`
  }

  // set button text back to Edit
  editBtnDOM.textContent = 'Edit'

  // hid the alert after a few seconds
  setTimeout(() => {
    formAlertDOM.style.display = 'none'
    formAlertDOM.classList.remove('text-success')
  }, 4444)
})
