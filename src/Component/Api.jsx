import useaxios from "./Useaxios";

export const products = async ({ pageParam = null, category = "" }) => {
  try {
    const res = await useaxios.get("products", {
      params: { cursor: pageParam, category } 
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
