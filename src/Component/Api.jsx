import { appendErrors } from "react-hook-form";
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


export const storesapi = async ({ pageParam = null }) => {
  const res = await useaxios.get('Stores', {
    params: {
      cursor: pageParam,
    }
  })

  return res.data
}




export const addtocart = async (cartdata) => {
  try {
    const res = await useaxios.post("cart", cartdata);
    return res.data;
  }
  catch (error) {
    console.log(error);
    throw error;
  }
}

export const cartdata = async (useremail) => {
  try {
    const res = await useaxios.get(`cart/${useremail}`)
    return res.data;
  }
  catch (err) {
    console.log(err);
    throw err;
  }
}


export const removecart = async (id) => {
  try {
    const res = await useaxios.delete(`/cart/${id}`); // ✅ DELETE method
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};




export const addfavorite = async (favorite) => {
  try {
    const res = await useaxios.post("/favorite", favorite);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getfavorite = async (params) => {
  try {
    const res = await useaxios.get("/favorite/check", {
      params: {
        productId: params.productId,
        userEmail: params.userEmail
      }
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const removeFavorite = async (params) => {
  try {
    const res = await useaxios.delete("/favorite", {
      data: {
        productId: params.productId,
        userEmail: params.userEmail
      }
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};


export const toggleFavorite = async (params) => {
  try {
    const res = await useaxios.post("/favorite/toggle", {
      productId: params.productId,
      userEmail: params.userEmail
    });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};




export const getUserFavorites = async (userEmail) => {
  try {
    const res = await useaxios.get(`/favorite/user/${userEmail}`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getProductsByIds = async (productIds) => {
  try {
    const res = await useaxios.post("/products/byIds", { productIds });
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};