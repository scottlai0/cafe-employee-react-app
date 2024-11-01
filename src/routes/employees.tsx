import { Divider } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/employees')({
  component: () => 
  <>
    <h1>Employee Management</h1>
    <Divider />
  </>
})
