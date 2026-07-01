import { getAllCategories, createCategoryDetails } from '../service/categoryService.js';
export const getCategories = async(req,res)=>{
    try{
         const categories = await getAllCategories();
         res.status(200).json(categories);
    }
    catch(error){
         res.status(500).json({message: error.message});
    }
}

export const createCategory = async(req,res)=>{
    try{
        const categoryData = req.body;
        const newCategory = await createCategoryDetails(categoryData);
        res.status(201).json(newCategory);
    }
    catch(error){
        res.status(500).json({message: error.message});
    }
}

export default {getCategories, createCategory};