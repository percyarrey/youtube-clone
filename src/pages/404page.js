import React from "react";
import {Link} from "react-router-dom"
export default function Errorpage(params) {
    return(
        <div className="w-100 d-flex align-items-center justify-content-center" style={{height:"60vh"}}>
            <div>
                <div className=" display-1 fw-bold">
                    404<br/>
                </div>
                <div>
                    <Link to="/" className="btn btn-primary mt-3">Back home</Link>
                </div>
            </div>
        </div>
    )
}