import {FaListUl} from "react-icons/fa";
import axios from "axios";
import {BsListCheck,BsShare,BsThreeDots,BsFlag,BsCircleHalf,BsClockHistory} from "react-icons/bs";
import './styling.css';
import React from "react";
export default function Card(props) {
    const [duration,setduration]=React.useState("00:00:00")
    axios.get("https://youtube.googleapis.com/youtube/v3/videos",
    {params: {
    id:props.videoid,
    part:'contentDetails',
    key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
    }})
    .then(res=> setduration(res.data.items[0].contentDetails.duration.slice(2,30)))
        /* .then(function(response) {
          var duration = response.result.items[0].contentDetails.duration;
          var match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
      
          var hours = (parseInt(match[1]) || 0);
          var minutes = (parseInt(match[2]) || 0);
          var seconds = (parseInt(match[3]) || 0);
      
          return hours * 3600 + minutes * 60 + seconds;
        }); */
    console.log(duration)
    let title = props.video.title.slice(0,30) +"...";
    return(
        <div className={props.cardclass+" d-flex justify-content-center"}>
            <div style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} className="card border-0 mycard rounded-4">
            <div className="d-flex justify-content-center">
                <img alt=""height={202.49} width={"100%"} src={props.video.thumbnails.medium.url}/>            
            </div>
            <div className="d-flex align-items-end position-relative justify-content-end" style={{left:"-0.3rem",top:"-0.2rem",height:"0rem"}}>
                    <nobr className="bg-black px-1 text-white rounded-1"><small>{duration}</small></nobr>
            </div>  
            <div className="card-body  mycard-body py-1 ps-1">
                <div className="row mt-1">
                    <div className="col-2 d-flex justify-content-center">
                        <img alt="" className="ms-2 rounded-circle" style={{width:"2.8rem",height:"2.8rem"}} src={props.video.thumbnails.high.url} />
                    </div>
                    <div className="col-10">
                        <div className="row">
                            <div className="col-10">
                                <p className="fw-bold mb-1" style={{lineHeight:1,fontFamily:"Roboto"}}>{title}</p>
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
                                <small className="fs-6 text-muted">{props.video.channelTitle}</small><br></br>
                                <small className="fs-6 text-muted"><span>92k</span>Views<span> 4 months ago</span></small>
                            </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}