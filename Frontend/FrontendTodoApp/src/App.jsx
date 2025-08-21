import React from 'react'
import Navbar from './Components/navbar/Navbar'
import Footer from './Components/footer/Footer'
import About from './Components/about/About'
import Home from './Components/home/Home'
import SignUp from './Components/signup/SignUp'
import Signin from './Components/signup/Signin'
import Todo from './Components/Todo/Todo' 
import { useEffect } from 'react'

import {BrowserRouter as Router , Routes , Route} from "react-router-dom";

const App =  () => {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </Router>
      <Footer/>
    </div>
  )
}

export default App
