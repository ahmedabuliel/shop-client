import React, { useState,  useEffect,  } from 'react';
import Resizer from "react-image-file-resizer";
import { Avatar, Badge ,Image} from "antd";

import axios from "axios";
import {API, UPLOAD} from "../../config" 

const ProfileUpload = ({ values, setValues }) => {

    const [loading,setLoading]=useState(false)
    const fileUploadAndResize = (e) => {
        e.preventDefault();
        let files = e.target.files; 
        let uploadFile = values.profile;
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
                    
                 const res=await axios.post(`${API}/uploadprofile`,
                      { image: uri }
                    )
                      console.log("IMAGE UPLOAD RES DATA", res);
                      setLoading(false);
                      uploadFile=res.data;
                  
                      setValues({ ...values, profile: uploadFile });
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
    }
 const handleImageRemove = () => {
     setLoading(true)
    axios.post(`${API}/removeprofile`, { url: values.profile }).then((res) => {
        console.log("IMAGE removed RES DATA", res);
        setLoading(false);
        setValues({ ...values, profile: ''});

    })
}
return (
    <>
    <div className="row center" style={{"margin": "5% 0" }}>
       {values.profile &&  <Badge
              count="X"
             
              onClick={() => handleImageRemove()}
              style={{ cursor: "pointer" }}
            >
                 <Avatar
                src={<Image preview={false} src={`${UPLOAD}${values.profile}`} />}
                size={100}
                shape="circle"
                className="ml-3"
              />
            </Badge>}
        
       </div>
       <div className="row center" style={{"margin": "5% 0" }}>
          <label className="btn btn-primary">
            Choose Profile Image
            <input
           
              type="file"
              hidden
              accept="image/*"
              onChange={e=>fileUploadAndResize(e)}
           
            />
          </label>
       
        </div>
        </>
)
}
export default ProfileUpload;