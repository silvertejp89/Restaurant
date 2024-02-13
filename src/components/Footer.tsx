import "/LAK/the-restaurant-ls-aw-ks/src/Style/Footer.css"
export function Footer() {
  return (
    <>
    <div className="footerFooter">
      <div>
        <h3>Contact Us</h3>
        <p>Ölgatan 39</p>
        <p>Phone: (073) 788-0987</p>
        <p>Email: info@LAK.com</p>
      </div>
      <div>
        <h3>Follow Us</h3>
        
        <a
          href="https://facebook.com/restaurant"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
       
        <a
          href="https://instagram.com/restaurant"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a
          href="https://x.com/restaurant"
          target="_blank"
          rel="noopener noreferrer"
        >
          X
        </a>
      </div>
      <div>
        <p>&copy; LAK</p>
      </div>
    </div>
    </>
  );
}
