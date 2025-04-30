import { Server } from "socket.io"
import { joinroom, leaveroom, sendmessage } from "./service/chat.service.js";


export const runIO=(httpserver)=>{
    const io =new Server(httpserver,{cors:"*"})
        io.on('connection',async(socket) => {
            console.log(socket.id);
          await leaveroom(socket,io)
       await joinroom(socket,io)
      //    await leaveroom(socket,io)
        await sendmessage(socket,io)
          });
          
          
      
       
       
    }

