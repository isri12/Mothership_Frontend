/**
 * CarouselComp.jsx
 * Hero banner carousel for the e-commerce homepage
 *
 * This component displays rotating promotional banners in a carousel format.
 * It uses react-bootstrap's Carousel component with customized styling.
 */
import Carousel from 'react-bootstrap/Carousel';
import './CarouselComp.css'; // Import custom styles for the carousel

/**
 * CarouselComp Component
 * Renders a responsive image carousel with consistent sizing
 * Uses object-fit: contain to show the entire image without zooming/cropping
 *
 * @returns {JSX.Element} The rendered carousel component
 */
function CarouselComp() {
  return (
    <div className="carousel-container">
      <Carousel
        data-bs-theme="dark"
        indicators={true}
        controls={true}
        interval={4000} // Auto-rotate every 4 seconds
        pause="hover" // Pause on mouse hover
      >
        {/* First Slide - Local Image */}
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src="/images/banner1.jpg" // Path relative to public folder
              alt="Featured products and deals"
            />
          </div>
          {/* Optional caption */}
          {/* <Carousel.Caption className="carousel-caption">
            <h3>Special Offers</h3>
            <p>Discover our latest deals and promotions</p>
          </Carousel.Caption> */}
        </Carousel.Item>

        {/* Second Slide - Local Image */}
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src="/images/banner2.jpg" // Path relative to public folder
              alt="Shop online with free delivery"
            />
          </div>
        </Carousel.Item>

        {/* Third Slide - Local Image */}
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src="/images/banner3.jpg" // Path relative to public folder
              alt="Seasonal promotions"
            />
          </div>
        </Carousel.Item>

        {/* Fourth Slide - Local Image */}
        <Carousel.Item>
          <div className="carousel-image-container">
            <img
              className="carousel-image"
              src="/images/banner4.jpg" // Path relative to public folder
              alt="Exclusive deals"
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselComp;