import { createContext } from "react";
import { RouterProvider } from "react-router-dom"
import { AppContext } from "./provider/app.provider";
import { router } from "./routes/router"

function App() {

  return (
    <AppContext.Provider value={{ }}>
      <RouterProvider router={router}/>
    </AppContext.Provider>
  )
}

export default App
