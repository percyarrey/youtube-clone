import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import '../component/styling.css'
import axios from "axios";
import { Circles } from "react-loader-spinner";
//Fetch youtube data
var fetching=false;
var pagetoken;
export default function Shortspage(props){
    const [myResponse,setmyResponse]=React.useState() 
    React.useEffect(()=>{
        if(fetching==false){
            fetching=true
            axios.get("https://youtube.googleapis.com/youtube/v3/search",
            {params: {
                type:"video",
                part:'snippet',
                maxResults:3,
                key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
                q:"",
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
                    }, 500);
                }
            })
        }
    },[])
    function slidechange(e) {
        if(fetching==false){
            fetching=true
            axios.get("https://youtube.googleapis.com/youtube/v3/search",
            {params: {
                type:"video",
                part:'snippet',
                maxResults:3,
                key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
                q:"",
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
                    }, 500);
                }
            })
        }
    }
    {/*  */}
    return(
        <div className="d-flex h-100 container-fluid">
            <div className="row  w-100 justify-content-center">
                <div className="col-12 h-100 d-flex  justify-content-center col-sm-9 col-md-6 col-lg-10" style={{maxWidth:"370px"}}>
                    <Swiper
                    className="w-100"
                    style={{height:"90vh",position:"relative"}}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    navigation
                    mousewheel={true}
                    spaceBetween={0}
                    keyboard={{enabled:true}}
                    slidesPerView={1.2}
                    direction="vertical"
                    onSlideChange={slidechange}
                    >
                        {myResponse!=undefined && typeof myResponse!="string" ?  myResponse.map((items,index)=>{
                            return(
                                <SwiperSlide key={index} className="pt-5"><iframe className=" rounded-3" height={"100%"} frameBorder={"0"} width={"100%"} title="Video Player" src={`https://www.youtube.com/embed/${items.id.videoId}`}/></SwiperSlide>
                            )
                            }) : <div style={{height:"60vh"}} className='w-100 d-flex justify-content-center align-items-center'>
                                {myResponse!=undefined? <div className='fw-bold'>{myResponse}</div> : <Circles color="gray" loading={true} size={150} aria-label="Loading Spinner" data-testid="loader"
                        />}
                            </div>}
                    </Swiper>
                </div>
            </div>
            
        </div>
    )
}