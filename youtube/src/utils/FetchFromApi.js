import axios from 'axios'



const baseUrl='https://iv.melmac.space/api/v1/'
const HalfUrl='search?q=funny+cats'

export const  fetchFromApi= async(url)=>{

    const response= await axios.get(`${baseUrl}${url}`)
    return response;


}