import "../../Styles/Footer/Footer.css";

export function Footer() {
  // const contactInfo = {
  //   address: "Ölgatan 39",
  //   phone: "(073) 788-0987",
  //   email: "info@LAK.com",
  // };

  const socialLinks = [
    { name: "Facebook", url: "https://facebook.com/restaurant" },
    { name: "Instagram", url: "https://instagram.com/restaurant" },
    { name: "X", url: "https://x.com/restaurant" },
  ];

  return (
    <div className="footerFooter">
      {/* <div className="footerDiv">
        <h3>Contact Us</h3>
        <p>{contactInfo.address}</p>
        <p className="pPhone">Phone: {contactInfo.phone}</p>
        <p className="pMail">Email: {contactInfo.email}</p>
      </div> */}
      <div className="footerDiv">
        <h3 id="Follow">Follow Us</h3>
        {socialLinks.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {link.name}
          </a>
        ))}
      </div>
      {/* <div className="footerDiv">
        <p>© LAK</p>
      </div> */}
    </div>
  );
}
