import axios from "axios";
const BASE_URL = "https://crm-be-4scm.onrender.com"

export default async function fetchTicket(){
    return await axios.get(`${BASE_URL}/crm/api/v1/tickets`,{
        headers: {
            'x-access-token':localStorage.getItem("token")
        }
        },{
            "userId":localStorage.getItem("userId")}
    )
}