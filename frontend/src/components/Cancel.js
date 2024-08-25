import React from "react";
import { Cancel as CancelIcon } from "@mui/icons-material";
import "./Cancel.css";

//cancel functional component
function Cancel() {
  return (
    <div className='cancel-container'>
      <div className='cancel-content'>
        <img
          src='https://cdn.dribbble.com/users/251873/screenshots/9288094/13539-sign-for-error-or-explanation-alert.gif'
          alt='cancel'
          className='cancel-icon'
        />
        <h1 className='cancel-heading'>
          Sorry to see you cancelled your Stripe payment!
        </h1>
        <p className='cancel-message'>
          If you have any questions or concerns, please feel free to contact us.
        </p>
      </div>
    </div>
  );
}

// Export the Cancel component as the default export
export default Cancel;
