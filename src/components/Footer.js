// FILE: src/components/Footer.jsx
const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="container">
        <div className="text-center">
          <p className="mb-1">
            &copy; {currentYear} National Scholarship Portal. All rights reserved.
          </p>
          <p className="mb-1">
            This is a demonstration application. Not affiliated with the official scholarships.gov.in
          </p>
          <p>
            For official scholarship portal, visit:{' '}
            <a 
              href="https://scholarships.gov.in" 
              target="_blank" 
              rel="noopener noreferrer"
              className="nav-link"
            >
              scholarships.gov.in
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;