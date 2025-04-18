export const successresponse=({res,message="DONE",data={},status=200})=>{
return res.status(status).json({message:message,data:{...data}})
}