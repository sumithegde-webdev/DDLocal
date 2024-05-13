// import React, { useState } from 'react';
// import axios from 'axios';
// import './Details.css';

// const ProductDetails = () => {
//   const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWt1bmpraGFuZGVsd2FsMTIzNCt3b3JrQGdtYWlsLmNvbSJ9.DyFvyl-sgjr4Khxlnkn1SBknsp51X5o9vOhlPgYg2X0';
//   const headers = {
//     token,
//   };

//   const initialFormData = {
//     title: '',
//     description: '',
//     price: '',
//     state: '',
//     city: '',
//     pincode: '',
//     streetaddress: '',
//   };

//   const [formData, setFormData] = useState(initialFormData);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post('http://localhost:8090/api/products/create', formData, { headers });
//       alert('Product created successfully!');
      
//       // Reset form fields after successful submission
//       setFormData(initialFormData);
      
//     } catch (error) {
//       console.error('Error creating product:', error);
//       alert('Failed to create product. Please try again.');
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <h1>Title:</h1>
//         <input type="text" name="title" value={formData.title} onChange={handleChange} required />
//         <h1>Description:</h1>
//         <input type="text" name="description" value={formData.description} onChange={handleChange} required />
//         <h1>Price:</h1>
//         <input type="text" name="price" value={formData.price} onChange={handleChange} required />
//         <h1>State:</h1>
//         <input type="text" name="state" value={formData.state} onChange={handleChange} required />
//         <h1>City:</h1>
//         <input type="text" name="city" value={formData.city} onChange={handleChange} required />
//         <h1>Pincode:</h1>
//         <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
//         <h1>StreetAddress:</h1>
//         <input type="text" name="streetaddress" value={formData.streetaddress} onChange={handleChange} required />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useState } from 'react';
import axios from 'axios';
import './Details.css';

const ProductDetails = () => {
  const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJuaWt1bmpraGFuZGVsd2FsMTIzNCt3b3JrQGdtYWlsLmNvbSJ9.DyFvyl-sgjr4Khxlnkn1SBknsp51X5o9vOhlPgYg2X0';
  const headers = {
    token,
  };

  const initialFormData = {
    title: '',
    description: '',
    price: '',
    state: '',
    city: '',
    pincode: '',
    streetaddress: '',
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8090/api/products/create', formData, { headers });
      alert('Product created successfully!');
      
      // Reset form fields after successful submission
      setFormData(initialFormData);
      
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Failed to create product. Please try again.');
    }
  };

  return (
    <div className="product-details-container">
      <form onSubmit={handleSubmit} className="product-form">
        <h2>Product Information</h2>
        
        <div className="form-group">
          <label>Title:</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Price:</label>
          <input type="text" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>State:</label>
          <input type="text" name="state" value={formData.state} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>City:</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Pincode:</label>
          <input type="text" name="pincode" value={formData.pincode} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label>Street Address:</label>
          <input type="text" name="streetaddress" value={formData.streetaddress} onChange={handleChange} required />
        </div>
        
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductDetails;



