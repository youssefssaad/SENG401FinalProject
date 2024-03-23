import React from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";


const Header = () => {
    let navigate = useNavigate();
    
  return (
    <header>
    <h1>WealthWave</h1>
    <p className='main-page-intro'>
      Manage your money smarter, faster, better. Excited to join? Sign up is as easy 1, 3, 4 ... however the saying goes.
    </p>
    <button className='main-page-navigation' onClick={()=> navigate('./login')}><i class="fas fa-lock"></i>Join us Now!</button>
  </header>
  )
}

export default Header;