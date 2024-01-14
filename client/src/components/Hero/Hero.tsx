import 'bootstrap/dist/css/bootstrap.min.css';
import HeroVideo from '../../assets/hero-video.mp4';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      
      <video playsInline autoPlay loop muted className="hero__video">
        <source src={HeroVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="hero__content h-100 container-custom position-relative">
        <div className="d-flex h-100 align-items-center hero__content-width">
          <div className="text-white" >
            <h2 className="hero__heading fw-bold mb-4" >Dog Supplies For Happy Healthy Doggos.</h2>
            <p className="lead mb-4" >Check out our collection of harnesses, leashes, toys, dog beds and more!</p>
            <a href="#" className="mt-2 btn btn-lg btn-outline-light" role="button" >View All</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Lägg till style={{ color: '#FEF9EA' }} ?