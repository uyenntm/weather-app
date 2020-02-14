import React from "react";
const Error = ({error})=>{
    return (
        <div className="error alert alert-danger">{error}</div>
    );

}

export default Error;