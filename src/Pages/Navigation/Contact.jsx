import React, { useEffect } from "react";
import { useState } from "react";

const Contact = () => {
  useEffect(()=> {
    window.scroll(0,0);
  },[])
  const [ data,setData ] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [ preview , setPreview ] = useState(false)
  const [ blur , setBlur ] = useState(false)

  const handleChange = (event)=> {
    setData({...data, [event.target.name]: event.target.value});
  }
  const openPreview = ()=>{
    setPreview(!preview)
    setBlur(!blur)
  }
  var Blur;
  if (blur) {
    Blur = `blur-lg`;
  } else {
    Blur = `blur-0`;
  }
  
  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log(data)
  }
  const clearData = (e)=>{
    setData({
      name: "",
      email: "",
      message: ""
    });
  }

  return (
    <>
      <div id="Contact" className={`${Blur} flex flex-col p-8 md:px-28 lg:px-36 h-fit justify-items-center overflow-hidden`}>
      <div id="heading" className="my-5">
        <span className="text-5xl font-light">Contact Us</span>
      </div>
      <div id="form" className="my-5 pr-28 md:pr-36 lg:pr-60">
        <form className="relative mb-10" onSubmit={ (event)=>{handleSubmit(event)} }>
          <div className="flex flex-col lg:flex-row w-full">
            <input
              type="text"
              name="name"
              value={data.name}
              placeholder="Name"
              className="bg-slate-100 px-3 py-1 rounded-md w-full mx-5 my-2"
              autoComplete={'off'}
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              value={data.email}
              placeholder="Email"
              className="bg-slate-100 px-3 py-1 rounded-md w-full mx-5 my-2"
              autoComplete={'off'}
              onChange={handleChange}
            />
          </div>
          <div id="textArea">
            <textarea name="message" value={data.message} id="Message" rows="7" placeholder="Type message" className="bg-slate-100 my-2 mx-5 rounded-md px-3 py-1 w-full" onChange={handleChange} autoComplete={'off'}></textarea>
          </div>
          <div id="buttons" className="flex flex-col md:flex-row">
          <button type="submit" className="w-full md:w-fit bg-gray-300 hover:bg-slate-100 py-2 px-3 rounded-md mx-5 my-1" >
              Submit
            </button>
            <button onClick={clearData} className="w-full md:w-fit bg-gray-300 hover:bg-slate-100 py-2 px-3 rounded-md mx-5 my-1" >
              Clear
            </button>
            <button onClick={openPreview} className="w-full md:w-fit bg-gray-300 hover:bg-slate-100 py-2 px-3 rounded-md mx-5 my-1">Preview</button>  
          </div>  
        </form>
      </div>
    </div>
    {preview? (
      <>
        <div className="absolute grid w-screen z-30 top-1 h-screen justify-items-center px-10">
          <div className="p-10 lg:p-16 w-full h-fit mt-8 bg-white rounded-lg shadow-2xl overflow-y-scroll">
            <div id="displayData" className="flex flex-col">
              <div id="nameEmail" className="mb-4">
                <label className="float-left lg:text-lg">{data.name}</label>
                <label className="float-right lg:text-lg">{data.email}</label>
              </div>
              <div id="message" className="text-justify">
                <label className="text-sm lg:text-md">{data.message}</label>
              </div>
            </div>
            <div id="button" className="relative mb-9 -bottom-full">
            <button onClick={openPreview} className="border-2 hover:bg-slate-100 py-2 px-3 rounded-md -mr-5 float-right">Close</button>
          </div>
          </div>
        </div>
      </>
    ) : (
      <></>
    ) }
    </>
  );
};

export default Contact;
