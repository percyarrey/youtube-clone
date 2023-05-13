import "./styling.css"
import {BsX,BsPlayBtn,BsReplyAll, BsBook} from "react-icons/bs";
import {FaHome} from "react-icons/fa";
export default function MenuExpand(props){
    return(
           <div className="d-flex w-100 h-100">
                <div className="h-100 w-50 px-3 pt-2"  style={{backgroundColor:`${props.theme.bg}`}} >
                <button onClick={props.Popout}  className="btn" style={{border:`0.1px solid ${props.theme.text}`}}><BsX  color={props.theme.text}  size={30}/></button><br/>
                <button className="btn mt-2 w-100" style={{border:`1px solid ${props.theme.text}`}}>
                    <div className="d-flex">
                     <FaHome  color={props.theme.text} size={23}/>
                     <div className="fw-bold ms-4"  style={{color:`${props.theme.text}`}}>Home</div>
                    </div>
                </button>
                <button className="btn w-100">
                    <div className="d-flex">
                     <BsPlayBtn color={props.theme.text}  size={26}/>
                     <div className=" ms-4"  style={{color:`${props.theme.text}`}}>Shorts</div>
                    </div>
                </button>
                <button className="btn w-100">
                    <div className="d-flex">
                     <BsReplyAll color={props.theme.text}  size={26}/>
                     <div className="ms-4"  style={{color:`${props.theme.text}`}}>Subcriptions</div>
                    </div>
                </button>
                <button className="btn w-100">
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