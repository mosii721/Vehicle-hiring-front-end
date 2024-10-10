
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'

function Footer() {
  return (
    <>
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4">Follow Us</h2>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="https://www.facebook.com" className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faFacebookF} className="h-6 w-6" />
          </a>
          <a href="https://www.instagram.com" className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faInstagram} className="h-6 w-6" />
          </a>
          <a href="https://www.twitter.com" className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faTwitter} className="h-6 w-6" />
          </a>
          <a href="https://www.linkedin.com" className="text-gray-400 hover:text-white">
            <FontAwesomeIcon icon={faLinkedinIn} className="h-6 w-6" />
          </a>
        </div>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} MobilityEnt. All rights reserved.
        </p>
      </div>
    </footer>
    </>
  )
}

export default Footer