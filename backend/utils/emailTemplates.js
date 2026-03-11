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