import "../BestSellers/BestSellers.css";
import trampliny from '../../assets/sleep/trampliny.webp';
import trampliny2 from '../../assets/sleep/trampliny2.webp'
import herring from "../../assets/walk/herring.png"
import herring2 from "../../assets/walk/herring2.png"
import cloud from "../../assets/sleep/cloud.webp"
import cloud2 from "../../assets/sleep/cloud2.webp"
import chew from "../../assets/play/chew.webp"
import chew2 from "../../assets/play/chew2.webp"



export default function BestSellers() {
  return (
    <div>
      <section className="custom-bg-color py-4">
        <div className="container-custom my-4">
          
          <h5 className="text-center mb-4 bestseller">MEET OUR SEASON BESTSELLERS</h5>
          <div className="row">

            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div className="image-container">
                <img src={trampliny} alt="Leashes" className="mb-4 img-fluid" />
                <img src={trampliny2} alt="NewImage" className="mb-4 img-fluid hover-image" />
              </div>
              <p className="text-center dog-bed">DOG BED TRAMPLINY<br />
              <span>★★★★★</span><br />
              € 230</p>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div className="image-container">
                <img src={herring} alt="Toys" className="mb-4 img-fluid" />
                <img src={herring2} alt="NewImage" className="mb-4 img-fluid hover-image" />
              </div>
              <p className="text-center dog-bed">DOG COLLAR HERRING<br />
              <span>★★★★★</span><br />
              € 65</p>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div className="image-container">
                <img src={cloud} alt="Beds" className="mb-4 img-fluid" />
                <img src={cloud2} alt="NewImage" className="mb-4 img-fluid hover-image" />
              </div>
              <p className="text-center dog-bed">DOG BED CLOUD<br />
              <span>★★★★★</span><br />
              € 165</p>
            </div>

            <div className="col-12 col-sm-6 col-md-3 mb-4">
              <div className="image-container">
                <img src={chew} alt="NewImage" className="mb-4 img-fluid" />
                <img src={chew2} alt="Leashes" className="mb-4 img-fluid hover-image" />
              </div>
              <p className="text-center dog-bed">DOG TOY CHEW<br />
              <span>★★★★★</span><br />
              € 15</p>
            </div>

          </div>

          <div className="text-center">
            {/* <Link to="/all-products" className="align-middle text-center btn-steps mt-2 btn btn-lg btn-outline-dark" role="button">
              View All Collection
            </Link> */}
          </div>
        </div>
      </section>
    </div>
  );
}


