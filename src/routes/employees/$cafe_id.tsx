import { Divider } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../../services/employees-service';
import { Box, CircularProgress, Typography } from '@mui/material';
import { EmployeePageTemplate } from '../../pages/employees';

export const Route = createFileRoute('/employees/$cafe_id')({
  component: () => <>
    <h1>Employee Management</h1>
    <Divider />
    <CafeEmployeePage/>
  </>  
})


function CafeEmployeePage() {
  const { cafe_id } = Route.useParams();

  return (
    <>
      <EmployeePageTemplate cafe_id={cafe_id} />
    </>
  );
};
