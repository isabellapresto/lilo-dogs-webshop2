import { BsInstagram } from 'react-icons/bs';
import "./Footer.css"

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#e8e4d5', color: '#5b5540' }} className="py-4">
      <div className="container">
        <div className="row">

          {/* Contact */}
          <div className="col-md-4 mb-4">
            <p style={{ fontWeight: 'bold' }}>Contact</p>
            <p style={{ fontSize: "11px" }} className='footer-text'>info@lilodogs.com <br />+34 691 905 892</p>
          </div>

          {/* Tracking */}
          <div className="col-md-4 mb-4">
            <p style={{ fontWeight: 'bold' }}>Tracking</p>
            <a className='footer-text' style={{  fontSize: "11px", color: '#AB8262', fontWeight: "bold" }} href="#">Track your package</a>
          </div>

          {/* Follow us on Instagram */}
          <div className="col-md-4 mb-4">
            <p style={{ fontWeight: 'bold' }}>Follow us</p>
            <a style={{ fontSize: "11px" }}  href="#" className="text-muted me-3" title="Instagram">
              <BsInstagram size={24} />
            </a>
          </div>

        </div>

        {/* New div with centered p tag */}
        <div className="row">
          <div className="col-md-12 text-center">
            <p style={{ fontSize: "11px" }}  className='footer-text'>© LiloDogs</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
