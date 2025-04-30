// Connecting to the server with authentication
const clientIo = io("http://localhost:3000", {
    auth: {
      authorization: "admin eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MGZmMTE2ODI1NTRmYzE5ZDBkODE3MSIsInJvbGUiOiJhZG1pbiIsInVzZXJuYW1lIjoic2FyYWgiLCJpYXQiOjE3NDU4NzY2NTV9.8kIDQ_2XmEKfagVGR6P3_hv9IyEXyAhBVRW-_7pAO0o"
    }
  });
  clientIo.on('connect',() => {
    console.log("Connection established");
  
    clientIo.emit("joinRoom",{roomid:"680ff4523e53ddc98acb71fa"})
    clientIo.emit("leaveRoom",{roomid:"680ff4523e53ddc98acb71fa"})
  });
  
clientIo.on("sayhi",data=>{
  // console.log(data);
   clientIo.emit("joinRoom",{roomid:"680ff4523e53ddc98acb71fa"})
  // clientIo.emit("leaveRoom",{roomid:"680ff4523e53ddc98acb71fa"})
})
clientIo.on("message",data=>{
  console.log(data); 
})
clientIo.on("hello",data=>{
  // console.log(data);
  clientIo.emit("leaveRoom",{roomid:"680ff4523e53ddc98acb71fa"})
  
})
clientIo.on("chat",data=>{
  // console.log(data);
  clientIo.emit("sendmessage",{roomid:"680ff4523e53ddc98acb71fa",content:"you are smart"})
})