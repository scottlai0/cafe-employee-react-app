import axios from 'axios';

export const fetchEmployees = async () => {
  const response = await axios.get('/employees'); 
  return response.data;
};

export const deleteEmployee = async (id: any) => {
  await axios.delete(`/employees/${id}`); 
};

export const addEmployee = async (employeeData: any) => {
  const response = await axios.post('/employees', employeeData); 
  return response.data;
};

export const updateEmployee = async (employeeData: any) => {
  const response = await axios.put(`/employees/${employeeData.id}`, employeeData); 
  return response.data;
};
