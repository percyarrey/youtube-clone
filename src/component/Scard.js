import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Scard(props) {
    let title = props.video.title.slice(0,30) +"...";
    let description = props.video.description.slice(0,40) +"...";
    const [duration,setduration]=React.useState("00:00:00")
    const [ago,setago]=React.useState("loading...")
    const [vcount,setvcount]=React.useState("loading...")
    /* NAVIGATION */
    const navigate = useNavigate()
    /* ON VIDEO SELECT */
    function Videoselected() {
        navigate("/watch/"+props.videoid)
    }


    axios.get("https://youtube.googleapis.com/youtube/v3/videos",
    {params: {
    id:props.videoid,
    part:'contentDetails',
    key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
    }}).then(res=>{
        
        var dur = res.data.items[0].contentDetails.duration;
        var match = dur.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
        var hours = (parseInt(match[1]) || 0);
        var minutes = (parseInt(match[2]) || 0);
        var seconds = (parseInt(match[3]) || 0);
        setduration(hours +":"+minutes+":"+seconds)
        const publishedDate = new Date(props.video.publishedAt);
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
        id:props.videoid,
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


    return(
        <div className="row justify-content-center align-items-center g-2">
        <div className="col"></div>
        <div className={props.vclass!=undefined ? "col-12" :"col-12 col-sm-11 col-md-11 col-lg-10"}>
            <div  onClick={Videoselected} className="row  mycard w-100" >
                <div className={props.vclass!=undefined ? "col-12 col-sm-5 col-md-4 col-lg-5":"col-12 col-sm-5 col-md-4 col-lg-4"}>
                    <img alt=""height={202.49} width={"100%"} src={props.video.thumbnails.medium.url} /> 
                    <div className="d-flex align-items-end position-relative justify-content-end" style={{left:"-0.3rem",top:"-0.2rem",height:"0rem"}}>
                    <nobr className="bg-black px-1 text-white rounded-1"><small>{duration}</small></nobr>
                </div>
                </div> 
                <div className="mt-2 mt-sm-0 col">
                    <div className="d-flex overflow-hidden fw-bold"  style={{lineHeight:1,fontFamily:"Roboto"}}>{title}</div>
                    <div className="d-flex mt-1"><small><span>{vcount} views -</span><span>{ago}</span></small></div>
                    <div className="d-flex gap-3">
                        <div className=" mt-1">
                        <img alt="" className="ms-2 rounded-circle" style={{width:"2.8rem",height:"2.8rem"}} src={props.video.thumbnails.medium.url} />
                        </div>
                        <div className="d-flex align-items-center fw-bold">{props.video.channelTitle}</div>
                    </div>
                    <div className="text-muted fs-5 "><small>{description}</small></div>
                </div>
            </div>
            </div>
        </div>
        
    )
}