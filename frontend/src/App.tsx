import React from 'react'
import Menu from "../src/components/menu/Menu"
import Orders from "../src/components/orders/Orders"
import Layaout from './components/layout/Layaout'
import { Route,Routes } from 'react-router-dom'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layaout/>}></Route>
      <Route path="/menu" element={<Menu/>}></Route>
      <Route path="/orders" element={<Orders/>}></Route>
    </Routes>

  )
}
