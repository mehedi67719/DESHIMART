import useaxios from "./Useaxios";

export const products = async ({ pageParam = null, category = "", brand='', priceRange='' }) => {
  try {
    const res = await useaxios.get("products", {
      params: { cursor: pageParam, category,brand,priceRange } 
    });
    return res.data; 
  } catch (err) {
    console.error("Error fetching products:", err);
    return []; 
  }
};



export const categorys=async ()=>{
  const res= await useaxios.get("categorys");
  return res.data
}



export const brands=async()=>{
  const res=await useaxios.get("brands");
  return res.data
}