import { createFileRoute } from '@tanstack/react-router'
import CafePage from '../pages/cafes'
import { Divider } from '@mui/material'

export const Route = createFileRoute('/cafes')({
  component: () => 
    <>
      <h1>Cafe Management</h1>
      <Divider />
      <CafePage />
    </>,
})
