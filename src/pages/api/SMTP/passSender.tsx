import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { image, email } = req.body;
  console.log(image);
  try {
    // Ensure the base64 string is properly formatted
    const base64Image = image.split(";base64,").pop();
    // const mimeType = image.match(/^data:(.+);base64,/)?.[1] || "image/png";

    // Create a nodemailer transporter using your email provider's SMTP settings
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Set it to true if using a secure connection (TLS/SSL)
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASS,
      },
    });

    // Create an email message
    const mailOptions = {
      from: process.env.ADMIN_EMAIL,
      to: email,
      subject: "🔔 Ding Dong! Your Prerana Pass is Here! 🎫",
      html: `
        <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PREЯANA Fest Invitation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 20px;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        h1, h2, h3 {
            color: #154561;
            text-align: center;
        }
        .highlight {
            font-weight: bold;
            color: #327ad1;
        }
        .emoji {
            font-size: 1.2em;
        }
        .btn {
            display: inline-block;
            background: #327ad1;
            color: #fff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
            margin: 10px auto;
            display: block;
            width: 50%;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 0.9em;
            align-items: center;
        }
        .image-container {
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
    <div class="image-container">
                <img src="cid:generated-pass" alt="Generated Pass" width="100%" height="auto" style="padding:10px; border-radius:5px; border:1px solid black;" />
              </div>
        <h2>🎫 You've Waited! You've Been Patient... It's Your Time Now! 🎫</h2>
        
        <h3>✨ You Know What They Say… ✨</h3>
        <p>Good things come to those who wait. And wow, have you been patient! If waiting were a sport, you'd probably have a gold medal by now. 🏆</p>
        
        <h3>🚀 The Wait Is Over! 🚀</h3>
        <p>After a brief delay, we're <span class="highlight">THRILLED</span> to announce that <strong>PREЯANA Fest</strong> is officially happening! 🎊</p>
        <p><strong>Mark your calendars:</strong> The fest kicks off in just <span class="highlight">2 days</span> on <strong>February 1st and February 2nd, 2025</strong>. Get ready for an epic celebration filled with excitement, creativity, and unforgettable moments!</p>
        
        <h3>🎟 Your Exclusive Pass Inside 🎟</h3>
        <p>Attached to this email, you’ll find your personal pass to the fest. Here’s how to get ready:</p>
        <ul>
            <li>📲 <strong>Download:</strong> Save it on your mobile device for easy access.</li>
            <li>👜 <strong>What to Bring:</strong> Don’t forget your ID and your big smile! 😄</li>
        </ul>
        
        <h3>💡 Pro Tips 😎</h3>
        <ul>
            <li>⏰ <strong>Arrive Early:</strong> Beat the crowds and secure the best spots for performances.</li>
            <li>🔍 <strong>Explore:</strong> Take time to check out all the activities and make the most of your day!</li>
            <li>📸 <strong>Capture Memories:</strong> Don’t forget to take photos and share your experiences with us!</li>
        </ul>
        
        <h3>❓ Need Assistance? ❓</h3>
        <p>Got questions or need help? No worries! Just reply to this email or reach out to our support team at <a href="mailto:preranafestgitam@gmail.com">preranafestgitam@gmail.com</a>. We’re here to ensure you have an amazing experience!</p>
        
        <h3>🤝 Thank You for Your Patience and Support! 🫂</h3>
        <p>Your incredible patience and unwavering support have brought us to this exciting moment. We can’t wait to celebrate with you and make <strong>PREЯANA Fest</strong> the best one yet!</p>
        
        <h2>🔥 Let’s Go PREЯANA! 🚀</h2>
        <p style="text-align:center;"><a href="#" class="btn">See You Soon!</a></p>
        
        <div class="footer">
            <p>Cheers,<br><strong>Team PREЯANA</strong></p>
            <img src="https://prerana-service.vercel.app/Prerana.png" alt="PREЯANA Logo" width="100px" height="auto" />
        </div>
    </div>
</body>
</html>
      `,
      attachments: [
        {
          filename: "pass.png",
          content: base64Image,
          encoding: "base64",
          cid: "generated-pass", // Content-ID for embedding in HTML
        },
      ],
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to send email" });
  }
};
