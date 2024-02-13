import React from 'react'
import ReactDOM from 'react-dom/client'
import  {Mainpage} from './components/Mainpage'

import '../src/Style/Mainpage.css'
import { router } from './Router'
import { RouterProvider } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
