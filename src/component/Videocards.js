import React from 'react';
import Cards from './Cards';


export default function Videocards(props) {
    var count=-1
    let num = props.num;
    function itemsState(){
        if(window.innerWidth<=700){
            return " col ";
        }
        if(window.innerWidth<=992){
            return " col-6 ";
        }
        if(window.innerWidth<=1400){
            return " col-4 ";
        }
        else{
            return " col-3 "
        }
    }
    const[items,setitems] = React.useState(itemsState())
    var Currentscreensize =(()=>{
        if(items===" col "){
            return 1;
        }
        if(items===" col-6 "){
            return 2;
        }
        if(items===" col-4 "){
            return 3;
        }
        if(items===" col-3 "){
            return 4;
        }
    })
    function NormalRow(props){
            function Myj(){
                var norCards = Array.from({length:props.cs}).map((_,i)=>{
                    if(count<props.newsnip.length-1){
                        count+=1
                        return (<Cards videoid={props.newsnip[count].id.videoId} video={props.newsnip[count].snippet}  key={i} theme={props.theme} cardclass={items}/>)
                    }
                })
                return(norCards)
            }
            return(
                <div className='row'>
                    <Myj/>
                    <Myj/>
                </div>
            )
    }
    function ShotRow(){
        return(
            <div className='bg-primary rounded-3 my-2' style={{height:"200px"}}>

            </div>
        )
    }
    function norshotCards(cardneeded){
        var numRow = Math.ceil(cardneeded/Currentscreensize())
        var finalCards; 
        if(props.snippet!=1){
            finalCards = Array.from({length:(numRow)}).map((_,i)=>{
                if(i%2!==0){
                    return <ShotRow key={i}/>
                }else{
                    return <NormalRow newsnip={props.snippet} cs={Currentscreensize()} theme={props.theme}  key={i}/>
                }
            })
            return(
                <div>
                   {finalCards} 
                </div>
            )
        }
    }
    setInterval(()=>{
        setitems(()=>{
            if(window.innerWidth<=700){
                return " col ";
            }else if(window.innerWidth<=992 && window.innerWidth>700){
                return " col-6 ";
            }else if(window.innerWidth<=1400 && window.innerWidth>992){
                return " col-4 ";
            }
            else if(window.innerWidth>1400){
                return " col-3 "
            } 
        })
       Currentscreensize =(()=>{
            if(items===" col "){
                return 1;
            }
            if(items===" col-6 "){
                return 2;
            }
            if(items===" col-4 "){
                return 3;
            }
            if(items===" col-3 "){
                return 4;
            }
        })
    },100)

    return(
        <div>
            {norshotCards(num)}
        </div>
    )
}