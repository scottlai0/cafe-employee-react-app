import { Divider } from '@mui/material'
import { createFileRoute } from '@tanstack/react-router'

import { useQuery } from '@tanstack/react-query';
import { fetchEmployees } from '../../services/employees-service';
import { Box, CircularProgress, Typography } from '@mui/material';

export const Route = createFileRoute('/employees/$cafe_id')({
  component: () => <>
    <h1>Employee Management</h1>
    <Divider />
    <EmployeePage/>
  </>  
})


function EmployeePage() {
  const { cafe_id } = Route.useParams();

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: fetchEmployees,
  });


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading employees...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        Error loading employees: {error.message}
      </Typography>
    );
  }

  return (
    <Box sx={{ pt: 3 }}>
      <Typography variant="h6" gutterBottom>
        Displaying Data for Cafe ID: {cafe_id}
      </Typography>

    </Box>
  );
};

export default EmployeePage;
