import { Link } from "react-router-dom";
import "./styling.css"
import {BsX,BsPlayBtn,BsReplyAll, BsBook, BsPlayBtnFill, BsHouse, BsHouseFill} from "react-icons/bs";
export default function MenuExpand(props){
    /* MY ALERT PAGE NOT AVIALABLE */
    function myalert() {
        alert("Page Not Avialable try again later")
    }
    return(
           <div className="d-flex w-100 h-100">
                <div className="h-100 w-50 px-3 pt-2"  style={{backgroundColor:`${props.theme.bg}`}} >
                <button onClick={props.Popout}  className="btn" style={{border:`0.1px solid ${props.theme.text}`}}><BsX  color={props.theme.text}  size={30}/></button><br/>
                <Link to={"/"} id="home" onClick={props.curMenufxn} className="btn mt-2 w-100" style={props.curMenu=="home"? {border:`1px solid ${props.theme.text}`}:{border:`0px solid ${props.theme.text}`}}>
                    <div className="d-flex">
                    {props.curMenu=="home"?<BsHouseFill color={props.theme.text} size={28}/>:<BsHouse color={props.theme.text}  size={28}/>}
                     <div className="fw-bold ms-4"  style={{color:`${props.theme.text}`}}>Home</div>
                    </div>
                </Link>
                <Link id="short" to={'/shorts'} onClick={props.curMenufxn} className="btn w-100" style={props.curMenu=="short"? {border:`1px solid ${props.theme.text}`}:{border:`0px solid ${props.theme.text}`}}>
                    <div className="d-flex">
                    {props.curMenu=="short"?<BsPlayBtnFill color={props.theme.text} size={28}/>:<BsPlayBtn color={props.theme.text} size={28}/>}
                     <div className=" ms-4"  style={{color:`${props.theme.text}`}}>Shorts</div>
                    </div>
                </Link>
                <button onClick={myalert} className="btn w-100">
                    <div className="d-flex">
                     <BsReplyAll color={props.theme.text}  size={26}/>
                     <div className="ms-4"  style={{color:`${props.theme.text}`}}>Subcriptions</div>
                    </div>
                </button>
                <button onClick={myalert} className="btn w-100">
                    <div className="d-flex">
                     <BsBook color={props.theme.text}  size={26}/>
                     <div className="ms-4"  style={{color:`${props.theme.text}`}}>Library</div>
                    </div>
                </button>
                </div>
                <button onClick={props.Popout} className="border-0 h-100 w-50 bg-transparent"></button>
           </div>
    )
}