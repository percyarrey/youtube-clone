import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Scard from "./Scard";
import { BsFilter} from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";

var fetching=false;
var pagetoken;
export default function Watchsuggestion(props) {
    const [myResponse,setmyResponse]=React.useState()
    const limit = 10
    React.useEffect(function(){
        setmyResponse()
        axios.get("https://youtube.googleapis.com/youtube/v3/search",
        {params: {
            type:"video",
            part:'snippet',
            maxResults:limit,
            key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
            relatedToVideoId:props.videoid,
            pageToken:pagetoken,
            nextPageToken:pagetoken,

        }})
        .then(res=>{
            if(pagetoken===undefined){
                pagetoken=res.data.nextPageToken
            }

            setmyResponse((prev)=>{
                return(res.data.items)
            })

        })
        .catch(res=>setmyResponse(res.message))
    }, [props.videoid])


    //ADD VIDEOS
        
    window.onscroll = function(ev) {
        if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
            if(myResponse!=undefined){
                if(fetching==false){
                    console.log(pagetoken)
                    fetching=true
                    axios.get("https://youtube.googleapis.com/youtube/v3/search",
                    {params: {
                        type:"video",
                        part:'snippet',
                        maxResults:limit,
                        key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
                        relatedToVideoId:props.videoid,
                        pageToken:pagetoken,
                        nextPageToken:pagetoken,
                    }})
                    .then(res=>{
                        if(pagetoken===undefined){
                            pagetoken=res.data.nextPageToken
                        }
                        
                        setmyResponse((prev)=>{
                            if(prev!=undefined){
                                prev=[...prev,...res.data.items]
                                return(prev)
                            }else{
                                return(res.data.items)
                            }
                        })

                    })
                    .catch(res=>setmyResponse(res.message))
                    .finally(()=>{
                        if(pagetoken!=""){
                            setTimeout(() => {
                                fetching=false
                            }, 1000);
                        }
                    })
                }
            }
        }
    };
    return(
        <div>
               <div className="fw-bold fs-4">
                  Related Videos;  
               </div>
               <hr className="m-0"/>
               {/* Scard */}
               <div className='mt-4 container-fluid'>
                    <div className='row'>
                    
                    {myResponse!=undefined && typeof myResponse!="string" ?  myResponse.map(items=>{
                    return(
                        <Scard  key={items.id.videoId} vclass={"col-12"} videoid={items.id.videoId} video={items.snippet} theme={props.theme}/>
                    )
                    }) : <div style={{height:"10vh"}} className='w-100 d-flex justify-content-center align-items-center'>
                        {myResponse!=undefined? <div className='fw-bold'>{myResponse}</div> : <TailSpin color="gray" loading={true} size={150} aria-label="Loading Spinner" data-testid="loader"
                />}
                    </div>}
                    </div>
                </div>
                <div className="d-flex  justify-content-center align-items-center" style={{height:"5rem"}}>
                    {myResponse!=undefined && typeof myResponse!="string" && <TailSpin color="gray" loading={true} size={50} aria-label="Loading Spinner" data-testid="loader"
                />}
                </div>
        </div>
    )
}