import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProductProvider } from './ProductContext'; // Import the context provider to manage global state
import Product from './Product'; // Import the main product listing component
import Productdetails from './Productdetails'; // Import the product details component

function App() {
  return (
    // Wrap the application with the context provider to make shared state accessible to all child components
    <ProductProvider>
      {/* Set up React Router to handle client-side routing */}
      <Router>
        <Routes>
          {/* Define the route for the homepage that renders the Product component */}
          <Route path="/" element={<Product />} />
          {/* Define the route for product details with dynamic ID parameter */}
          <Route path="/product/:id" element={<Productdetails />} />
        </Routes>
      </Router>
    </ProductProvider>
  );
}

export default App; // Export the App component as the main entry point of the application
