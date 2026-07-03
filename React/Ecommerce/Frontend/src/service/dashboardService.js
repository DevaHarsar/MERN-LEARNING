import axios from "axios";

const API = `${import.meta.env.VITE_API_URL}/admin/dashboard`;

export const getDashboard = (token)=>{

    return axios.get(API,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    });

}