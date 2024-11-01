import axios from 'axios';

const dummy_data = [
  {
    logo: null,
    name:'test cafe',
    description: 'test description',
    employees: 1,
    location: 'some place'
  }
]

export const fetchCafes = async () => {
  //const response = await axios.get('/cafes');
  const response = {data: dummy_data}
  return response.data;
};

export const deleteCafe = async (id: any) => {
  await axios.delete(`/cafes/${id}`);
};

export const addCafe = async (cafeData: any) => {
  const response = await axios.post('/cafes', cafeData);
  return response.data;
};

export const updateCafe = async (cafeData: any) => {
  const response = await axios.put(`/cafes/${cafeData.id}`, cafeData);
  return response.data;
};
