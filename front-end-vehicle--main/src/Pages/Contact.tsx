
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faInstagram, faTwitter, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'


function Contact() {
  return (
    <>
    <div className=" flex items-center justify-center min-h-screen">
      <div className="p-6 bg-gray-800 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
        <p className="mb-2">
          You can contact us at{' '}
          <a href="mailto:contact@carhomepage.com" className="text-blue-600 hover:underline">
            contact@mobility.com
          </a>
        </p>
        <p className="mb-2">
          Phone:{' '}
          <a href="tel:0733333333" className="text-blue-600 hover:underline">
            0733333333
          </a>
        </p>
        <p className="mb-2">Follow us on social media:</p>
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
      </div>
    </div></>
  )
}

export default Contact