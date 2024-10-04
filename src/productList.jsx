import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ProductList = () => {
  // const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({ name: "", quantity: 0, price: 0 });
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const products = useSelector((state) => state.products.products);
  const isLoading = useSelector((state) => state.products.isLoading);



  console.log("products", products);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const getProductList = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProductList();
  }, []); // The empty array ensures this runs only once when the component mounts

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      const updatedProducts = products.map((p) =>
        p._id === product._id ? product : p
      );
      setProducts(updatedProducts);
      setIsEditing(false);
    } else {
      setProducts([...products, { ...product, _id: Date.now() }]);
    }
    setProduct({ name: "", quantity: 0, price: 0 });
  };

  const handleEdit = (id) => {
    const productToEdit = products.find((p) => p._id === id);
    setProduct(productToEdit);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    const filteredProducts = products.filter((p) => p._id !== id);
    setProducts(filteredProducts);
  };

  const handleView = (id) => {
    const productToView = products.find((p) => p._id === id);
    setSelectedProduct(productToView);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <h1>Product List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={product.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          value={product.quantity}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={product.price}
          onChange={handleChange}
          required
        />
        <button type="submit">{isEditing ? "Update" : "Add"} Product</button>
      </form>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - {p.quantity} - ${p.price}
            <button onClick={() => handleEdit(p._id)}>Edit</button>
            <button onClick={() => handleDelete(p._id)}>Delete</button>
            <button onClick={() => handleView(p._id)}>View Details</button>
          </li>
        ))}
      </ul>
      {selectedProduct && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedProduct.name}</h2>
            <p>Quantity: {selectedProduct.quantity}</p>
            <p>Price: ${selectedProduct.price}</p>
            <button onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
