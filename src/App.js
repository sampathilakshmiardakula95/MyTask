import {Component} from 'react'
import {v4 as uuid} from 'uuid'
import './App.css'

// These are the lists used in the application. You can move them to any component needed.

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  state = {
    activeOptionId: tagsList[0].optionId,
    inputTask: '',
    tasksList: [],
    activeTag: 'INITIAL',
  }

  onChangeOption = event => {
    this.setState({
      activeOptionId: event.target.value,
    })
  }

  onGivenTask = event => {
    this.setState({
      inputTask: event.target.value,
    })
  }

  onSubmitTaskDetails = event => {
    event.preventDefault()
    const {inputTask, activeOptionId} = this.state

    const newTask = {
      id: uuid(),
      text: inputTask,
      tag: activeOptionId,
    }

    if (inputTask.length !== 0) {
      this.setState(prevState => ({
        tasksList: [...prevState.tasksList, newTask],
        inputTask: '',
        activeOptionId: '',
      }))
    }
  }

  onClickTagButton = event => {
    this.setState(prevState => ({
      activeTag:
        prevState.activeTag === event.target.value
          ? 'INITIAL'
          : event.target.value,
    }))
  }

  renderCreateTasksView = () => {
    const {activeOptionId, inputTask} = this.state

    return (
      <div className="my-tasks-container">
        <h1 className="create-task-heading">Create a task!</h1>
        <form className="form-container" onSubmit={this.onSubmitTaskDetails}>
          <div className="input-container">
            <label htmlFor="task" className="label">
              Task
            </label>
            <input
              type="text"
              id="task"
              className="input-box"
              onChange={this.onGivenTask}
              value={inputTask}
              placeholder="Enter the task here"
            />
          </div>
          <div className="input-container">
            <label htmlFor="tag" className="label">
              Tags
            </label>
            <select
              id="tag"
              className="input-box"
              value={activeOptionId}
              onChange={this.onChangeOption}
            >
              {tagsList.map(eachTag => (
                <option key={eachTag.optionId} value={eachTag.optionId}>
                  {eachTag.displayText}
                </option>
              ))}
            </select>
          </div>
          <button type="submit" className="add-task-btn">
            Add Task
          </button>
        </form>
      </div>
    )
  }

  renderTagsAndTasksList = () => {
    const {tasksList, activeTag} = this.state

    const filteredList =
      activeTag === 'INITIAL'
        ? tasksList
        : tasksList.filter(eachTag => eachTag.tag === activeTag)

    return (
      <div className="tags-and-tasks-container">
        <h1 className="tags-heading">Tags</h1>
        <ul className="tags-list">
          {tagsList.map(eachTag => (
            <li className="tags-item" key={eachTag.optionId}>
              <button
                type="button"
                className="tag-button"
                value={eachTag.optionId}
                onClick={this.onClickTagButton}
              >
                {eachTag.displayText}
              </button>
            </li>
          ))}
        </ul>
        <h1 className="tags-heading">Tasks</h1>
        {tasksList.length === 0 ? (
          <div className="no-tasks-container">
            <p className="no-tasks-info">No Tasks Added Yet</p>
          </div>
        ) : (
          <ul className="tasks-list">
            {filteredList.map(eachTask => (
              <li className="task-card" key={eachTask.id}>
                <p className="task-text">{eachTask.text}</p>
                <p className="task-tag">{eachTask.tag}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }

  render() {
    const {activeOptionId} = this.state
    console.log(activeOptionId)
    return (
      <div className="container">
        {this.renderCreateTasksView()}
        {this.renderTagsAndTasksList()}
      </div>
    )
  }
}

export default App
