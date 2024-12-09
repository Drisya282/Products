import React, { createContext, useState, useEffect } from 'react'; 
import axios from 'axios';
import Navibar from './Navibar';

// Create a context for sharing product-related state across components
export const ProductContext = createContext();

// ProductProvider component to wrap the application and provide context values
export const ProductProvider = ({ children }) => {
  // State to store all products fetched from the API
  const [products, setProducts] = useState([]);

  // State to store products after applying filters and sorting
  const [filteredProducts, setFilteredProducts] = useState([]);

  // State for category filtering
  const [categoryFilter, setCategoryFilter] = useState('');

  // State for sort order (e.g., low-to-high, high-to-low)
  const [sortOrder, setSortOrder] = useState('');

  // State to store the user's search query
  const [searchData, setSearchData] = useState('');

  // Function to fetch products from the mock API
  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products); // Save fetched products
      setFilteredProducts(response.data.products); // Initially set filtered products to all products
    } catch (error) {
      console.error('Error fetching products:', error); // Handle API fetch errors
    }
  };

  // Render Navibar component (note: this is incorrectly placed here and won't work as intended)
  <Navibar/>

  // Fetch products when the component first mounts
  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Filtering and Sorting Logic based on category, search, and sort options
  useEffect(() => {
    let tempProducts = [...products]; // Work with a copy of the product list

    // Apply category filter
    if (categoryFilter) {
      tempProducts = tempProducts.filter(
        (product) =>
          product.category.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    // Apply search filter
    if (searchData) {
      tempProducts = tempProducts.filter((product) =>
        product.title.toLowerCase().includes(searchData.toLowerCase())
      );
    }

    // Apply sorting logic
    if (sortOrder === 'lowToHigh') {
      tempProducts.sort((a, b) => a.price - b.price); // Sort by price from low to high
    } else if (sortOrder === 'highToLow') {
      tempProducts.sort((a, b) => b.price - a.price); // Sort by price from high to low
    }

    // Update the filtered products state with the processed list
    setFilteredProducts(tempProducts);
  }, [products, categoryFilter, sortOrder, searchData]); // Re-run logic when these dependencies change

  return (
    // Provide shared state values to child components through context
    <ProductContext.Provider
      value={{
        products, // All products
        filteredProducts, // Filtered and sorted products based on user selection
        categoryFilter, // The current category filter
        setCategoryFilter, // Function to set the category filter
        sortOrder, // Current sort order
        setSortOrder, // Function to set the sort order
        searchData, // The current search query
        setSearchData, // Function to set the search query
      }}
    >
      {children} {/* Render the child components */}
    </ProductContext.Provider>
  );
};
