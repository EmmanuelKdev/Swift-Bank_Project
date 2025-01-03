
import {  Route, Routes} from 'react-router-dom'
import Navbar from './components/parts/Navbar'
import Front_page from './components/parts/Front_page'
import Contact from './components/parts/Contact'
import './App.css'
import About from './components/parts/About'
import Register from './components/parts/Register'
import Login from './components/parts/Login'


function App() {
  

  return (
    <div className='MainContainer'>
      <Navbar />
      <div className='ContentContainer'>
      
       <Routes>  // Changed Switch to Routes
         <Route path='/' element={<Front_page />} />  // Changed render to element
         <Route path='/about' element={<About />} />  // Changed component to element
         <Route path='/contact' element={<Contact />} />  // Changed component to element
         <Route path='/login' element={<Login />} />  // Changed component to element
         <Route path='/register' element={<Register />} />  // Changed component to element
       </Routes>
     
      </div>
      
    </div>
  )
}

export default App
