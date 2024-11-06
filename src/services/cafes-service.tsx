import { axiosInstance } from "./axios-instance";

export const fetchCafes = async () => {
  const response = await axiosInstance.get('/cafes');
  console.log(response)
  return response.data;
};

export const deleteCafe = async (id: any) => {
  await axiosInstance.delete(`/cafes/${id}`);
};

export const addCafe = async (cafeData: any) => {
  console.log(cafeData)
  const response = await axiosInstance.post('/cafes', cafeData);
  return response.data;
};

export const updateCafe = async (cafeData: any) => {
  console.log(cafeData)
  const response = await axiosInstance.put(`/cafes/${cafeData.id}`, cafeData);
  return response.data;
};
