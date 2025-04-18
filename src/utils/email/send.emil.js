 import nodemailer from "nodemailer";
 export const sendemail=async({to="",cc="",bcc="",subject="route",text="",html="",attachments=[]}={})=>{
    const transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASS
        }
        });
        async function main() {
          const info = await transporter.sendMail({
           to,
           cc,
           bcc,
           subject,
           text,html,attachments
          });
        
          console.log("Message sent: %s", info.messageId);
          
        }
        
            main().catch(console.error);
 }
