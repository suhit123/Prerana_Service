import React, { useRef, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";

const PassDesign = ({ name = "", email = "", mobile = "", affiliation = "",sendMailStatus=false }) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);
  const [mailSent, setMailSent] = useState("NO");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff"; // Set the background color
    // Load image to the canvas
    const img = new Image();
    img.src = "./template.jpg"; // Replace with your image URL
    img.onload = () => {
      ctx.drawImage(img, 320, 0, 1000, canvas.height);

      // Draw text on the canvas
      ctx.fillStyle = "#ffe6a3"; // Set the text color
      ctx.font = "16px Arial"; // Set the font size and family
      ctx.fillText("Name: " + name, 350, 250); // Positioning the text
      ctx.fillText("Mobile: +91 " + mobile, 350, 275); // Positioning the text
      ctx.fillText("Email: " + email, 350, 300); // Positioning the text
      ctx.fillText("Affiliation: " + affiliation, 350, 325); // Positioning the text

      // Generate and draw the QR code on canvas
      const qrCanvas = qrCodeRef.current;
      if (qrCanvas) {
        const qrDataUrl = qrCanvas.querySelector("canvas")?.toDataURL();
        if (qrDataUrl) {
          const qrImage = new Image();
          qrImage.src = qrDataUrl;
          qrImage.onload = () => {
            ctx.drawImage(qrImage, 10, 25, 300, 300); // Adjust the size and position of the QR code

            // Convert the canvas to a base64 image URL
            const dataUrl = canvas.toDataURL("image/png");
            setBase64Image(dataUrl);
            const sendMail = async () => {
              setMailSent("LOADING");
              try{
                await axios
                .post("/api/SMTP/passSender", {
                  image: dataUrl,
                  email: email,
                })
                .then((response) => {
                  console.log(response);
                  setMailSent("YES");
                })
                .catch((error) => {
                  console.error("Error sending mail: ", error);
                  setMailSent("UNABLE");
                });
              }
              catch (error) {
                console.error("Error sending mail: ", error);
                setMailSent("UNABLE");
              }
            };
            if(sendMailStatus)sendMail();
          };
        }
      }
    };
  }, [name, email, mobile, affiliation]);

  return (
    <div className="">
      {/* Canvas (hidden from the user but used to generate the image) */}
      <canvas
        ref={canvasRef}
        width={1320}
        height={350}
        style={{ display: "none" }} // Hide canvas element
      />
      {/* QR Code (hidden) */}
      <div ref={qrCodeRef} style={{ display: "none" }}>
        <QRCodeCanvas value={email} size={500} />
      </div>

      {/* Base64 image rendering (once generated) */}
      {base64Image && (
        <div className="flex justify-center">
          <img
            src={base64Image}
            alt="Generated Pass"
            className="w-full max-w-3xl rounded-xl border-2 border-gray-300 shadow-md p-4"
          />
        </div>
      )}
      
      {/* Mail status */}
      {mailSent === "LOADING" && sendMailStatus && (
        <div className="text-center text-gray-500">Sending mail...</div>
      )}
      {mailSent === "YES" && sendMailStatus && (
        <div className="text-center text-green-500">Mail sent successfully!</div>
      )}
      {mailSent === "NO" && sendMailStatus && (
        <div className="text-center text-gray-500">Mail not sent yet</div>
      )}
      {mailSent === "UNABLE" && sendMailStatus && (
        <div className="text-center text-red-500">Unable to send mail</div>
      )}
    </div>
  );
};

export default PassDesign;
