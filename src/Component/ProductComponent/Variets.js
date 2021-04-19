import React ,{useState,useEffect}from 'react';

const Variets =(props)=>{
   const [varietActive,setVarietActive]=useState([]);
    const [varichange,setVarichange]=useState(false)
   let temp=varietActive;
   
 const handleActive=(item,title)=>{
 

    const index=temp.findIndex(element =>element.item.title==item.title)
    const iID=temp.findIndex(element =>element.item.ID==item.ID)

    if(temp && index!=-1 && iID !=-1){
      temp[iID]={item,active:!temp[iID].active}
      setVarichange(!varichange)
    }
    else 
    if(temp && index !=-1 && iID==-1 )
    {
      temp[index]={item,active:true}
      setVarichange(!varichange)
    }
    else
    {
     temp.push({item,active:true})
     setVarichange(!varichange)
    }
  }
  
const isActive=(ID)=>{
  let flag=false
  for(var i =0 ;i<varietActive.length;i++)
  { 
    const vari=varietActive[i]
    if(vari.item.ID==ID && vari.active) {
      
     return flag= true
    }
    if(vari.item.ID==ID && !vari.active) {
      
  
      flag= false
    }
    else 
    { 
      flag= false}
  }
 
    return flag 
}

useEffect(() => {
  setVarietActive(temp)
  props.setVari(varietActive)
},[varichange])
 useEffect(() => {
  
  
 },[varietActive])


    if(props.variets.length==0)
        return (<></>)
    else
        return (
                <ul>
                    {
                        props.variets.map((vari,index)=>{
                            return <li key={index}><h3 style={{textTransform: "capitalize"}}>{vari.title}</h3>                          
                            {(vari.res !=undefined)?
                            <div>
                                {vari.res.map((item,index)=>{
                                if (item.chk)                        
                                    return <>{(isActive(item.ID)) ?
                                      
                                        <div  key={index} className='colorDiv varietActive ' style={{background:item.value}}  onClick={(e)=>{
                                           
                                            handleActive(item);
                                            if(item.filename) props.changeUrl(item.filename);
                                            props.handleVarietClick(item.price,item.Filename);
                                          
                                          }}>
                                        </div>
                                        :<div  key={index} className='colorDiv' style={{background:item.value}}  onClick={(e)=>{
                                          handleActive(item);
                                          if(item.filename) props.changeUrl(item.filename);
                                          props.handleVarietClick(item.price,item.Filename);
                                        }}>
                                        </div>}
                                        </>
                                else 
                                   return <>
                                     {(isActive(item.ID)) ?
                                <div key={index} id={item.ID} className={`varietDiv varietActive`}  onClick={(e)=>
                                {handleActive(item);
                                if(item.filename) props.changeUrl(item.filename);
                                props.handleVarietClick(item.price,item.Filename);
                                }} >
                                  <div>{item.value}</div><div> {item.price}₪</div>
                                    </div>:
                                     <div key={index} id={item.ID} className={`varietDiv `}  onClick={(e)=>
                                        {handleActive(item);
                                          if(item.filename) props.changeUrl(item.filename);
                                        props.handleVarietClick(item.price,item.Filename);
                                      
                                     }}>
                                     <div>{item.value}</div><div> {item.price}₪</div>
                                       </div>}
                                       </>
                                })}
                            </div>:null}
                            </li>
                        })
                        }
                    
                </ul>
)
}
export default Variets;