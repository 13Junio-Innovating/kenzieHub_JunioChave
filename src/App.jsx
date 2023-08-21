import { RouterMain } from "./router/routerMain"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "./styles/index.scss"

function App() {


  return (
    <>
     <RouterMain />
     <ToastContainer/>
    </>
  )
}

export default App
