import { createFileRoute } from '@tanstack/react-router'
import CafePage from '../pages/cafes'

export const Route = createFileRoute('/cafes')({
  component: () => 
    <>
      <CafePage></CafePage>
    </>,
})
