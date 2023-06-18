import axios from "axios";
import React from "react";
import {useParams} from "react-router-dom"
import '../component/styling.css';

import { BsCircleHalf, BsClockHistory, BsFlag, BsListCheck, BsShare, BsThreeDots} from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import Watchsuggestion from "../component/Watchsuggestion";

export default function Playvideopage(props) {
    const {videoid} = useParams()
    const [ago,setago]=React.useState("loading...")
    const [vcount,setvcount]=React.useState("loading...")
    const [myResponse,setmyResponse]=React.useState()
    const videosrc = `https://www.youtube.com/embed/${videoid}`
    React.useEffect(function(){
        setago("loading...")
        setvcount("loading...")
        setmyResponse()
        axios.get("https://youtube.googleapis.com/youtube/v3/search",
        {params: {
            type:"video",
            part:'snippet',
            maxResults:1,
            key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
            q:videoid,

        }})
        .then(res=>{
            console.clear()
            console.log(res.data.items[0].snippet)
            setmyResponse(res.data.items[0].snippet)

        })
        .catch(res=>setmyResponse())
    }, [videoid])
    if(myResponse!=undefined){
        axios.get("https://youtube.googleapis.com/youtube/v3/videos",
        {params: {
        id:videoid,
        part:'contentDetails',
        key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
        }}).then(res=>{
            const publishedDate = new Date(myResponse.publishedAt);
            const currentDate = new Date();
            const diffTime = Math.abs(currentDate - publishedDate);
            var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            if(diffDays>=31){
                const newDays=Math.floor(diffDays/31)
                if(newDays>=12){
                    diffDays=Math.floor(newDays/12)  +"Years ago"
                }else{
                    diffDays=Math.floor(diffDays/31) +" Month ago"
                }
                
            }else{
                diffDays=diffDays +" Days ago"
            }
            setago(diffDays)

        });
        axios.get('https://www.googleapis.com/youtube/v3/videos', {
        params: {
            part: 'statistics',
            id:videoid,
            key: 'AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM'
        }
        })
        .then((response) => {
            var vcountdata = response.data.items[0].statistics.viewCount
            if(vcountdata>=1000){
                if(vcountdata>=100000){
                    vcountdata=Math.floor(vcountdata/100000)  +"M"
                }else{
                    vcountdata=Math.floor(vcountdata/1000) +"K"
                }
                
            }else{
                vcountdata=vcountdata +""
            }
            setvcount(vcountdata)
        })
    }
     
    return(
        <div className=" overflow-hidden container-fluid">
            <div className="row mt-4">
                <div className="col-12 col-lg-8">
                    <iframe style={{borderRadius:"1%",minHeight:"60vh"}} frameBorder={"0"} width={"100%"} title="Video Player" src={videosrc}/>
                    <div className="fw-bold fs-5">
                        {myResponse!=undefined ? myResponse.title :"Loading"}
                    </div>
                    <div className="d-flex mt-1 justify-content-between">
                        <div>
                            <img alt="" className="ms-2 rounded-circle" style={{width:"2.8rem",height:"2.8rem"}} src={myResponse!=undefined ? myResponse.thumbnails.high.url :"none"} />
                            <span className="fw-bold">{myResponse!=undefined ? myResponse.channelTitle :"Loading"}</span>
                            <a href="www.youtube.com" target="_blank" className="btn ms-2 rounded-pill" style={{backgroundColor:`${props.theme.text}`,color:`${props.theme.bg}`}}>Subscribe</a>
                        </div>
                        <div>
                            <a href="www.youtube.com" target="_blank" className="btn me-2 rounded-pill" style={{border:`1px solid ${props.theme.text}`,color:`${props.theme.text}`,backgroundColor:`${props.theme.bg}`}}><BsShare  color={props.theme.text} size={23}/> Share</a>

                            <span className="dropdown">
                            <button style={{border:`1px solid ${props.theme.text}`}}  className="rounded-circle bg-transparent m-0 myico
                                    "type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <BsThreeDots size={23} color={props.theme.text}/>
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
                            </span>
                        </div>
                    </div>
                    <div  className="p-2 rounded-2" style={{backgroundColor:`${props.theme.text=="black"?"rgb(0,0,0,0.2)":"rgb(255,255,255,0.1)"}`}}>
                        <div className="d-flex g-3 gap-3">
                        <small className="fs-6 text-muted"><span>{vcount}</span> Views<span> {ago}</span></small>
                        </div>
                        <div>
                        {myResponse!=undefined ? myResponse.description :"Loading"}
                        </div>
                    </div>
                </div>
                <div className="col">
                    <Watchsuggestion videoid={videoid}/>
                </div>
            </div>

        </div>
    )
}