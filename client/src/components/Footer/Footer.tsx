import { BsInstagram } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#e8e4d5', color: '#5b5540' }} className="py-4">
      <div className="container">
        <div className="row">

          {/*Contact */}
          <div className="col-md-4 mb-4">
            <p>Contact</p>
            <p className='footer-text'>info@lilodogs.com <br />+34 691 905 892</p>
          </div>

          {/* Tracking */}
          <div className="col-md-4 mb-4">
            <p>Tracking</p>
            <a style={{ color: '#403C99', fontWeight: "bold" }} href="#">Track your package</a>
          </div>

          {/*Follow us on Instagram */}
          <div className="col-md-4 mb-4">
            <p>Follow us</p>
            <a href="#" className="text-muted me-3" title="Instagram">
              <BsInstagram size={24} />
            </a>
          </div>

        </div>

        {/* New div with centered p tag */}
        <div className="row">
          <div className="col-md-12 text-center">
            <p className='lilo-dogs'>© LiloDogs</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
