
export const asynchandler = (fn) => {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((error) => {
return res.json({mesaage:error.message,stack:error.stack})
      });
    };
  };
  
export const globalerrorhandler=(error,req,res,next)=>{ 
    if(process.env.MOOD==="PROD"){
        return res.status(error.cause||400).json({message:"G error",msg:error.message,stack:error.stack})
    }
    else{
        return res.status(error.cause||400).json({message:"G error",msg:error.message})
    }
   
}