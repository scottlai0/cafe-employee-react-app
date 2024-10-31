import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => 
    <div>
      <h1>Hello</h1>
    </div>,
})
