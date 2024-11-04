import { createFileRoute } from '@tanstack/react-router'
import { Divider } from '@mui/material'
import { fetchCafes } from '../../services/cafes-service'
import { EmployeePageTemplate } from '../../pages/employees'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/employees/')({
  component: () => <>
    <h1>Employee Management</h1>
    <Divider />
    <EmployeePage/>
  </>,
})


function EmployeePage() {
  return (
    <>
      <EmployeePageTemplate cafe_id={null} />
    </>
  );
};
