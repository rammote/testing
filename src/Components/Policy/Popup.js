import React from "react";
import './style.css'; 

const Popup = props => {
  return (
    <div style={{paddingTop: '100px'}}>
        <div className="popup-box">
            <div className="box">
                <span className="close-icon" onClick={props.handleClose}>x</span>
                {props.content}
            </div>
        </div>
    </div>
  );
};
 
export default Popup;