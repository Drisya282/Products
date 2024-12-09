import React, { useContext, useState } from 'react'; 
import { Navbar, Nav, NavDropdown, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { ProductContext } from './ProductContext';
import { useNavigate } from 'react-router-dom';

// Main Navigation bar performs searching ,sorting and filtering.
const Navibar = () => {
  //  context values and their respective setter functions from ProductContext
  const { setCategoryFilter, setSortOrder, setSearchData, searchData } = useContext(ProductContext);

  // Hook allow to navigate from one page to another
  const navigate = useNavigate();

  // Handle category selection and navigate to corresponding filtered results
  const handleCategoryChange = (category) => {
    setCategoryFilter(category); // Set the selected category filter
    navigate(`/?category=${category}`); // Navigate to the filtered URL with category as a query parameter
  };

  // Handle sorting logic by setting sort order in context
  const handleSortChange = (sort) => {
    setSortOrder(sort); // Set the sort order based on the selected option
  };

  // Handle search input changes and trigger context update
  const handleSearchChange = (e) => {
    setSearchData(e.target.value); // Update the search query value in context
  };

  return (
    <div style={{background:'#ffff99' }}>
      {/* Main navigation bar container */}
      <Navbar expand="lg" className="bg-body-tertiary" >
        <Container>
          {/* Navbar Brand with logo */}
          <Navbar.Brand href="#home"  style={{borderWidth: '220px'}}>
            <img 
              src='https://th.bing.com/th/id/OIF.cGkow5w37OGYKY4QlfQj5A?w=269&h=202&c=7&r=0&o=5&dpr=1.3&pid=1.7' 
              style={{width:'250px'}}
            />
          </Navbar.Brand>
          
          {/* Navbar toggle button for mobile responsiveness */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          {/* Navigation items section */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-5" style={{right:'50px'}}>

              {/* Search bar section */}
              <Form inline>
                <Row>
                  <Col lg="auto">
                    <Form.Control
                      type="text"
                      value={searchData} // Bind the search input field to the current query value
                      onChange={handleSearchChange} // Trigger on change
                      placeholder="Search for product"
                      className="mr-sm-4"
                      style={{ maxWidth: '8500px', width: '500px', marginLeft:'10px', marginTop:'80px', marginLeft:'50px' }}
                    />
                  </Col>
                </Row>
              </Form>

              {/* Category dropdown for filtering */}
              <NavDropdown title="Category" id="category-dropdown" style={{marginTop:'80px',marginLeft:'20px' }}> 
                <NavDropdown.Item onClick={() => handleCategoryChange('Beauty')}>Beauty</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategoryChange('Fragrances')}>Fragrances</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategoryChange('Groceries')}>Groceries</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleCategoryChange('Furniture')}>Furniture</NavDropdown.Item>
              </NavDropdown>

              {/* Sorting dropdown */}
              <NavDropdown title="Sort by" id="sort-dropdown" style={{marginTop:'80px',marginLeft:'10px' }}>
                <NavDropdown.Item onClick={() => handleSortChange('lowToHigh')}>Price: Low to High</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleSortChange('highToLow')}>Price: High to Low</NavDropdown.Item>
              </NavDropdown>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navibar;
