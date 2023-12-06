import html2canvas from "html2canvas";
import QRCode from "qrcode.react";
import { useRef, useState } from "react";
import { Button } from "react-bootstrap";

const QRGenerateButton = () => {
  const url = "http://localhost:3000/main";
  const [isGenerated, setIsGenerated] = useState(false);
  const qrCodeRef = useRef(null);

  const saveAsPNG = () => {
    const input = qrCodeRef.current;

    if (input) {
      html2canvas(input).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = imgData;
        link.download = "qrcode.png";
        link.click();
      });
    }
  };

  return (
    <>
      <Button variant="danger" onClick={()=>setIsGenerated(true)}>
        Generate QR-code
      </Button>
      {isGenerated && (
        <div>
          <div style={{ width: 300, height: 300 }}>
            <div ref={qrCodeRef}>
              <QRCode
                value={url}
                size={256}
                viewBox={`0 0 256 256`}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
          </div>
          <Button variant="danger" onClick={saveAsPNG}>
            Save QR-code
          </Button>
        </div>
      )}
    </>
  );
};

export default QRGenerateButton;
