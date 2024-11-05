import { createFileRoute } from '@tanstack/react-router'
import { Divider } from '@mui/material'
import { EmployeePageTemplate } from '../../pages/employees'

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
