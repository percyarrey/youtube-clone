import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Scard from "../component/Scard";
import { BsFilter} from "react-icons/bs";
import { TailSpin } from "react-loader-spinner";

var fetching=false;
var pagetoken;
export default function Searchpage(props) {
    const [myResponse,setmyResponse]=React.useState() 
    const { query } = useParams()
    const limit = 10
    React.useEffect(function(){
        setmyResponse()
        axios.get("https://youtube.googleapis.com/youtube/v3/search",
        {params: {
            type:"video",
            part:'snippet',
            maxResults:limit,
            key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
            q:query,
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
    }, [query])



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
                        q:query,
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
            <div className="row justify-content-center align-items-center g-2">
                <div className="col"></div>
                <div className="col-12 fw-bold col-sm-11 col-md-11 col-lg-10">
                    <div className="dropdown open">
                        <button className="btn dropdown-toggle" type="button" id="triggerId" data-bs-toggle="dropdown" aria-haspopup="true"
                                aria-expanded="false">
                                   <BsFilter/> Filter
                                </button>
                        <div className="dropdown-menu" aria-labelledby="triggerId">
                            <button className="dropdown-item" href="#">Action</button>
                            <button className="dropdown-item disabled" href="#">Disabled action</button>
                        </div>
                    </div>
                    <hr className=" text-primary mt-0"></hr>
                </div>
            </div>
               {/* Scard */}
               <div className='container-fluid'>
                    <div className='row'>
                    
                    {myResponse!=undefined && typeof myResponse!="string" ?  myResponse.map(items=>{
                    return(
                        <Scard  key={items.id.videoId} videoid={items.id.videoId} video={items.snippet} theme={props.theme}/>
                    )
                    }) : <div style={{height:"60vh"}} className='w-100 d-flex justify-content-center align-items-center'>
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