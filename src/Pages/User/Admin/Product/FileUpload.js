import React, { useState,  useEffect,  } from 'react';
import Resizer from "react-image-file-resizer";
import { Avatar, Badge ,Image,Select } from "antd";

import axios from "axios";
import {API, UPLOAD} from "../../../../config" 

const { Option } = Select;
const FileUpload = ({ values, setValues, setLoading,user }) => {

  
    const fileUploadAndResize = (e) => {
     
      e.preventDefault();
      let files = e.target.files; 
      let allUploadedFiles = values.images;
   
      if (files) {
        setLoading(true);
        for (let i = 0; i < files.length; i++) {
          Resizer.imageFileResizer(
            files[i],
            720,
            720,
            "JPEG",
            100,
            0,
            async (uri) => {
            try{ 
                
             const res=await axios.post(`${API}/uploadimages`,
                  { image: uri },
                  {
                    headers: {
                      "Authorization": user ? `Bearer ${user.token}` : "",
                    }
                    
                  }
                )
                  console.log("IMAGE UPLOAD RES DATA", res);
                  setLoading(false);
                  allUploadedFiles.push(res.data);
              
                  setValues({ ...values, images: allUploadedFiles,cover:values.images[0] });
                }
                catch(err)  {
                  setLoading(false);
                  console.log("IMAGE UPLOAD ERR", err);
                };
            },
            "base64"
          );
        }
      }
      
    };
const ImgCover=(e)=>{
 
  setValues({ ...values, cover: e });
}
  const handleImageRemove = (index) => {
    axios.post(`${API}/removeimages`,
    { url: values.images[index] },
    {
      headers: {
        "Authorization": user ? `Bearer ${user.token}` : "",
      }
      
    }
  ) .then((res) => {
    console.log("IMAGE removed RES DATA", res);
    setLoading(false);
    let temp=values.images.filter(image=>image!=values.images[index])
    setValues({ ...values, images: temp});
    if(values.images.length==0) setValues({ ...values, cover: ''});

  })
  
  };

  

  return (
    <>
      <div className="row" style={{"marginTop": "5%" }}>
       
        {values.images &&
          values.images.map((image,index) => (
              
            <Badge
              count="X"
              key={index}
              onClick={() => handleImageRemove(index)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={<Image preview={false} src={`${UPLOAD}${image}`} />}
                size={100}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary">
          Choose File
          <input
         
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={e=>fileUploadAndResize(e)}
         
          />
        </label>
      </div>
      <div className="row">
      <Select
                style={{ width: 500, }}
                placeholder="Select A Product Image Cover"
                onChange={e=>ImgCover(e)} 
                defaultValue={values.images[0]}
                value={values.cover}
                >
                {values.images && values.images.map((image,index)=>{
                        return (
                <Option value={image} key={index}  style={{ textAlign:'center' }}> 
                    <Avatar
                    size="large" 
                    shape="square"
                        src={<Image src={`${UPLOAD}${image}`} />}
                        />
                </Option>
                        )
                    })}
                
            </Select>

    </div>
    </>
  );
};

export default FileUpload;
