import axios from 'axios';

export default async function fetchData(searchByText, page = 1) {
  const options = {
    params: {
      key: '49096990-1cdaad3cdd2c2184e983643c5',
      q: searchByText,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page: page,
      per_page: 40,
    },
  };

  try {
    const response = await axios.get('https://pixabay.com/api/', options);
    return response;
  } catch (error) {
    console.error('Error fetching data from Pixabay:', error);
    throw error;
  }
}
