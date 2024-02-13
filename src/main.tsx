import React from 'react'
import ReactDOM from 'react-dom/client'
import  {Mainpage} from './Components/Mainpage'

import '../src/Style/Mainpage.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Mainpage />
  </React.StrictMode>,
)
