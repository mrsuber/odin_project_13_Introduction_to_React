import {useState} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
function App() {
  // woring on the add button to toggle when a task is to be added
  const [showAddTask,setShowAddTask]=useState(false)

  //end of toggle
  const [tasks, setTasks] = useState(
    [
     {
       id:1,
       text:'Doctors Appointment',
       day:'Feb 5th at 2:30pm',
       reminder:true,

     },
     {
       id:2,
       text:'Meeting at school',
       day:'Feb 6th at 1:30pm',
       reminder:true,

     },
     {
       id:3,
       text:'Food Shopping',
       day:'Feb 5th at 2:30pm',
       reminder:false,

     }
   ]
  )
//Add Task this function works on the submit
  const addTask=(task)=>{
    const id = Math.floor(Math.random()*10000)+1
    const newTask = {id,...task}
    setTasks([...tasks,newTask])

  }

  // Delete Tasks
  const deleteTask =(id)=>{
    setTasks(tasks.filter((task) => task.id !==id))
  }

  // Toggle Reminder
  const toggleReminder = (id)=>{
    setTasks(tasks.map((task) => task.id ===id? {...task, reminder:!task.reminder}:task))
  }


  return (
    <div className="container">
      <Header  onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd = {addTask}/>}
      {tasks.length>0? <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>: 'No Task To Show'}


    </div>
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
