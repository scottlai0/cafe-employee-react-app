import { Divider } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => (
    <div>
      <h1>Cafe-Employee Management Portal</h1>
      <Divider />
      <p>This is a experimental project built using Vite + React.</p>
      <p>API is built with FastAPI</p>
      <p>Database is a simple SQLite file.</p>
    </div>
  ),
})
