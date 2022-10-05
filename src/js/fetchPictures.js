import axios from 'axios';
const BASE_URL = 'https://pixabay.com/api/';
const KEY = '?key=30371799-820dc93a3ae10a20aac07ac2b';
const SETTINGS =
  'image_type=photo,orientation=horizontal,safesearch=true&per_page=4';

export const fetchPictures = async function (name, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}${KEY}&q=${name}&${SETTINGS}&page=${page}`
    );
    return response;
  } catch (error) {
    console.error(error);
  }
};
