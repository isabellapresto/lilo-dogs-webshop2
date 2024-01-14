import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import About from '../../assets/carosel/about.png';
import Adopt from '../../assets/carosel/adopt.png';
import Donate from '../../assets/carosel/donate.png';

export default function PopularProducts() {
  return (
    <div id="carouselExample" className="carousel slide">
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img src={About} className="d-block w-100" alt="First slide" />
          <div className="carousel-caption d-flex align-items-center justify-content-center text-center text-white">
            <div className="d-flex flex-column align-items-center">
              <h3>Do you want to adopt a dog?</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est in laudantium officia quasi hic iure illo quo omnis voluptatibus facere perferendis beatae possimus alias odio, id delectus dolor! Doloribus, repudiandae.</p>
              <a href="#" className="mt-2 btn btn-outline-light" role="button">Shop Now</a>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={Adopt} className="d-block w-100" alt="Second slide" />
          <div className="carousel-caption d-flex align-items-center justify-content-center text-center text-white">
            <div className="d-flex flex-column align-items-center">
              <h3>Do you want to adopt a dog?</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est in laudantium officia quasi hic iure illo quo omnis voluptatibus facere perferendis beatae possimus alias odio, id delectus dolor! Doloribus, repudiandae.</p>
              <a href="#" className="mt-2 btn btn-outline-light" role="button">Shop Now</a>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img src={Donate} className="d-block w-100" alt="Third slide" />
          <div className="carousel-caption d-flex align-items-center justify-content-center text-center text-white">
            <div className="d-flex flex-column align-items-center">
              <h3>Do you want to adopt a dog?</h3>
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est in laudantium officia quasi hic iure illo quo omnis voluptatibus facere perferendis beatae possimus alias odio, id delectus dolor! Doloribus, repudiandae.</p>
              <a href="#" className=" btn btn-outline-light" role="button">Shop Now</a>
            </div>
          </div>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
