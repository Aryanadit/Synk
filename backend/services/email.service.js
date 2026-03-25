import { resend , sender} from "../config/resend.js";
import { createWelcomeEmailTemplate ,
    //forgotPasswordEmailTemplate 
} from "../utils/index.js";

const sendEmail = async ({ to, subject, html }) => {
    const { data, error } = await resend.emails.send({
        from: `${sender.name} <${sender.email}>`,
        to,
        subject,
        html
    });

    if (error) {
        console.error("Resend Error:", error);
        throw new Error("Email sending failed");
    }

    return data;
};

export const sendWelcomeEmail = async ({ to, name, clientURL }) => {
    const data = await sendEmail({
        to,
        subject: "Welcome to Synk",
        html : createWelcomeEmailTemplate ,
    });

    console.log("Welcome Email Sent Successfully")

    return data;
};

// TODO: add reset password 
// export const sendForgotPasswordEmail = async ({ to, name, resetURL }) => {
//     const html = forgotPasswordEmailTemplate(name, resetURL);

//     const data = await sendEmail({
//         to,
//         subject: "Reset Your Password",
//         html
//     });

//     console.log("✅ Reset Password Email Sent");

//     return data;
// };