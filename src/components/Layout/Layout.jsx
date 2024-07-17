import React from 'react'
import Home from '../Home/Home'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return <>
  <div className="container mx-auto my-4 py-10">
      <Outlet></Outlet>

    </div>
  </>
}
