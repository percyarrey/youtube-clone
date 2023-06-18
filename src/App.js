import './App.css';
import React from 'react';
import { BrowserRouter, Link, Route,Routes } from 'react-router-dom';


/* COMPONENT IMPORT */
import Navbar from './component/Navbar';
import MenuExpand  from './component/MenuExpand';

/* ICONS IMPORT */
import { BsPlayBtn,BsBook,BsReplyAll,BsHouse,BsPlayBtnFill,BsHouseFill} from "react-icons/bs";


/* MY PAGES */
import Homepage from './pages/Homepage';
import Searchpage from './pages/Searchpage';
import Shortspage from './pages/Shortspage.js';
import Errorpage from './pages/404page';
import Playvideopage from './pages/Playvideopage';
var pagetoken;

function App() {

  
  /* ActiveMenu */
  const [curMenu,setcurMenu] = React.useState("home")

  function curMenufxn(p){
    if(p.currentTarget.id=="home"){
      setcurMenu(p.currentTarget.id)
    }else{
      setcurMenu(p.currentTarget.id)
    }
  }
  //Theme Toggle
  const [theme,settheme] = React.useState({
      bg:"#fff",
      text:"black"
  })
  /* MY ALERT PAGE NOT AVIALABLE */
  function myalert() {
    alert("Page Not Avialable try again later")
  }


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
    return (
      <div  style={{backgroundColor:`${theme.bg}`,color:`${theme.text}`,minHeight:"100vh"}}>
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
                <Link to="/" onClick={curMenufxn} id='home' className='btn m-0 border-0 p-0 mt-4 d-flex justify-content-center align-items-center'>
                  <div  className={lgmenu}>
                    <div className=' d-flex justify-content-center fs-2'>{curMenu=="home"?<BsHouseFill color={theme.text}/>:<BsHouse color={theme.text}/>}</div>
                  <small className='fw-bold' style={{color:`${theme.text}`}}>Home</small>
                  </div>
                </Link>
                {/* SHORTS */}
                <Link onClick={curMenufxn} id='short' to="/shorts" className='btn m-0 p-0 border-0 mt-4 d-flex justify-content-center align-items-center'>
                  <div className={lgmenu}>
                    <div className=' d-flex justify-content-center fs-2'>{curMenu=="short"?<BsPlayBtnFill color={theme.text} size={26}/>:<BsPlayBtn color={theme.text} size={26}/>}</div>
                    <small className='' style={{color:`${theme.text}`}}>Shorts</small>
                  </div>
                </Link>
                {/* Subcriptions */}
                <button className='btn m-0 p-0 border-0 mt-4 d-flex justify-content-center align-items-center'>
                  <div  onClick={myalert} className={lgmenu}>
                    <div className=' d-flex justify-content-center fs-2'><BsReplyAll color={theme.text}/></div>
                    <small className='' style={{color:`${theme.text}`}}>Subcriptions</small>
                  </div>
                </button>
                {/* Library */}
                <button className='btn m-0 p-0 border-0 mt-4 d-flex justify-content-center align-items-center'>
                  <div  onClick={myalert} className={lgmenu}>
                    <div className=' d-flex justify-content-center fs-2'>< BsBook color={theme.text}/></div>
                    <small style={{color:`${theme.text}`}}>Library</small>
                  </div>
                </button>
              </div>
              {/* CONTENT */}
              <div className='col col-sm-10 col-md-11'>
                {/* MY ROUTER */}
                  <Routes>
                    <Route path="/" element={<Homepage theme={theme}/>}/>
                    <Route path="/search/:query"  element={<Searchpage theme={theme}/>}/>
                    <Route path="/shorts"  element={<Shortspage theme={theme}/>}/>
                    <Route path="/watch/:videoid"  element={<Playvideopage theme={theme}/>}/>
                    <Route path="*"  element={<Errorpage/>}/>
                  </Routes>
              </div>
            </div>
          </div>
        </div>
        {/* MenuExpand */}
        <div ref={myMenu} className="myMenu d-none" style={{zIndex:2}}>
          <div ref={menuAnimate}className='w-100 h-100 menuAnimate'>
            <MenuExpand curMenufxn={curMenufxn}  curMenu={curMenu} theme={theme} Popout={PopoutMainmenu}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default App;