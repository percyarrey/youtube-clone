import React from "react";
import axios, { Axios } from 'axios';
import Cards from '../component/Cards';
import Wsugest from  '../component/Wordsuggestion';
/* IMPORT REACT SPINNERS */
import {Circles} from "react-loader-spinner";

//Fetch youtube data
    var fetching=false;
    var pagetoken;
    var Fquery;
export default function Homepage(props){
        const [myResponse,setmyResponse]=React.useState() 
        const [Query,setQuery]=React.useState("") 
        const limit = 10

        //SET QUERY 
        function Squery(fquery){
            if(fquery!=undefined){
              if(Fquery!=undefined){
                Fquery.target.classList.remove("myActive")
              }
              setmyResponse()
              setQuery(fquery.target.textContent) 
              fquery.target.classList.add("myActive")
              Fquery=fquery
            }   
        }



        React.useEffect(function(){
        axios.get("https://youtube.googleapis.com/youtube/v3/search",
        {params: {
            type:"video",
            part:'snippet',
            maxResults:limit,
            key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
            q:Query,
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
        /* .finally(()=>{
            fetching=false
        }) */
        }, [])
        //const Cards = Array.from({length:6}).map((_,i)=>(<Videocards key={i}/>))

        //ADD VIDEOS
        
        window.onscroll = function(ev) {
            if ((window.innerHeight + Math.ceil(window.pageYOffset)) >= document.body.offsetHeight) {
                if(myResponse!=undefined){
                    if(fetching==false){
                        fetching=true
                        axios.get("https://youtube.googleapis.com/youtube/v3/search",
                        {params: {
                            type:"video",
                            part:'snippet',
                            maxResults:limit,
                            key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
                            q:Query,
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
            <>
                {/* SUGGESTION */}
                <Wsugest theme={props.theme} Squery={Squery}/>
                    {/* CARDS */}
                <div className='container-fluid' id="scrollh">
                    <div className='row'>
                    
                    {myResponse!=undefined && typeof myResponse!="string" ?  myResponse.map(items=>{
                    return(
                        <div key={items.id.videoId}  className='col-12 col-sm-6 col-md-4 col-lg-3'>
                        <Cards videoid={items.id.videoId} video={items.snippet} theme={props.theme}/>
                        </div>
                    )
                    }) : <div style={{height:"60vh"}} className='w-100 d-flex justify-content-center align-items-center'>
                        {myResponse!=undefined? <div className='fw-bold'>{myResponse}</div> : <Circles color="gray" loading={true} size={150} aria-label="Loading Spinner" data-testid="loader"
                />}
                    </div>}
                    </div>
                </div>
                <div className="d-flex  justify-content-center align-items-center" style={{height:"5rem"}}>
                    {myResponse!=undefined && typeof myResponse!="string" && <Circles color="gray" loading={true} size={50} aria-label="Loading Spinner" data-testid="loader"
                />}
                </div>
            </>
        )
}