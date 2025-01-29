import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { image } = req.body;
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
      to: process.env.ADMIN_EMAIL,
      subject: "The Wait Is Over—Your Prerana Fest Passes Have Arrived! 🎉",
      html: `
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Contact Form Submission</title>
            <style>
              body { font-family: Arial, sans-serif; background-color: #ffffff; padding: 20px; }
              .container { background-color: #ffffff; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); }
              .image-container { text-align: center; margin-bottom: 20px; }
              .download-button { display: inline-block; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 5px; }
              .download-button:hover { background-color: #0056b3; }
            </style>
          </head>
          <body>
            <div class="container">
              <p>Here is the generated pass</p>
              <div class="image-container">
                <img src="cid:generated-pass" alt="Generated Pass" width="100%" height="auto" style="padding:10px; border-radius:5px; border:1px solid black;" />
              </div>
              <div class="text-center" style="display: flex; justify-content: center; align-items: center;">
                <a href="cid:generated-pass" download="pass.png" class="download-button">Download Pass</a>
              </div>
              <div>
                <p>Hey Prerana Fam!</p>
                <p>Wow, what an incredible two days we just had at Prerana Fest! From the electrifying performances to the unforgettable moments, you all made it a celebration to remember. 🙌🔥</p>
                <p>First off, a HUGE thank you for your patience and unwavering support while we navigated those unexpected twists. Your enthusiasm kept the spirit alive, and we couldn’t have done it without each and every one of you! 🌟❤</p>
                <p>Drumroll, please… 🥁</p>
                <p>Your exclusive Prerana Fest passes are here! 🎟✨ Whether you want to relive the magic through our event highlights, access behind-the-scenes content, or gear up for next year’s epicness, these passes are your golden ticket to all things Prerana!</p>
                <h3>What’s Inside Your Fest Pass:</h3>
                <ul>
                  <li><b>VIP Access to Event Recordings:</b> Missed a moment or want to watch your favorite performances again? It’s all here! 📹🎶</li>
                  <li><b>Exclusive Behind-the-Scenes Content:</b> Get up close and personal with the magic that happens backstage. 🎬✨</li>
                  <li><b>Sneak Peeks for Next Year:</b> Be the first to know about what’s brewing for Prerana Fest 2026! 🚀🎆</li>
                  <li><b>Special Surprises & Giveaways:</b> Because who doesn’t love a little extra sparkle? 🎁🎉</li>
                </ul>
                <h3>How to Access Your Pass:</h3>
                <ul>
                  <li><b>Check Your Inbox:</b> We’ve sent your personalized pass to your email. If you don’t see it, give your spam folder a quick peek! 📬🔍</li>
                  <li><b>Click & Enjoy:</b> Follow the simple instructions to unlock all the amazing content waiting for you. It’s that easy! 🖱💻</li>
                </ul>
                <p>But wait, there’s MORE! 🌈✨ We’re just getting started on keeping the Prerana spirit alive. Stay tuned for upcoming events, virtual hangouts, and exclusive content that will keep you buzzing until next year’s fest!</p>
                <p><b>Spread the Love:</b> Loved the fest? Share your favorite moments on social media using <b>#PreranaFest2025</b> and tag us! Let’s keep the memories alive and inspire others to join our incredible community. 📸💬</p>
                <p>Once again, thank you for being the heart and soul of Prerana Fest. Your energy, passion, and joy made these two days nothing short of legendary. Here’s to many more amazing moments together! 🥂✨</p>
                <p>See you soon with more magic and fun! 😉</p>
                <p><b>P.S.</b> If you have any questions or need assistance with your pass, don’t hesitate to reach out to us at <b>preranafestgitam@gmail.com</b>. We’re here to help!</p>
                <p><b>Warmest wishes,</b></p>
                <p><b>Prerana Fest Organizing Committee</b></p>
                <img src="http://prerana-service.vercel.app/Prerana.png" alt="Prerana Fest Logo" width="100" height="auto" />
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