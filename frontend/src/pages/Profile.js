import React, { useContext } from "react";
import ToastContext from "../context/ToastContext";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../assets/profile.jpg";

function Profile() {
  const { toast } = useContext(ToastContext);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  // Function to handle user logout
  const handleLogout = () => {
    setUser(null);
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/login", { replace: true });
  };

   // Inline styles for background and text
  const bgStyle = {
    backgroundColor: '#f0f0f0', 
    color: '#333', 
  };

  const textStyle = {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '1.2rem', 
    fontWeight: '700', 
    textAlign: 'center', 
    color: '#000C66', 
    letterSpacing: '0.05em', 
  };

  return (
    <div className='container py-5' style={bgStyle}>
      <div className='row justify-content-center'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <div className='d-flex justify-content-center align-items-center mb-3'>
                <img
                  src={ProfilePic}
                  alt='Profile'
                  className='img-fluid rounded-circle w-50 h-50'
                />
              </div>
              <h2 className='card-title mb-3' style={textStyle}>John Doe</h2>
              <div className='mb-3' style={textStyle}>
                <strong>Address:</strong> 123 Main Street, City, Country
              </div>
              <div className='mb-3' style={textStyle}>
                <strong>Contact No:</strong> +1234567890
              </div>
              <div className='mb-3' style={textStyle}>
                <strong>Email:</strong> john@example.com
              </div>
              <div className='d-flex justify-content-end'>
                <button className='btn btn-danger' onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
