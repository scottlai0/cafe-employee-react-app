import axios from 'axios';

export const fetchEmployees = async () => {
  const response = await axios.get('/employees'); // Adjust the endpoint as needed
  return response.data;
};

export const deleteEmployee = async (id: any) => {
  await axios.delete(`/employees/${id}`); // Adjust the endpoint as needed
};

export const addEmployee = async (employeeData: any) => {
  const response = await axios.post('/employees', employeeData); // Adjust the endpoint as needed
  return response.data;
};

export const updateEmployee = async (employeeData: any) => {
  const response = await axios.put(`/employees/${employeeData.id}`, employeeData); // Adjust the endpoint as needed
  return response.data;
};
