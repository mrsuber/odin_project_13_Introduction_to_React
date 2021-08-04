import {useState, useEffect} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import About from './components/About'
function App() {
  // woring on the add button to toggle when a task is to be added
  const [showAddTask,setShowAddTask]=useState(false)

  //end of toggle
  const [tasks, setTasks] = useState([])
  useEffect(()=>{
      const getTasks= async () =>{
        const taskFromServer = await fetchTasks()
        setTasks(taskFromServer)
      }
  getTasks()
  },[])

  // fetch task form anoter server
  const fetchTasks = async () =>{
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }
//fetch single task
const fetchTask = async (id) =>{
  const res = await fetch(`http://localhost:5000/tasks/${id}`)
  const data = await res.json()
  return data
}
//Add Task this function works on the submit
  const addTask= async (task)=>{

    const res = await fetch('http://localhost:5000/tasks',{
      method:'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body:JSON.stringify(task),
    })

    const data = await res.json()
    setTasks([...tasks,data])
    // const id = Math.floor(Math.random()*10000)+1
    // const newTask = {id,...task}
    // setTasks([...tasks,newTask])
    }


  // Delete Tasks
  const deleteTask = async (id)=>{
    await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'DELETE',
    })
    setTasks(tasks.filter((task) => task.id !==id))
  }

  // Toggle Reminder
  const toggleReminder = async(id)=>{
    const taskToToggle= await fetchTask(id)
    const updTask ={...taskToToggle,reminder:!taskToToggle.reminder}
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body:JSON.stringify(updTask)
    })
    const data = await res.json()
    setTasks(tasks.map((task) => task.id ===id? {...task, reminder:data.reminder}:task))
  }


  return (
    <Router>
    <div className="container">
      <Header  onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <Route path='/'exact render={(props)=>(
        <>
        {showAddTask && <AddTask onAdd = {addTask}/>}
        {tasks.length>0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>: 'No Task To Show'}
      
        </>
      )}/>
      <Route path='/about' component={About}/>
      <Footer />

    </div>
    </Router>
  );
}


export default App;
// for the class component, you need to import react
// import React from 'react'

// for the class based component
// class App extends React.Component{
//   render(){
//     return<h1>hello form a class</h1>
//   }
// }
