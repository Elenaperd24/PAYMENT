import React from 'react' //IMPORTO PAQUETES DE REACT
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './App.css';

import SignUp from './components/SingUp';
import PaymentGateway from './components/PaymentGateway'
import axios from 'axios'


function App() {

   return (
    <BrowserRouter>
    
      <Routes>
       
        <Route path="/payment" element={<PaymentGateway />} />
        <Route path="/" element={<SignUp />} />
      
      </Routes>
    
    </BrowserRouter>
  )
}
export default App;