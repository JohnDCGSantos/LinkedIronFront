import { Link } from "react-router-dom";
import { useContext } from "react";                     // <== IMPORT 
import { AuthContext } from "../context/Auth.context"; 

const Navbar = () => {
    const { isLoggedIn,
        logOutUser              // <== UPDATE
      } = useContext(AuthContext);
    
    return ( 
        <>
        { isLoggedIn ? ( 
            <div className='userNavbar'>
            <Link to={'/Feed'}>Feed</Link>
            <Link to={'/Profile'}>Profile</Link>
            <Link to={'/Login'} onClick={logOutUser}>Logout</Link>

            </div>) : (
        <div className='authNavbar' style={{backgroundColor: "lightblue", display:"flex",flexDirection: "column"}}>
            <Link to={'/'}><img src='homepageIcon' alt='navImg' style={{width:'70px'}} /></Link>
            <Link to={'/Login'}>Login</Link>
            <Link to={'/Signup'}>Signup</Link>
            </div>
            )}
           
            
            </>
     );
}
 
export default Navbar;