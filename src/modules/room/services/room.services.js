import { asynchandler } from "../../../utils/error/error.js";
import * as dbservice from "../../../DB/db.service.js"
import Roommodel from "../../../DB/models/room.model.js";
import { successresponse } from "../../../utils/responses/success.response.js";
import messagemodel from "../../../DB/models/message.model.js";

export const createroom = asynchandler(
    async (req, res, next) => {
      const {roomname}=req.body
      console.log(roomname);
      
      const room = await dbservice.create({model:Roommodel,data:{
        roomname,createdby:req.user._id
      }})

  
      return successresponse({res,message:"done",data:{room},status:201})
    }
  )
  
export const getrooms = asynchandler(
    async (req, res, next) => {
     
      const rooms = await dbservice.find({model:Roommodel})

  
      return successresponse({res,message:"done",data:{rooms},status:201})
    }
  )
  export const deleteroom = asynchandler(
    async (req, res, next) => {
     const {roomid}=req.params
     console.log(roomid);
     console.log(req.user);
     
     const room=await dbservice.findOne({model:Roommodel,filter:{_id:roomid}})
     if (room.createdby.toString() !== req.user._id.toString()) {
        return next(new Error('This account cannot do this'), { cause: 404 });
      }
      
       const rooms = await dbservice.deleteOne({model:Roommodel,filter:{
        _id:roomid}})
 console.log(rooms);

  
      return successresponse({res,message:"the room deleted successfully",status:201})
    }
  )
  export const getchats = asynchandler(
    async (req, res, next) => {
     const {roomId}=req.params
     const {senderId,content}=req.body
     console.log(roomId);
     const message=await dbservice.create({model:messagemodel,data:{roomId,senderId,content}})
     const specificroom=await dbservice.find({model:messagemodel,filter:{roomId}})
  
  
      return successresponse({res,message:"get chats for specific room",data:{specificroom},status:201})
    }
  )