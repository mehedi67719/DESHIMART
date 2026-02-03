import useaxios from "./Useaxios";

export const products = async ({ pageParam = null, category = "", brand = '', priceRange = '' }) => {
  try {
    const res = await useaxios.get("products", {
      params: { cursor: pageParam, category, brand, priceRange }
    });
    return res.data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};




export const singleproducts = async (id) => {

  const res = await useaxios.get(`products/${id}`);
  return res.data
}



export const categorys = async () => {
  const res = await useaxios.get("categorys");
  return res.data
}



export const brands = async () => {
  const res = await useaxios.get("brands");
  return res.data
}



export const hotproducts = async (pageParams = null) => {
  const res = await useaxios.get("products/hotproducts", {
    params: { cursor: pageParams }
  })
  return res.data;
}



export const collection = async ({ pageParam = null, type }) => {
  const res = await useaxios.get("products/collection", {
    params: {
      cursor: pageParam, 
      type: type         
    }
  });

  return res.data;
};


export const storesapi= async ({pageParam = null})=>{
  const res=await useaxios.get('Stores',{
    params:{
      cursor:pageParam,
    }
  })

  return res.data
}




