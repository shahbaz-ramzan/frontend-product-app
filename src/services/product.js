
export const  getProductList=async ()=> {

    try {
      // dispatch(fetchProductsStart());
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      // dispatch(fetchProductsSuccess(data));
      return data;
    } catch (error) {
      // dispatch(fetchProductsFailure(error.message));
      console.error("Error fetching products:", error);
    }

  // ... rest of your component logic using fetchProducts
}

// add new product
export const addProduct = async (product) => {
  try {
    const response = await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product), 
    });

    if (!response.ok) {
      throw new Error("Failed to add product");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
};

// delete the product 

export const deleteProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to delete product: ${response.statusText}`);
      }
  
      return; 
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  export const getProduct = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to add product");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };
  


