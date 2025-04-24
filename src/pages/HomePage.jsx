/**
 * Import necessary React hooks and libraries
 */
import { useEffect, useState, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../redux/productSlice";
import { Items } from "../assets/data/items";
import { NavgationCategories } from "../assets/data/categories";

/**
 * Eagerly loaded components
 */
import NavBar from "../components/NavBar";
import CarouselComp from "../components/CarouselComp";
import NavCatagoryContainer from "../components/NavCatagoryContainer";
import TitleComponent from "../components/TitleComponent";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";

/**
 * Lazily loaded components
 */
const CategoryCard = lazy(() => import("../components/CategoryCard"));
const ItemCard = lazy(() => import("../components/ItemCard"));
const BrandContainer = lazy(() => import("../components/BrandContainer"));

/**
 * CSS styles import
 */
import "./pages.css";

/**
 * HomePage Component
 */
function HomePage() {
  // Redux hooks for state management
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);
  
  // Local state for UI management
  const [isLoading, setIsLoading] = useState(true);
  const [popularItems, setPopularItems] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [fashion, setFashion] = useState([]);
  const [housing, setHousing] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  /**
   * Effect hook to load data when component mounts
   */
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        dispatch(setProduct(Items));
        
        // Popular items in the area
        const popularItemsData = [
          {
            id: "pop1",
            name: "iPhone 14 Pro",
            price: 10000,
            priceUSD: 800,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-14-pro-finish-select-202209-6-7inch-deeppurple?wid=2560&hei=1440&fmt=jpeg&qlt=95&.v=1663703841896",
            rating: 4.9,
            views: 15000,
            favorites: 850,
            category: "Electronics",
            condition: "New"
          },
          {
            id: "pop2",
            name: "House for Rent - 3BR",
            price: 20000,
            priceUSD: 600,
            image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            rating: 4.7,
            views: 8500,
            favorites: 320,
            category: "House",
            location: "Bole, Addis Ababa"
          },
          {
            id: "pop3",
            name: "Toyota Vitz 2018",
            price: 900000,
            priceUSD: 27000,
            image: "https://toyotarentaldirect.com.au/images/Toyota-Yaris_Side-angle.png",
            rating: 4.8,
            views: 12000,
            favorites: 540,
            category: "Cars",
            condition: "Used",
            mileage: "45,000 km"
          },
          {
            id: "pop4",
            name: "Sony PlayStation 5",
            price: 25000,
            priceUSD: 750,
            image: "https://m.media-amazon.com/images/I/51051FiD9UL._AC_UF894,1000_QL80_.jpg",
            rating: 4.9,
            views: 18500,
            favorites: 980,
            category: "Electronics",
            condition: "New"
          },
          {
            id: "pop5",
            name: "Commercial Space for Rent",
            price: 35000,
            priceUSD: 1050,
            image: "https://d34jpvobkrvesd.cloudfront.net/wp-content/uploads/2023/01/shopping-center-scaled.jpg",
            rating: 4.6,
            views: 5200,
            favorites: 180,
            category: "House",
            location: "Mexico Area, Addis Ababa",
            size: "120 sqm"
          },
          {
            id: "pop6",
            name: "MacBook Pro M2",
            price: 70000,
            priceUSD: 2100,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202301?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1671304673229",
            rating: 4.8,
            views: 9800,
            favorites: 420,
            category: "Electronics",
            condition: "New"
          }
        ];
        
        // Electronics items
        const electronicsData = [
          {
            id: "elec1",
            name: "iPhone 13 - 128GB",
            price: 45000,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-13-blue-select-2021?wid=940&hei=1112&fmt=png-alpha&.v=1645572386470",
            rating: 4.7,
            condition: "Used"
          },
          {
            id: "elec2",
            name: "Samsung 55\" QLED TV",
            price: 40000,
            image: "https://images.samsung.com/is/image/samsung/p6pim/in/qa55qe1caklxl/gallery/in-qled-qe1c-qa55qe1caklxl-536869064?$650_519_PNG$",
            rating: 4.7,
            condition: "New"
          },
          {
            id: "elec3",
            name: "Sony A7 III Camera",
            price: 85000,
            image: "https://img.freepik.com/premium-photo/isolated-sony-a7-iii-mirrorless-camera-front-view-white-backgroun-white-background-clean_655090-800284.jpg",
            rating: 4.9,
            condition: "Used"
          },
          {
            id: "elec4",
            name: "Dell XPS 15 Laptop",
            price: 85000,
            image: "https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products/notebooks/xps-notebooks/xps-15-9530/media-gallery/black/notebook-xps-15-9530-t-black-gallery-1.psd?fmt=png-alpha&pscan=auto&scl=1&wid=3307&hei=2329&qlt=100,1&resMode=sharp2&size=3307,2329",
            rating: 4.8,
            condition: "New"
          },
          {
            id: "elec5",
            name: "AirPods Pro 2",
            price: 8500,
            image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1660803972361",
            rating: 4.8,
            condition: "New"
          },
          {
            id: "elec6",
            name: "LG Refrigerator 350L",
            price: 30000,
            image: "https://www.lg.com/in/images/refrigerators/md07539901/gallery/GL-T372JPZY-Refrigerators-Front-View-D-01.jpg",
            rating: 4.6,
            condition: "New"
          }
        ];

        // Fashion items
        const fashionData = [
          {
            id: "fash1",
            name: "DOMYOS Men's Black Solid T-shirt",
            price: 500,
            image: "https://img01.ztat.net/article/spp-media-p1/7e1c33fc6e8837fbada8ad5e64a8bc8e/60dde51d43ed4821a3e7cbdded027f7a.jpg",
            rating: 4.3,
            condition: "New"
          },
          {
            id: "fash2",
            name: "Aeropostale Navy Blue Shirt",
            price: 800,
            image: "https://imagescdn.aeo.in/img/app/product/7/798175-9543811.jpg",
            rating: 4.5,
            condition: "New"
          },
          {
            id: "fash3",
            name: "Calvin Klein Light Blue Shirt",
            price: 1200,
            image: "https://calvinklein.scene7.com/is/image/CalvinKlein/41FB112-420_alternate1?wid=1500&hei=1500&fmt=jpeg&qlt=90%2c0&op_sharpen=0&resMode=trilin&op_usm=0.8%2c1.0%2c6%2c0&iccEmbed=0",
            rating: 4.7,
            condition: "New"
          },
          {
            id: "fash4",
            name: "Nike Dri-Fit T-shirt",
            price: 900,
            image: "https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/742a0b6e-d9bf-493d-9a17-ec059b007c38/dri-fit-mens-training-t-shirt-MWTBCGN8.png",
            rating: 4.6,
            condition: "New"
          },
          {
            id: "fash5",
            name: "Lucky Brand Navy Embroidered Top",
            price: 650,
            image: "https://m.media-amazon.com/images/I/71JnnE-v3BL._AC_UY1000_.jpg",
            rating: 4.4,
            condition: "New"
          },
          {
            id: "fash6",
            name: "VSX Geo Print Sports Bra",
            price: 1200,
            image: "https://cdn-img.prettylittlething.com/c/a/f/3/caf3e49f8f5ecbf2f5fbbbaa2c09afed13a010c2_cmb6427_1.jpg",
            rating: 4.5,
            condition: "New"
          }
        ];

        // Housing items
        const housingData = [
          {
            id: "house1",
            name: "Luxury Apartment - 2BR",
            price: 25000,
            image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBhcnRtZW50fGVufDB8fDB8fHww&w=1000&q=80",
            rating: 4.8,
            location: "Bole, Addis Ababa"
          },
          {
            id: "house2",
            name: "Villa for Rent - 4BR",
            price: 45000,
            image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
            rating: 4.9,
            location: "CMC, Addis Ababa"
          },
          {
            id: "house3",
            name: "Office Space - 80sqm",
            price: 30000,
            image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
            rating: 4.6,
            location: "Kazanchis, Addis Ababa"
          },
          {
            id: "house4",
            name: "Studio Apartment",
            price: 12000,
            image: "https://images.pexels.com/photos/439227/pexels-photo-439227.jpeg",
            rating: 4.4,
            location: "Gerji, Addis Ababa"
          },
          {
            id: "house5",
            name: "Land for Sale - 200sqm",
            price: 3000000,
            image: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg",
            rating: 4.7,
            location: "Lebu, Addis Ababa"
          },
          {
            id: "house6",
            name: "G+1 House for Sale",
            price: 5500000,
            image: "https://images.pexels.com/photos/1029599/pexels-photo-1029599.jpeg",
            rating: 4.8,
            location: "Summit, Addis Ababa"
          }
        ];

        // Vehicles items
        const vehiclesData = [
          {
            id: "veh1",
            name: "Toyota RAV4 2019",
            price: 2500000,
            image: "https://www.motortrend.com/uploads/sites/10/2018/06/2019-toyota-rav4-xle-hybrid-suv-angular-front.png",
            rating: 4.8,
            condition: "Used",
            mileage: "35,000 km"
          },
          {
            id: "veh2",
            name: "Honda Civic 2020",
            price: 1800000,
            image: "https://platform.cstatic-images.com/xlarge/in/v2/stock_photos/e829ed9a-7856-40a8-b8ed-28aee0bc5c9e/9e1a22b4-541a-469f-b804-955dd62ffe15.png",
            rating: 4.7,
            condition: "Used",
            mileage: "28,000 km"
          },
          {
            id: "veh3",
            name: "Suzuki Swift 2018",
            price: 750000,
            image: "https://dealerimages.dealereprocess.com/image/upload/c_limit,f_auto,fl_progressive,w_700/v1/svn/dep-gabdealerlive/2468/18sz0094_1.jpg",
            rating: 4.5,
            condition: "Used",
            mileage: "67,000 km"
          },
          {
            id: "veh4",
            name: "Hyundai Tucson 2019",
            price: 1500000,
            image: "https://carsguide-res.cloudinary.com/image/upload/f_auto,fl_lossy,q_auto,t_cg_hero_large/v1/editorial/vhs/Hyundai-Tucson.png",
            rating: 4.7,
            condition: "Used",
            mileage: "32,000 km"
          },
          {
            id: "veh5",
            name: "Toyota Corolla 2017",
            price: 1200000,
            image: "https://www.motortrend.com/uploads/sites/10/2015/11/2014-toyota-corolla-s-cvt-sedan-angular-front.png",
            rating: 4.6,
            condition: "Used",
            mileage: "85,000 km"
          },
          {
            id: "veh6",
            name: "Nissan X-Trail 2020",
            price: 2200000,
            image: "https://upload.wikimedia.org/wikipedia/commons/3/3f/2018_Nissan_X-Trail_Tekna_DCi_1.6_Front.jpg",
            rating: 4.8,
            condition: "Used",
            mileage: "22,000 km"
          }
        ];
        
        setPopularItems(popularItemsData);
        setElectronics(electronicsData);
        setFashion(fashionData);
        setHousing(housingData);
        setVehicles(vehiclesData);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setTimeout(() => setIsLoading(false), 500);
      }
    };
    
    loadData();
  }, [dispatch]);

  /**
   * Conditional rendering for loading state
   */
  if (isLoading) {
    return (
      <div className="landing-page-container">
        <NavBar />
        <div className="categories-container skeleton-container">
          {Array(5).fill().map((_, index) => (
            <LoadingSkeleton key={index} type="category" />
          ))}
        </div>
        <LoadingSkeleton type="carousel" />
        <div className="popular-area-container skeleton-container">
          {Array(4).fill().map((_, index) => (
            <LoadingSkeleton key={index} type="card" />
          ))}
        </div>
      </div>
    );
  }

  /**
   * Main render method when data is loaded
   */
  return (
    <div className="landing-page-container">
      {/* Navigation Bar */}
      <NavBar />

      {/* Category Navigation - Material Icons Style */}
      <div className="category-icons-container">
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">woman</span>
          </div>
          <div className="category-name">Women</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">man</span>
          </div>
          <div className="category-name">Men</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">smartphone</span>
          </div>
          <div className="category-name">Electronics</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">toys</span>
          </div>
          <div className="category-name">Toys</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">sports_esports</span>
          </div>
          <div className="category-name">Gaming</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">shopping_bag</span>
          </div>
          <div className="category-name">Handbags</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">home</span>
          </div>
          <div className="category-name">Home</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">history_edu</span>
          </div>
          <div className="category-name">Vintage</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">face</span>
          </div>
          <div className="category-name">Beauty</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">child_care</span>
          </div>
          <div className="category-name">Kids</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">sports_soccer</span>
          </div>
          <div className="category-name">Sports</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">handyman</span>
          </div>
          <div className="category-name">Handmade</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">work</span>
          </div>
          <div className="category-name">Office</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">pets</span>
          </div>
          <div className="category-name">Pet</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">beach_access</span>
          </div>
          <div className="category-name">Outdoor</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">build</span>
          </div>
          <div className="category-name">Tools</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">menu_book</span>
          </div>
          <div className="category-name">Books</div>
        </div>
        <div className="category-icon-item">
          <div className="category-icon">
            <span className="material-icons">more_horiz</span>
          </div>
          <div className="category-name">View all</div>
        </div>
      </div>

      {/* Hero Carousel */}
      <CarouselComp />

      {/* Popular in the Area - Vertical Layout (Similar to Image 1) */}
      <div className="section-header">
        <h2 className="section-title">Popular in the Area</h2>
      </div>
      <div className="vertical-items-grid">
        {popularItems.map(item => (
          <div className="vertical-item-card" key={item.id}>
            <div className="item-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="item-details">
              <h3 className="item-name">{item.name}</h3>
              <div className="item-price">${item.price.toLocaleString()}</div>
              <div className="item-views">{item.views.toLocaleString()} views</div>
              <div className="item-favorites">{item.favorites} favorites</div>
              <div className="dual-price">{item.price.toLocaleString()} Birr / ${item.priceUSD}</div>
              {item.condition && <div className="item-condition">Condition: {item.condition}</div>}
              {item.location && <div className="item-location">{item.location}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Electronics Section - Horizontal Scrolling (Similar to Image 2) */}
      <div className="category-section">
        <div className="section-header">
          <h2 className="section-title">Electronics</h2>
          <a href="#" className="see-all-link">See all</a>
        </div>
        <div className="horizontal-items-container">
          {electronics.map(item => (
            <div className="horizontal-item-card" key={item.id}>
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-price">${item.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fashion Section - Horizontal Scrolling */}
      <div className="category-section">
        <div className="section-header">
          <h2 className="section-title">Tops & t-shirts</h2>
          <a href="#" className="see-all-link">See all</a>
        </div>
        <div className="horizontal-items-container">
          {fashion.map(item => (
            <div className="horizontal-item-card" key={item.id}>
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-price">${item.price.toLocaleString()}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Housing Section - Horizontal Scrolling */}
      <div className="category-section">
        <div className="section-header">
          <h2 className="section-title">Housing</h2>
          <a href="#" className="see-all-link">See all</a>
        </div>
        <div className="horizontal-items-container">
          {housing.map(item => (
            <div className="horizontal-item-card" key={item.id}>
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-price">${item.price.toLocaleString()}</div>
                {item.location && <div className="item-location">{item.location}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Vehicles Section - Horizontal Scrolling */}
      <div className="category-section">
        <div className="section-header">
          <h2 className="section-title">Vehicles</h2>
          <a href="#" className="see-all-link">See all</a>
        </div>
        <div className="horizontal-items-container">
          {vehicles.map(item => (
            <div className="horizontal-item-card" key={item.id}>
              <div className="item-image">
                <img src={item.image} alt={item.name} />
              </div>
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="item-price">${item.price.toLocaleString()}</div>
                <div className="item-mileage">{item.mileage}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;