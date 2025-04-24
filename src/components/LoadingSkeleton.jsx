import React from "react";
import "./LoadingSkeleton.css"; // You'll need to create this

/**
 * Component that renders placeholder loading states
 * @param {Object} props
 * @param {string} props.type - Type of skeleton (card, product, category, carousel, etc.)
 * @param {number} props.count - Number of skeleton items to render (default: 1)
 */
const LoadingSkeleton = ({ type, count = 1 }) => {
  const renderSkeleton = () => {
    switch (type) {
      case "card":
        return <div className="skeleton-card pulse"></div>;
      
      case "product":
        return <div className="skeleton-product pulse">
          <div className="skeleton-image"></div>
          <div className="skeleton-title"></div>
          <div className="skeleton-price"></div>
        </div>;
      
      case "category":
        return <div className="skeleton-category pulse">
          <div className="skeleton-circle"></div>
          <div className="skeleton-text"></div>
        </div>;
      
      case "carousel":
        return <div className="skeleton-carousel pulse"></div>;
      
      case "brands":
        return <div className="skeleton-brand pulse">
          <div className="skeleton-circle"></div>
        </div>;
      
      case "products":
        return Array(count)
          .fill()
          .map((_, index) => (
            <div className="skeleton-product pulse" key={index}>
              <div className="skeleton-image"></div>
              <div className="skeleton-title"></div>
              <div className="skeleton-price"></div>
            </div>
          ));
      
      case "categories":
        return Array(count)
          .fill()
          .map((_, index) => (
            <div className="skeleton-category pulse" key={index}>
              <div className="skeleton-circle"></div>
              <div className="skeleton-text"></div>
            </div>
          ));
      
      default:
        return <div className="skeleton-box pulse"></div>;
    }
  };

  return (
    <>
      {type.includes("products") || type.includes("categories")
        ? renderSkeleton()
        : Array(count)
            .fill()
            .map((_, index) => (
              <div key={index}>{renderSkeleton()}</div>
            ))}
    </>
  );
};

export default LoadingSkeleton;