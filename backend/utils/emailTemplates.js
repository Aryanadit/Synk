export function createWelcomeEmailTemplate(name, clientURL) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Synk</title>
    </head>

    <body style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        background-color: #F8F9FB;
        margin:0;
        padding:24px;
        color:#333;
    ">

    <div style="
        max-width:600px;
        margin:auto;
        background:white;
        border-radius:20px;
        overflow:hidden;
        box-shadow:0 10px 25px rgba(0,0,0,0.05);
    ">

        <!-- Glass Header -->
        <div style="
            backdrop-filter: blur(12px);
            background: rgba(142,151,253,0.15);
            border-bottom:1px solid rgba(255,255,255,0.3);
            text-align:center;
            padding:40px 24px;
        ">
            <img src="https://img.freepik.com/free-vector/hand-drawn-message-element-vector-cute-sticker_53876-118344.jpg?t=st=1741295028~exp=1741298628~hmac=0d076f885d7095f0b5bc8d34136cd6d64749455f8cb5f29a924281bafc11b96c&w=1480"
                alt="Synk Logo"
                style="
                    width:70px;
                    height:70px;
                    border-radius:50%;
                    background:white;
                    padding:10px;
                    margin-bottom:16px;
                "
            />

            <h1 style="
                margin:0;
                font-size:28px;
                color:#8E97FD;
                font-weight:600;
            ">
                Welcome to Synk
            </h1>

            <p style="
                margin-top:8px;
                color:#555;
                font-size:14px;
            ">
                A calm space for meaningful conversations
            </p>
        </div>

        <!-- Content -->
        <div style="padding:32px 28px;">

            <p style="
                font-size:18px;
                margin-bottom:16px;
            ">
                Hello <strong>${name}</strong>,
            </p>

            <p style="
                font-size:15px;
                line-height:1.7;
                margin-bottom:24px;
            ">
                Welcome to <strong>Synk</strong>. Your account is ready and you can now start connecting with people in a clean, distraction-free chat experience.
            </p>

            <!-- Minimal Feature Box -->
            <div style="
                background:#F8F9FB;
                border-radius:16px;
                padding:20px;
                margin:24px 0;
                border:1px solid rgba(0,0,0,0.04);
            ">
                <p style="margin-top:0; font-weight:600; color:#8E97FD;">
                    Get started:
                </p>

                <ul style="padding-left:18px; margin:0; font-size:14px;">
                    <li style="margin-bottom:8px;">Complete your profile</li>
                    <li style="margin-bottom:8px;">Find people to connect with</li>
                    <li style="margin-bottom:8px;">Start your first conversation</li>
                    <li>Share messages instantly</li>
                </ul>
            </div>

            <!-- CTA Button -->
            <div style="text-align:center; margin:32px 0;">
                <a href="${clientURL}" 
                style="
                    background:#8E97FD;
                    color:white;
                    text-decoration:none;
                    padding:14px 28px;
                    border-radius:999px;
                    font-weight:600;
                    font-size:14px;
                    display:inline-block;
                    box-shadow:0 8px 20px rgba(142,151,253,0.3);
                ">
                    Open Synk →
                </a>
            </div>

            <p style="font-size:14px; color:#666;">
                If you ever need help, our team is always here for you.
            </p>

            <p style="margin-top:20px;">
                — The Synk Team
            </p>

        </div>

        <!-- Footer -->
        <div style="
            text-align:center;
            padding:20px;
            font-size:12px;
            color:#888;
            background:#F8F9FB;
        ">
            <p style="margin:0;">© 2026 Synk. All rights reserved.</p>
        </div>

    </div>

    </body>
    </html>
    `;
}
//TODO: reset passwordTemplate
// export function forgotPasswordEmailTemplate(name, resetURL) {
//     return `
//     <!DOCTYPE html>
//     <html>
//     <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <title>Reset Password</title>
//     </head>

//     <body style="margin:0; padding:0; background-color:#F8F9FB; font-family:Arial, sans-serif;">

//     <!-- Preview Text -->
//     <div style="display:none; max-height:0; overflow:hidden;">
//         Reset your Synk password securely 🔐
//     </div>

//     <table width="100%" cellpadding="0" cellspacing="0">
//         <tr>
//             <td align="center" style="padding:24px;">

//                 <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:16px;">

//                     <!-- Header -->
//                     <tr>
//                         <td align="center" style="padding:32px; background:#FFF4F4;">
//                             <h1 style="margin:0; color:#FF6B6B;">Password Reset</h1>
//                         </td>
//                     </tr>

//                     <!-- Content -->
//                     <tr>
//                         <td style="padding:24px;">
//                             <p>Hello <strong>${name}</strong>,</p>

//                             <p style="font-size:14px; line-height:1.6;">
//                                 We received a request to reset your password. Click the button below to create a new one.
//                             </p>

//                             <!-- CTA -->
//                             <div style="text-align:center; margin:24px 0;">
//                                 <a href="${resetURL}" 
//                                    style="background:#FF6B6B; color:#fff; padding:12px 24px; border-radius:6px; text-decoration:none; font-weight:bold;">
//                                    Reset Password
//                                 </a>
//                             </div>

//                             <!-- Security Note -->
//                             <p style="font-size:13px; color:#777;">
//                                 This link will expire in 10 minutes for security reasons.
//                             </p>

//                             <p style="font-size:13px; color:#777;">
//                                 If you didn’t request this, you can safely ignore this email.
//                             </p>

//                             <!-- Fallback -->
//                             <p style="font-size:12px; color:#999;">
//                                 Or copy and paste this link:
//                             </p>

//                             <p style="font-size:12px; color:#999;">
//                                 ${resetURL}
//                             </p>

//                             <p style="margin-top:16px;">— The Synk Team</p>
//                         </td>
//                     </tr>

//                     <!-- Footer -->
//                     <tr>
//                         <td align="center" style="padding:16px; font-size:12px; color:#888; background:#F8F9FB;">
//                             © 2026 Synk. All rights reserved.
//                         </td>
//                     </tr>

//                 </table>

//             </td>
//         </tr>
//     </table>

//     </body>
//     </html>
//     `;
// }