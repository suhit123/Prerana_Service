import React, { useRef, useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import axios from "axios";
const PassDesign = ({ name = "", email = "", mobile = "", affiliation = "" }) => {
  const [base64Image, setBase64Image] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const qrCodeRef = useRef<HTMLDivElement>(null);

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
      ctx.fillText("Name: "+name, 350, 250); // Positioning the text
      ctx.fillText("Mobile: +91 " + mobile, 350, 275); // Positioning the text
      ctx.fillText("Email: "+email, 350, 300); // Positioning the text
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
              await axios.post("/api/SMTP/passSender", { image: dataUrl ,
                email: email,
              });
            };
            sendMail();
          };
        }
      }
    };
  }, [name, email, mobile, affiliation]);

  return (
    <div className="m-6">
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
        <img src={base64Image} alt="Generated Pass" width={'100%'}  style={{
          padding: "10px",
          borderRadius: "5px",
          border: "1px solid black",
        }}/>
      )}
    </div>
  );
};

export default PassDesign;
