const HomePage = () => {

  const backgroundImageUrl = "url('../images/firstImageHome.png')";

  const HomePage = {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundImage: backgroundImageUrl,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: 'no-repeat',
    color: 'white',
    padding: "20px", // Add padding for smaller screens

  }
  const titleStyle = {
    fontSize: "80px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    textAlign: "center", // Center the title
    marginTop: '100px',
  };
  return (
    <div style={HomePage}>
      <h1 style={titleStyle}>Welcome to LinkdIron!</h1>
      
    </div>
   
  )
}

export default HomePage
