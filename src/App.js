import Header from './components/Header'
import Tasks from './components/Tasks';
import { useState, useEffect } from "react"
import AddTask from './components/AddTask'
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  //pull data from db 
  useEffect(() => {
    const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    } 

    getTasks()
  }, [])

  //Fetch Tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  //Fetch singular task 
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

//Delete Task

const deleteTask = async (id) => {
  await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE'})

  setTasks(tasks.filter((task) => task.id  !== id ))
}

//toggle reminder 

const toggleReminder = async (id) => {
  const taskToToggle = await fetchTask(id)

  const updTask = { ...taskToToggle,  reminder: !taskToToggle.reminder}

  const res = await fetch(`http://localhost:5000/tasks/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()

  setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder} : task))
}

//add task
const addTask = async (task) => {

  const res = await fetch('http://localhost:5000/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task),
  })

  const data = await res.json()

  setTasks([...tasks, data])
}

//toggle form
const toggleForm = (e) => {
  setShowAddTask(!showAddTask)
}

  return (
    <Router>
      <div className="container">
        <Header onToggle={toggleForm} showAdd={showAddTask}/>
        <Routes>
        <Route path='/' element={(
          <>
            {showAddTask && <AddTask onAdd={addTask} />}
            {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} /> : 'No tasks to Complete'}
          </>
        )} />
        <Route path='/about' element={<About />} />
      </Routes>
        <Footer />
      </div>
    </Router>
    
  );
}

export default App;
