import { createFileRoute } from '@tanstack/react-router'
import EmployeePage from '../../pages/employees'

export const Route = createFileRoute('/employees/')({
  component: () => <>
    <EmployeePage/>
  </>,
})
