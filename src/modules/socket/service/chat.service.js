import messagemodel from "../../../DB/models/message.model.js";
import Roommodel from "../../../DB/models/room.model.js";
import { authentication } from "../../../middleware/socket/auth.socket.middleware copy.js";
import * as dbservice from "../../../DB/db.service.js"
export const joinroom=async(socket,io)=>{
    const user =await authentication(socket)
    console.log(user.username);

    socket.on("joinRoom",async(data)=>{
     const {roomid}=data
     console.log(roomid);
     socket.join(roomid);
     await Roommodel.findByIdAndUpdate(roomid, {
       $addToSet: { users: user._id },
     });
     io.to(roomid).emit("message", {
       message: `${user.username} has joined the chat`
     });
    })
  socket.emit("sayhi","tota")
}
export const sendmessage=async(socket,io)=>{
    const user =await authentication(socket)
    console.log(user.username);
    socket.on("sendmessage",async(data)=>{
        const{roomid,content}=data
        console.log(roomid);
        console.log(content);
        
        
   await dbservice.create({model:messagemodel,data:{content,senderId:user._id,roomId:roomid}})
   io.to(roomid).emit("message", {
    sender: user.username,
    content: content
  });
        })
 
    socket.emit("chat","fav")
}
export const leaveroom=async(socket,io)=>{
    const user =await authentication(socket)
    console.log(user.username);
    socket.emit("hello","leaveRoom")
    socket.on("leaveRoom",async(data)=>{
       const{roomid}=data
        socket.leave(roomid);
        await Roommodel.findByIdAndUpdate(roomid, {
          $pull: { users: user._id },
        });
        io.to(roomid).emit("message", {
          message: `${user.username} has left the chat`
        });
       })

}