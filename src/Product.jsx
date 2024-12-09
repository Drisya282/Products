import React, { useContext } from 'react'; 
import { ProductContext } from './ProductContext'; // Import ProductContext to access shared state
import { Card, Pagination } from 'react-bootstrap'; // Import required UI components from react-bootstrap
import { useNavigate } from 'react-router-dom'; // Import navigation hook for routing
import Navibar from './Navibar'; // Import the navigation bar component

const HomePage = () => {
  // Access filtered products from the shared ProductContext
  const { filteredProducts } = useContext(ProductContext);

  // hook in React Router that allows you to move from one page to another in the app programmatically
  const navigate = useNavigate();

  // Number of products to show per page
  const itemsPerPage = 10;

  // State to track the current active page for pagination
  const [currentPage, setCurrentPage] = React.useState(1);

  // Calculate total pages based on the number of filtered products
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Determine index range for slicing the filtered product list
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;

  // Slice the filtered product list to show only the current page's items
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Handle click on a product and navigate to the product's detail page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to product detail page using product ID
  };

  // Handle page changes in pagination
  const handlePaginationChange = (page) => {
    setCurrentPage(page); // Update the current page state
  };

  return (
    <div>
      {/* Render the navigation bar at the top of the homepage */}
      <Navibar />

      {/* Grid view of the currently paginated products */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', marginTop: '18px' }}>
        {currentProducts.map((product) => (
          <div
            key={product.id} // Use the product's ID as the key for React's rendering optimization and for identifying each product.
            onClick={() => handleProductClick(product.id)} // Handle navigation when clicking on the product to show details
            style={{ cursor: 'pointer', margin: '10px', display: 'flex' }}
          >
            {/* Card section to display product details */}
            <Card style={{ width: '18rem', height: '18rem', textAlign: 'center' }}>
              {/* Display product image */}
              <Card.Img
                variant="top"
                style={{ height: '150px' }}
                src={product.images[0]} // Set the first image as the product's thumbnail
              />
              <Card.Body>
                {/* Displaying Product title, price, and rating */}
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Rating: {product.rating}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {/* Pagination Section */}
      <div style={{ margin: '20px', marginLeft: '1250px' }}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index} // Unique key setting for each button
            onClick={() => handlePaginationChange(index + 1)} // Change the current page on click
            style={{
              padding: '5px',
              margin: '2px',
              backgroundColor: index + 1 === currentPage ? 'blue' : 'white', // Highlight the current page
              color: 'black',
            }}
          >
            {index + 1} {/* Display the current page number */}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
