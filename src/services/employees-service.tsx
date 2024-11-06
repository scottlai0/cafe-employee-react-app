import { axiosInstance } from './axios-instance';

export const fetchEmployees = async () => {
  const response = await axiosInstance.get(`/employees`); 
  return response.data;
};

export const deleteEmployee = async (id: any) => {
  return await axiosInstance.delete(`/employees/${id}`); 
};

export const addEmployee = async (employeeData: any) => {
  const response = await axiosInstance.post('/employees', employeeData); 
  return response.data;
};

export const updateEmployee = async (employeeData: any) => {
  const response = await axiosInstance.put(`/employees`, employeeData); 
  return response.data;
};
