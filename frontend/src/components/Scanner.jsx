import { Html5QrcodeScanner } from 'html5-qrcode';
import { useEffect } from 'react';

const Scanner = ({ onScanSuccess }) => {
  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "qr-reader",
      { fps: 10, qrbox: 250 },
      false
    );

    scanner.render(onScanSuccess, error => {
      console.warn(`QR scan error: ${error}`);
    });

    return () => {
      scanner.clear().catch(error => console.error("Scanner clear error:", error));
    };
  }, [onScanSuccess]);

  return <div id="qr-reader" className='text-white'/>;
};

export default Scanner;
