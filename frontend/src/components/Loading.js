import React from "react";

//Loading functional component
const Loading = ({ text }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <div>
        <div className='spinner-border text-primary' role='status'></div>
        <span className='sr-only'>{text}...</span>
      </div>
    </div>
  );
};
// Export the Loading component as the default export
export default Loading;
