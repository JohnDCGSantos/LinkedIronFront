const HomePage = () => {

  const backgroundImageUrl = "url('../images/firstImageHome.png')";

  const HomePage = {
    display: "flex",
    flexDirection: 'column',
    alignItems: "center",
    color: 'white',
    padding: "20px", // Add padding for smaller screens

  }
  const backgroundContainerStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundImage: backgroundImageUrl,
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: 'hidden',
  };
  const titleStyle = {
    position: 'absolute',
    fontSize: "80px",
    fontWeight: "bold",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
    textAlign: "center", // Center the title
    marginTop: '100px',
  };
  return (
    <div style={HomePage}>
      <div style={backgroundContainerStyle}></div>
      <h1 style={titleStyle}>Welcome to LinkdIron!</h1>
      
    </div>
   
  )
}

export default HomePage
