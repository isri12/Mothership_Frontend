/**
 * NavBar.jsx
 * Main navigation component for the Gojo E-commerce application
 * 
 * This component is responsible for:
 * 1. Site logo display and home navigation
 * 2. Search functionality for products
 * 3. Location selection with persisted state using localStorage
 * 4. Navigation links to key site areas
 * 5. Shopping cart access
 * 
 * The navbar uses a sticky positioning to remain visible while scrolling
 * and contains a dropdown location selector with country groupings.
 * 
 * @component
 */
import { useNavigate } from "react-router-dom" // For programmatic navigation
import "./components.css" // Import component styles
import { useEffect, useState, useRef } from "react" // React hooks for state and side effects

/**
 * NavBar Component
 * Provides the main navigation interface for the application
 * 
 * @returns {JSX.Element} The rendered navigation bar
 */
function NavBar() {
  // ----------------
  // State Management
  // ----------------
  
  /**
   * User location state
   * Stores the currently selected delivery/browsing location
   * Persisted in localStorage for returning users
   */
  const [userLocation, setUserLocation] = useState("")
  
  /**
   * Dropdown visibility state
   * Controls whether the location dropdown menu is visible
   */
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  
  /**
   * Reference to the dropdown DOM element
   * Used to detect clicks outside the dropdown to close it
   */
  const dropdownRef = useRef(null)
  
  /**
   * Navigation hook for routing
   * Allows programmatic navigation to different pages
   */
  const navigate = useNavigate()

  // ----------------
  // Data
  // ----------------
  
  /**
   * Available locations organized by country
   * Each country contains an array of states/cities
   * This would typically come from an API in production
   */
  const locations = {
    "United States": ["Washington DC", "Virginia", "Texas"],
    "Ethiopia": ["Addis Ababa", "Dire Dawa", "Adama", "Mekele"]
  }

  // ----------------
  // Effects
  // ----------------
  
  /**
   * Effect hook to initialize user location from localStorage
   * Runs once when component mounts
   * 
   * 1. Checks localStorage for saved location
   * 2. If found, uses the saved location
   * 3. Otherwise, sets a default "Select Location" placeholder
   */
  useEffect(() => {
    // Try to get stored location from browser storage
    const location = localStorage.getItem("userLocation")
    
    // Set user location based on storage or default
    if (location) {
      setUserLocation(location)
    }
    else {
      setUserLocation("Select Location")
    }
  }, []) // Empty dependency array ensures this runs only once on mount
  
  /**
   * Effect hook to handle clicks outside the location dropdown
   * Implements a "click outside to close" pattern for the dropdown
   * 
   * 1. Adds event listener when dropdown is open
   * 2. Checks if click is outside the dropdown
   * 3. Closes dropdown if click is outside
   * 4. Removes listener when component unmounts or dropdown closes
   */
  useEffect(() => {
    /**
     * Click handler that checks if click is outside dropdown
     * 
     * @param {MouseEvent} event - The click event
     */
    function handleClickOutside(event) {
      // Close dropdown if click is outside of dropdown element
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowLocationDropdown(false)
      }
    }

    // Only add listener when dropdown is showing
    if (showLocationDropdown) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    
    // Cleanup function to remove listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [showLocationDropdown]) // Re-run when dropdown visibility changes

  // ----------------
  // Event Handlers
  // ----------------
  
  /**
   * Handles location selection from the dropdown
   * 
   * 1. Stops event propagation to prevent closing dropdown prematurely
   * 2. Updates user location state
   * 3. Saves selection to localStorage for persistence
   * 4. Closes the dropdown
   * 
   * @param {string} location - The selected location name
   * @param {React.MouseEvent} e - The click event object
   */
  const handleLocationSelect = (location, e) => {
    e.stopPropagation() // Prevent triggering parent onClick events
    
    // Update state with selected location
    setUserLocation(location)
    
    // Save to localStorage for persistence between sessions
    localStorage.setItem("userLocation", location)
    
    // Close the dropdown
    setShowLocationDropdown(false)
  }

  /**
   * Toggles the location dropdown visibility
   * Inverts the current visibility state
   */
  const toggleLocationDropdown = () => {
    setShowLocationDropdown(prev => !prev)
  }

  // ----------------
  // Render
  // ----------------
  return (
    <div className="navbar-container">
      {/* Left Section: Logo and Search */}
      <div className="left-side-nav">
        {/* 
         * Company Logo
         * Clicking logo navigates to home page
         */}
        <img 
          src="/gojo_logo.png" 
          alt="logo" 
          height="42px" 
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        />
        
        {/* 
         * Search Bar
         * Contains input field and search icon
         */}
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products, brands, and categories" 
            aria-label="Search products"
          />
          <img src="/search-logo.png" alt="search" height="17px" />
        </div>
      </div>

      {/* 
       * Location Selector
       * Displays current location and opens dropdown on click
       * Uses ref for detecting outside clicks
       */}
      <div 
        className="location-selector" 
        onClick={toggleLocationDropdown}
        ref={dropdownRef}
        aria-expanded={showLocationDropdown}
        aria-haspopup="true"
      >
        {/* Current location display with location pin icon */}
        <p style={{ fontStyle: "italic", fontSize: "14px", margin: 0, cursor: "pointer" }}>
          📍 {userLocation}
        </p>
        
        {/* 
         * Location Dropdown Menu (conditionally rendered)
         * Shows available locations grouped by country
         */}
        {showLocationDropdown && (
          <div 
            className="location-dropdown"
            role="menu"
            aria-label="Location selection"
          >
            {/* Map through countries and their locations */}
            {Object.entries(locations).map(([country, states]) => (
              <div 
                key={country} 
                className="country-section"
              >
                {/* Country heading */}
                <h3>{country}</h3>
                
                {/* List of states/cities for this country */}
                {states.map(state => (
                  <p
                    key={state}
                    onClick={(e) => handleLocationSelect(state, e)}
                    className="location-option"
                    role="menuitem"
                  >
                    {state}
                  </p>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Section: Navigation Links and Cart */}
      <div className="right-side-nav">
        {/* 
         * Navigation Links
         * Each link navigates to a specific page
         */}
        <p>Download app</p>
        <p onClick={() => navigate("/sign-up")}>Sign up</p>
        <p onClick={() => navigate("/login")}>Login</p>
        
        {/* 
         * Shopping Cart
         * Icon that navigates to cart page on click
         */}
        <img 
          src="/cart.png" 
          alt="cart" 
          height="33px" 
          onClick={() => navigate("/cart")}
          style={{ cursor: "pointer" }}
          aria-label="View shopping cart"
        />
      </div>
    </div>
  )
}

/**
 * Export the NavBar component as the default export
 * This allows it to be imported with: import NavBar from './NavBar'
 */
export default NavBar