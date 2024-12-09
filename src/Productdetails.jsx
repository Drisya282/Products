import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// Importing bootstrap icons for use in UI elements
import 'bootstrap-icons/font/bootstrap-icons.css';


const ProductDetails = () => {
  const { id } = useParams();  // Extract the product ID from the URL parameters
  const [product, setProduct] = useState(null); //State to store the product details fetched from the API
  const [loading, setLoading] = useState(true);    // State to track the loading state during API calls
  const [error, setError] = useState(null);   // State to track if there is an error during data fetching

  // Fetch product details from the API when the component is mounted
  useEffect(() => {
    axios
      .get(`https://dummyjson.com/products/${id}`) // Make an API call to fetch the product details
      .then((res) => {
        setProduct(res.data); // Set product data from the API response
      })
      .catch((error) => setError(error.message)) // Handle any errors that occur
      .finally(() => setLoading(false)); // Set loading to false regardless of success or failure
  }, [id]);

  // Show a loading message while fetching the data
  if (loading) return <Container className="mt-5">Loading products...</Container>;

  // Show an error message if there is an error during the fetch
  if (error) return <Container className="mt-5" style={{ color: 'red' }}>Error in loading {error}</Container>;

  return (
    <div style={{ background: '#ffff99', height: '600px' }}>
      {/* Navihation bar with a back button */}
      <Navbar>
        <Container>
          <Nav>
            <Nav.Link as={Link} to="/">
              <button
                style={{ 
                  width: '120px',
                  height: '40px',
                  backgroundColor: '#ffff99',
                  border: 'none',
                  color: '#ff8080',
                  fontSize: '26px',
                }}
              >
                {/* Back button with an arrow icon */}
                <i className="bi bi-arrow-left"></i> 
              </button>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      {/* Product Details Section */}
      <div
        style={{
          textAlign: 'left',
          marginLeft: '120px',
          border: '8px',
          borderColor: 'white',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '20px',
        }}
      >
        <div>
          <img
            src={product.images}   //product image
            alt={product.title}
            style={{ height: '350px', marginBottom: '20px', marginLeft: '10px' }}
          />
        </div>
        <div
          style={{
            textAlign: 'left',
            marginLeft: '120px',
            marginTop: '120px',
            border: '8px',
            borderColor: 'white',
          }}
        >
          {/* //Product details */}
          <h2>{product.title}</h2>
          <h2>${product.price}</h2>
          <h3>{product.discountPercentage}% Off</h3>
          <h4>Rating: {product.rating}</h4>
          <h5>Details:</h5>
          <p>{product.description}</p>
          <div>
            {/* //button for buy now  just adding the button for UI*/}
            <button
              style={{
                marginRight: '10px',
                width: '100px',
                backgroundColor: '#884dff',
                border: 'none',
                color: 'white',
              }}
            >
              Buy Now
            </button>
            {/* button for Addto cart  just adding the button for UI*/ }
            <button
              style={{
                width: '100px',
                backgroundColor: 'white',
                border: 'none',
                color: '#884dff',
              }}>
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
