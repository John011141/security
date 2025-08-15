document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const qrScannerDiv = document.getElementById('reader');
    const form = document.getElementById('reportForm');
    const locationInput = document.getElementById('location');
    const timestampInput = document.getElementById('timestamp');

    const uploadImageButton = document.getElementById('uploadImageButton');
    const imageUpload = document.getElementById('imageUpload');
    const imagePreview = document.getElementById('imagePreview');
    const imageDataInput = document.getElementById('imageData');

    // ** ⚠️ แก้ไข URL นี้เป็น URL ของ Google Apps Script ของคุณ ⚠️ **
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbw6jLi9dyzYuidD5KiTHygAPv9BkmD8Hop9VX5SvANWPTwiAA1WdzfEl479YICC-VYd6g/exec';

    // Map QR Code value to a readable location name
    const qr_code_map = {
        'SITE_A_QR_CODE_VALUE': 'ประตูทางเข้า 1',
        'SITE_B_QR_CODE_VALUE': 'อาคาร A',
        'SITE_C_QR_CODE_VALUE': 'ลานจอดรถ',
        // เพิ่มรายการ QR Code และสถานที่อื่น ๆ ที่นี่
    };

    startButton.addEventListener('click', () => {
        startButton.style.display = 'none';
        qrScannerDiv.style.display = 'block';

        const html5QrCode = new Html5Qrcode("reader");
        const qrCodeConfig = { fps: 10, qrbox: { width: 250, height: 250 } };

        html5QrCode.start({ facingMode: "environment" }, qrCodeConfig, (decodedText) => {
            let locationName = qr_code_map[decodedText];
            if (locationName) {
                locationInput.value = locationName;
                
                const now = new Date();
                timestampInput.value = now.toLocaleString('th-TH');

                qrScannerDiv.style.display = 'none';
                form.style.display = 'block';
                html5QrCode.stop();
            } else {
                alert('ไม่พบข้อมูลสถานที่ที่ตรงกับ QR Code นี้');
            }
        });
    });

    // Image upload logic
    uploadImageButton.addEventListener('click', () => {
        imageUpload.click();
    });

    imageUpload.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files.length > 0 ? event.target.files.item(0) : null;
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                imagePreview.innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 150px;">`;
                imageDataInput.value = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle form submission
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => (data["report_" + key] = value));

        fetch(googleAppsScriptURL, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors'
        })
        .then(() => {
            alert('รายงานถูกส่งเรียบร้อยแล้ว!');
            window.location.reload(); 
        })
        .catch(error => {
            console.error('Error:', error);
            alert('เกิดข้อผิดพลาดในการส่งข้อมูล');
        });
    });
});