import axios from "axios";
import { showError } from "./massages";

const MY_KEY = "41195501-607b2fa5c3ce586409759e829"; 
const MAIN_URL = `https://pixabay.com/api`;
const instance = axios.create({
  baseURL: MAIN_URL,
  timeout: 1000,
});

let currentPage = 1;


export async function fatchImagesByTextQuery(searchText, newQuery = false){
  if(newQuery){
    currentPage = 1;
  }
  try {
    const response = await instance.get("/", {
      params: {
        key: MY_KEY,
        q: searchText,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: currentPage, 
        per_page: 40 
      },
    });

    currentPage++;
    return response.data;
  } catch (error) {
    showError("Error fetching images:" + error);
    throw error;
  }  
}

 // const query = `/?key=${MY_KEY}&q=${searchText}&image_type=photo`;  
  // return (await instance.get(query)).data;