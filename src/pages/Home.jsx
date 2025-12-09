// FILE: src/pages/Home.jsx
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">

      {/* Simple Hero Section */}
      <section 
        className="hero-section text-center"
        style={{ padding: "4rem 1rem" }}
      >
        <h1 className="mb-3" style={{ color: "var(--primary)" }}>
          Apply Now for Scholarship
        </h1>

        <p 
          className="text-muted "
          style={{ maxWidth: "700px", margin: "0 auto", fontSize: "1.1rem" }}
        >
          The National Scholarship Portal provides financial assistance to 
          eligible students across India. Apply easily and track your 
          scholarship application online.
        </p>

        <Link
          to="/apply"
          className="btn mt-4"
          style={{
            padding: "0.9rem 2.5rem",
            fontSize: "1.15rem",
            backgroundColor: "var(--primary)",
            color: "white"
          }}
        >
          Apply Now
        </Link>
      </section>

    </div>
  );
};

export default Home;
