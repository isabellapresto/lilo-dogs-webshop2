import walk from '../../assets/categorys/walk.png';
import play from '../../assets/categorys/play.png';
import sleep from '../../assets/categorys/sleep2.webp';
import "../Categories/Categories.css";
import { Link } from 'react-router-dom';

export default function Categories() {
  return (

      <div className="container-custom my-4">
        <div className="row">
          <div className="col-12 col-sm-4 mb-4">
            <div className="categories-image-container">
            <Link to="/category/sleep">
                <img
                  src={sleep}
                  alt="Beds"
                  className="img-fluid pb-3 categories-section-thumbnail"
                />
              </Link>
              <div className="categories-overlay"><h2>SLEEP</h2></div>
            </div>
          </div>

          <div className="col-12 col-sm-4 mb-4">
            <div className="categories-image-container">
            <Link to="/category/walk">
              <img
                src={walk}
                alt="Leashes"
                className="img-fluid pb-2 categories-section-thumbnail" 
              />
            </Link>
              <div className="categories-overlay"><h2>WALK</h2></div>
            </div>
          </div>

          <div className="col-12 col-sm-4 mb-4">
            <div className="categories-image-container">
            <Link to="/category/play">
              <img
                src={play}
                alt="Toys"
                className="img-fluid pb-2 categories-section-thumbnail" 
              />
            </Link>
              <div className="categories-overlay"><h2>PLAY</h2></div>
            </div>
          </div>
 
          <div className="col-12 text-center">
            <Link to="/products" >
              VIEW ALL PRODUCTS
            </Link>
          </div>
      </div>
    </div>
 );
}
