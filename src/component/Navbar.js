import {FaYoutube, FaArrowLeft,FaSearch,FaMicrophone,FaUserCircle,FaRegMoon,} from "react-icons/fa";
import {BsUsbSymbol,BsList,BsGear,BsQuestionCircle,BsBookmark,BsThreeDots} from "react-icons/bs";
import React  from "react";
import './styling.css';
export default function Navbar(props){
        var [canshow,setcanshow] = React.useState(" d-none")
        var [canhide,setcanhide] = React.useState("")
        var mySearch=React.useRef(null)
        function  Backfxn(){
                    setcanshow(()=>("d-none"))
                    setcanhide(()=>(""))
        } 
        function Handlesubmit(e) {
            e.preventDefault();
            if(mySearch!=null ){
                if(mySearch.current.classList.contains("d-none")  && window.innerWidth<576){
                    setcanshow(()=>("d-block"))
                    setcanhide(()=>(" d-none"))
                }
            }
        }
        return(
            <div>
                <nav className="w-100 position-fixed navbar navbar-expand" style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}}>
                      <div className="container-fluid">
                        <div className={"col-1 " +canshow}>
                            <button onClick={Backfxn} className="btn border-0"><FaArrowLeft  color={props.theme.text}/></button>
                        </div>
                        <div className={"d-flex"+canhide}>
                            <button onClick={props.Mainmenu} className="btn rounded-5">
                                <span><BsList size={23} color={props.theme.text} /></span>
                            </button>
                            <a className="navbar-brand" style={{fontFamily:"Impact",backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} target="_blank" rel="noreferrer" href="https://www.youtube.com/"><FaYoutube color="Red" size={30}/> YouTube</a>
                        </div>
                        <div className="w-100 d-flex justify-content-center">
                            <form className="rounded-pill overflow-hidden justify-content-cent d-flex gap-0 g-0 my-0 myForm" style={{maxWidth:"700px",border:`1px solid ${props.theme.text}`}}  onSubmit={Handlesubmit}>
                                <input ref={mySearch}  className={"border-0 form-control rounded-0 d-sm-block "+canshow} type="text" placeholder="Search" style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}}/>
                                <button className="btn rounded-0 rounded-start " style={{backgroundColor:"lightgray"}} type="submit"><FaSearch size={22}/></button>
                            </form>
                            <button className="btn ms-2 px-2 rounded-circle" style={{backgroundColor:"lightgray"}} type="submit"><FaMicrophone fontSize={22}/></button>
                        </div>
                        <div className={"d-flex position-relative"+canhide}>
                            <div className="d-flex align-items-center">
                                <div className="dropdown">
                                    <button title="Setting" className="btn p-1 d-flex border-0 m-0 myico
                                    "type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <BsThreeDots color={props.theme.text}/>
                                    </button>
                                    <div style={{width:"13rem",left:"-9rem",backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                        <a className="d-flex algn-iitems-center px-2 btn m-0 p-0" style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} target="_blank" rel="noreferrer" href="https://www.youtube.com/account"><FaUserCircle size={22}/> <span className="ms-3">Account</span></a>
                                        <hr className="mt-3"/>
                                        <div className="d-flex justify-content-between align-items-center px-2 ">
                                        <FaRegMoon size={25}/>
                                        <span className="me-5">Theme</span>
                                        <div className="d-flex Themebtn mx-1 rounded-pill">
                                        <input type="checkbox"  onChange={props.Changetheme}/>
                                        <div><div className="bg-primary shadow-lg rounded-pill"></div></div>
                                        </div>
                                        </div>
                                        <a className="d-flex align-items-center px-2 mt-2 btn m-0 p-0"  style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/account"><BsUsbSymbol size={22}/> <span className="ms-3">Language</span></a>
                                        <hr/>
                                        <a className="d-flex align-items-center px-2 btn m-0 p-0" style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/account"><BsGear size={22}/> <span className="ms-3">Setting</span></a>
                                        <hr/>
                                        <a className="d-flex align-items-center px-2 btn m-0 p-0" style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}}  target="_blank" rel="noreferrer" href="https://www.youtube.com/account"><BsQuestionCircle size={22}/> <span className="ms-3">Setting</span></a>
                                        <a className="d-flex align-items-center px-2 mt-2 btn m-0 p-0" target="_blank" rel="noreferrer" style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}}  href="https://www.youtube.com/account"><BsBookmark size={22}/> <span className="ms-3">Feedback</span></a>
                                    </div>
                                </div>


                                {/* 
                                <span className="fs-6 fw-bold">Theme</span>
                                <div className="d-flex Themebtn mx-1 rounded-pill">
                                    <input type="checkbox" />
                                    <div><div className="bg-primary shadow-lg rounded-pill"></div></div>
                                </div> */}                                
                                <nobr><a className="btn btn-outline-primary p-1 rounded-pill  fw-bold" target="_blank" href="https://accounts.google.com/v3/signin/identifier?dsh=S1846296698%3A1683379768273946&continue=https%3A%2F%2Fwww.youtube.com%2Fsignin%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Den%26next%3Dhttps%253A%252F%252Fwww.youtube.com%252F%253FthemeRefresh%253D1&ec=65620&hl=en&ifkv=Af_xneHiHftjqyF7vjCcMOVT8HJXehwEPxOi-aS5vg1i-yQj2BLea2n8Hw738yu3TewZR8EzKf4E6Q&passive=true&service=youtube&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin" rel="noreferrer"><span style={{position:"relative",top
                            :"-0.1rem"}}><FaUserCircle size={20}/></span> Sign In</a></nobr>
                            </div>
                        </div>
                  </div>
                </nav>
                
            </div>
        )
    }
