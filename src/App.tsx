import { createMemoryHistory, createRouter, RouterProvider } from "@tanstack/react-router"
import './App.css'
import { routeTree } from "./routeTree.gen"
import DashboardLayoutComponent from "./components/dashboard-layout";


const router = createRouter({ routeTree })

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  return (
    <>    
      <DashboardLayoutComponent>
        <RouterProvider router={router}/>
      </DashboardLayoutComponent>
    </>
  )
}

export default App
