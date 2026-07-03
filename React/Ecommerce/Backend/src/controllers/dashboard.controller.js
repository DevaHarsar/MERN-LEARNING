import {getDashboardStats} from "../service/dashboardService.js";

export const getDashboard = async(req,res)=>{

    try{

        const data = await getDashboardStats();

        res.json(data);

    }

    catch(error){

        res.status(500).json({
            message:error.message
        });

    }

}