import React, { useState,  useEffect,  } from 'react';
import { useSelector } from "react-redux";
import { Avatar, Badge ,Upload,TreeSelect} from "antd";
const { TreeNode } = TreeSelect;

const VarietSelect =({ values, flag,setFlag,setValues, setLoading ,varietsSelected,setVarietsSelected})=>{
    const { variets } = useSelector((state) => ({ ...state }));
  
  

   useEffect(() => {
   
    varietChange(values.variets)
   },[flag])
  
   const varietChange=e=>{

      const varietsIDs=e;
      const x=[]
      varietsIDs.map((v)=>{
        variets.map((vari)=>{
         vari.res.map((r)=>{
            if(r.ID==v) return x.push(r)
          })
        })
      
      })
      setVarietsSelected(x)
      setValues({ ...values,variets: e ,varietsSelected: x});
      setFlag(false)
    }
    
    const content =()=>{
    
      return (
        <TreeSelect
        showSearch
        style={{ width: '50%' }}
        multiple
        dropdownStyle={{ maxHeight: 1000, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll={false}
        onChange={e=>varietChange(e)}
        value={values.variets.map(element => {
         return element
        })}
      
              >
          {variets && variets.map((vari,index)=>{
              return (
                  <TreeNode key={vari.title} value={vari.title} title={vari.title} style={{textTransform: "capitalize"}} disabled >
                    {vari && vari.res.map((v,index)=>{
                     if(v.chk)  return (
                      <TreeNode key={v.ID} value={v.ID} title={v.value} style={{textTransform: "capitalize",background:v.value}}/>
                      
                      )
                   
                    else return (  <TreeNode key={v.ID}  value={v.ID} title={v.value} style={{textTransform: "capitalize"}}/>)
                  }) }
                    </TreeNode>
  
              )
          })}{
     
          }
          </TreeSelect>
      )
    
    }
    return (
       <div className="row">
        <label >
          Choose Variet
         
        </label>
      
       {content()}
      </div>
        
    )
}
export default VarietSelect