import { resend , sender} from "../config/resend.js";
import { ApiError , createWelcomeEmailTemplate} from "../utils/index.js";

export const sendWelcomeEmail = async ({ to, name, clientURL }) => {
    const { data , error } = await resend.emails.send({
        from : `${sender.name} <${sender.email}>`,
        to,
        subject : "Welcome to the Synk",
        html: createWelcomeEmailTemplate(name, clientURL)
    })

    if (error ){
        console.error("Error sending the welcome message")
        throw new ApiError()
    }

    console.log("Welcome Email Sent Successfully")
};