import React from 'react';
import {FaArrowRight,FaArrowLeft} from "react-icons/fa";
export default function Wsugest(props){
    const [lbtnui,setlbtnui]=React.useState('pt-3 pb-3 d-flex align-items-start justify-content-center d-none')
    const [rbtnui,setrbtnui]=React.useState('col-1 pt-3 pb-3 d-flex align-items-start justify-content-center')
    var mysug = React.useRef(null)
    var leftbtn = React.useRef(null)
    var rightbtn = React.useRef(null)
    var setnumtheme= true
    function ScrollRightfxn(e) {
        if(mysug!=null){
            mysug.current.scrollBy({left :96,behavior:"smooth"})
            setlbtnui(prev=>{
                return'pt-3 pb-3 d-flex align-items-start justify-content-center'
            })
        }
        
    }
    function ScrollLeftfxn(e) {
        if(mysug!=null){
            mysug.current.scrollBy({left :-96,behavior:"smooth"})
        }
    }
    setInterval(() => {
        if(mysug!=null){
            if(mysug.current!=null){
                var hiddenWidth = mysug.current.scrollWidth-mysug.current.clientWidth
                if(hiddenWidth===0 && leftbtn!=null && rightbtn!=null){
                    setlbtnui(prev=>{
                        return' pt-3 pb-3 d-flex align-items-start justify-content-center d-none'
                    })
                    setrbtnui(prev=>{
                        return'col-1 pt-3 pb-3 d-flex align-items-start justify-content-center d-none'
                    })   
                    }
                    if(mysug.current.scrollLeft===0 && leftbtn!=null){
                        setlbtnui(prev=>{
                            return'pt-3 pb-3 d-flex align-items-start justify-content-center d-none'
                        })
                    }
                    if(mysug.current.scrollright===0 && rightbtn!=null){
                        setrbtnui(prev=>{
                            return'col-1 pt-3 pb-3 d-flex align-items-start justify-content-center d-none'
                        })
                    }
                    if(mysug.current.scrollLeft!==0 && hiddenWidth!==0  && leftbtn!=null){
                        setlbtnui(prev=>{
                            return'pt-3 pb-3 d-flex align-items-start justify-content-center'
                        })
                    }

                    if(mysug.current.scrollRight!==0 && hiddenWidth!==0  && rightbtn!=null ){
                        setrbtnui(prev=>{
                            return'col-1 pt-3 pb-3 d-flex align-items-start justify-content-center'
                        })
                    }
                    if(setnumtheme==true){
                        var button = mysug.current.querySelectorAll('button') 
                        button.forEach((e)=>{
                            e.style.color=props.theme.text
                            if(e.classList.contains("myActive")){
                                e.style.backgroundColor=props.theme.text
                                e.style.color=props.theme.bg
                            }else{
                                e.style.color=props.theme.text
                                if(props.theme.bg!="#fff"){
                                    e.style.backgroundColor="black"
                                }else{
                                    e.style.backgroundColor="#D3D3D3"
                                }
                            }
                        })
                        setnumtheme=false
                    }
            }else{
                return;
            }
        }else{
            return;
        }
    }, 1000);

    return(
        <div className=" container-fluid">
            <div className='row gap-0 g-0 position-relative'>
                <div className='col-0' style={{height:"0rem",width:"0rem",zIndex:1}}>
                    <div style={{width:"2rem",height:"3rem",backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} className={lbtnui} ref={leftbtn} >
                    <button onClick={ScrollLeftfxn} style={{position:"relative",top:"-0.51rem",left:"-0.4rem"}}  className="btn text-muted bg-transparent"><FaArrowLeft color={props.theme.text}/> </button>
                </div>
                </div>
                <div className='col-11'>
                <div className='pt-2 pb-3 gap-2 d-flex align-items-center overflow-hidden mysugbtn'  style={{backgroundColor:`${props.theme.bg}`,color:`${props.theme.text}`}} ref={mysug} >
                <nobr><button onClick={props.Squery}>All</button></nobr>
                <nobr><button onClick={props.Squery}>GTA 6</button></nobr>
                <nobr><button onClick={props.Squery}>Comedy</button></nobr>
                <nobr><button onClick={props.Squery}>Gaming</button></nobr>
                <nobr><button onClick={props.Squery} >Video game walkthrough</button></nobr>
                <nobr><button  onClick={props.Squery}>Under 10 min</button></nobr>
                <nobr><button onClick={props.Squery}>Playstation 4</button></nobr>
                <nobr><button onClick={props.Squery}>Naruto</button></nobr>
                <nobr><button  onClick={props.Squery}>Character</button></nobr>
                <nobr><button  onClick={props.Squery}>Music</button></nobr>
                </div>
            </div>
            <div className={rbtnui} ref={rightbtn} >
                <button onClick={ScrollRightfxn}  style={{position:"relative",top:"-0.51rem"}} className="btn  text-muted"><FaArrowRight  color={props.theme.text}/> </button>
            </div>
        </div>
        </div>
    )
}