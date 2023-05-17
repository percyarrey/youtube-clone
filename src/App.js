import './App.css';
import React from 'react';
import axios, { Axios } from 'axios';

/* COMPONENT IMPORT */
import Navbar from './component/Navbar';
import Videocards from './component/Videocards';
import Wsugest from  './component/Wordsuggestion';
import MenuExpand  from './component/MenuExpand';

/* ICONS IMPORT */
import { FaHome} from "react-icons/fa";
import { BsPlayBtn,BsBook,BsReplyAll} from "react-icons/bs";


function App() {

  //Fetch youtube data
  const [myResponse,setmyResponse]=React.useState() 
  React.useEffect(function(){
    axios.get("https://youtube.googleapis.com/youtube/v3/search",
    {params: {
      type:"video",
      part:'snippet',
      maxResults:10,
      key:"AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM",
      q:"tomb raider"
    }})
    .then(res=> setmyResponse(()=>{return (res.data)}))

    /* async function myfxn(){
      var res = await fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCpqXJOEqGS-TCnazcHCo0rA&maxResults=300&order=date&safeSearch=moderate&key=AIzaSyAeRR86QzkwzWDmm_8eB68NZc88DRkjTEM")
          .then(res=> res.json())
          .then(res=>setmyResponse(()=>{return (res)}))
          .catch()
    }
    myfxn() */
  }, [])
  //const Cards = Array.from({length:6}).map((_,i)=>(<Videocards key={i}/>))
  //Theme Toggle
  const [theme,settheme] = React.useState({
      bg:"#fff",
      text:"black"
  })
  function Changetheme(){
    if(theme.bg=="#fff"){
      settheme(()=>({
        bg:"#0F0F0F",
        text:"White"
      }))
      return;
    }
    else{
      settheme(()=>({
        bg:"#fff",
        text:"black"
      }))
    }
  }
  
  //MAIN MENU CONTROL
    var myMenu = React.useRef(null)
    var menuAnimate = React.useRef(null)
    const [lgmenu,setlgmenu] = React.useState("")
    function PopMainmenu(){
      if(window.innerWidth<576){
        if(myMenu!=null){
          myMenu.current.classList.remove("d-none")
          if(menuAnimate!=null){
            menuAnimate.current.style.animation = "popin 0.25s  ease-in"
          }
        }
      }
      else if(lgmenu==="d-flex align-items-center gap-1"){
        setlgmenu(()=>(""))
      }
      else{
        setlgmenu(()=>("d-flex align-items-center gap-1"))
      }
    }

    function PopoutMainmenu(){
      if(myMenu!=null){
        if(menuAnimate!=null){
          menuAnimate.current.style.animation = "popout 0.2s  ease-in"
        }
        setTimeout(() => {
          myMenu.current.classList.add("d-none")
        }, 150);
      }
      
    }
  const newReponse = ()=>{
    if(myResponse!=undefined){
      return myResponse.items
    }else{
      return 1
    }
  }
  return (
    <div  style={{backgroundColor:`${theme.bg}`,color:`${theme.text}`}}>
      <div style={{position:"relative",zIndex:1}}>
        <Navbar theme={theme} Mainmenu={PopMainmenu} Changetheme={Changetheme}/>
      </div>
      <div>
        <div style={{height:"58px"}}></div>
        {/* Mainbody */}
        <div className='container-fluid' >
          <div className='row'>
            {/* NAVIGATION */}
            <div className='container-fluid d-none d-sm-flex flex-column col-md-1 col-2'></div>
            <div  className=' position-fixed container-fluid d-none d-sm-flex flex-column col-md-1 col-2'>
              {/* HOME */}
              <button className='btn m-0 border-0 p-0 mt-4 d-flex justify-content-center align-items-center'>
                <div  className={lgmenu}>
                  <div className=' d-flex justify-content-center fs-2'><FaHome color={theme.text}/></div>
                <small className='fw-bold' style={{color:`${theme.text}`}}>Home</small>
                </div>
              </button>
              {/* SHORTS */}
              <button className='btn m-0 p-0 border-0 mt-4 d-flex justify-content-center align-items-center'>
                <div  className={lgmenu}>
                  <div className=' d-flex justify-content-center fs-2'><BsPlayBtn color={theme.text} size={26}/></div>
                  <small className='' style={{color:`${theme.text}`}}>Shorts</small>
                </div>
              </button>
              {/* Subcriptions */}
              <button className='btn m-0 p-0 border-0 mt-4 d-flex justify-content-center align-items-center'>
                <div  className={lgmenu}>
                  <div className=' d-flex justify-content-center fs-2'><BsReplyAll color={theme.text}/></div>
                  <small className='' style={{color:`${theme.text}`}}>Subcriptions</small>
                </div>
              </button>
              {/* Library */}
              <button className='btn m-0 p-0 border-0 mt-4 d-flex justify-content-center align-items-center'>
                <div  className={lgmenu}>
                  <div className=' d-flex justify-content-center fs-2'>< BsBook color={theme.text}/></div>
                  <small style={{color:`${theme.text}`}}>Library</small>
                </div>
              </button>
            </div>
            {/* CONTENT */}
            <div className='col col-sm-10 col-md-11'>
              {/* SUGGESTION */}
              <Wsugest theme={theme}/>
              {/* CARDS */}
              <Videocards snippet={newReponse()} num={newReponse().length} theme={theme}/>
            </div>
          </div>
        </div>
      </div>
      {/* MenuExpand */}
      <div ref={myMenu} className="myMenu d-none" style={{zIndex:2}}>
        <div ref={menuAnimate}className='w-100 h-100 menuAnimate'>
          <MenuExpand theme={theme} Popout={PopoutMainmenu}/>
        </div>
      </div>
    </div>
  );
}

export default App;
