import { useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom"
import { AppContext } from "./provider/app.provider";
import { router } from "./routes/router"

function App() {
  const context = useContext(AppContext)

  return (
    <AppContext.Provider value={{ ...context }}>
      <RouterProvider router={router}/>
    </AppContext.Provider>
  )
}

export default App
