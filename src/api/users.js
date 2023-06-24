import axios from "axios";
const BASE_URL = "https://crm-be-4scm.onrender.com"

const userId = localStorage.getItem("userId");
export default async function fetchUser(){
    return await axios.get(`${BASE_URL}/crm/api/v1/users/${userId}`,{
        headers: {
            'x-access-token':localStorage.getItem("token")
        }
        },{
            "userId":localStorage.getItem("userId")}
    )
}