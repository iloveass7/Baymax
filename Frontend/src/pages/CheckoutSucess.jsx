import { Link } from "react-router-dom";

const CheckoutSucess = () => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f9f9f9",
    fontFamily: "'Arial', sans-serif",
    textAlign: "center",
    padding: "20px"
  };

  const headingStyle = {
    color: "#4caf50",
    fontSize: "2.5em",
    marginBottom: "20px"
  };

  const paragraphStyle = {
    fontSize: "1.2em",
    marginBottom: "30px"
  };

  const linkStyle = {
    display: "inline-block",
    padding: "10px 20px",
    backgroundColor: "#4caf50",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "5px",
    transition: "background-color 0.3s ease"
  };

  const linkHoverStyle = {
    backgroundColor: "#45a049"
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Checkout Successful!</h1>
      <p style={paragraphStyle}>
        Your appointment has been fixed. 
      </p>
      <Link 
        to="/" 
        style={linkStyle} 
        onMouseOver={(e) => e.target.style.backgroundColor = linkHoverStyle.backgroundColor} 
        onMouseOut={(e) => e.target.style.backgroundColor = linkStyle.backgroundColor}
      >
        Back to Homepage
      </Link>
    </div>
  );
};

export default CheckoutSucess;
