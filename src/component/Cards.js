import {FaListUl} from "react-icons/fa";
import {BsListCheck,BsShare,BsThreeDots,BsFlag,BsCircleHalf,BsClockHistory} from "react-icons/bs";
import './styling.css';
export default function Card(props) {
    return(
        <div className={props.cardclass+" d-flex justify-content-center"}>
            <div style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} className="card border-0 mycard rounded-4">
            <div className="d-flex justify-content-center">
                <img alt=""height={202.49} width={"100%"} src="images/img.jpg"/>            
            </div>
            <div className="d-flex align-items-end position-relative justify-content-end" style={{left:"-0.3rem",top:"-0.2rem",height:"0rem"}}>
                    <nobr className="bg-black px-1 text-white rounded-1"> 1:00:00 </nobr>
            </div>  
            <div className="card-body  mycard-body py-1 ps-1">
                <div className="row mt-1">
                    <div className="col-2 d-flex justify-content-center">
                        <img alt="" className="ms-2 rounded-circle" style={{width:"2.8rem",height:"2.8rem"}} src="images/thumbnail.jpg" />
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-10">
                                <p className="fw-bold mb-1" style={{lineHeight:1,fontFamily:"Roboto"}}>How to Make line follower with avoiding robot using arduino...</p>
                            </div>
                            
                            <div className="dropdown col-2">
                            <button title="Setting" className="btn p-1 d-flex border-0 m-0 myico
                                    "type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <BsThreeDots color={props.theme.text}/>
                                    </button>
                                    <div style={{width:"13rem", left:"-5rem",backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} className="dropdown-menu" aria-labelledby="dropdownMenuButton"  >
                                    <a className="btn" style={{color:`${props.theme.text}`}} target="_blank" rel="noreferrer" href="https://www.youtube.com/"><BsListCheck color={props.theme.text}/> Add to queue</a>
                                    <a className="btn" style={{color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/"><BsClockHistory color={props.theme.text}/> Save to Watch layer</a>
                                    <a className="btn" style={{color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/"><FaListUl color={props.theme.text}/> Save to playlist</a>
                                    <a className="btn" style={{color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/"><BsShare color={props.theme.text}/> Share</a>
                                    <hr/>
                                    <a className="btn" style={{color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/"><BsCircleHalf color={props.theme.text}/> Don't recommend</a>
                                    <a className="btn" style={{color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/"><BsFlag color={props.theme.text}/> Report</a>
                                    </div>
                                </div>
                        </div>
                        <div className="col-10"> 
                                <small className="fs-6 text-muted">Muhammed Ansar</small><br></br>
                                <small className="fs-6 text-muted"><span>92k</span>Views<span> 4 months ago</span></small>
                            </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}