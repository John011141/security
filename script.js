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
    const googleAppsScriptURL = 'https://script.google.com/macros/s/AKfycbysjDL5H6G8mlza60qEOiDqLX_A-qDIrP_ltX7Ver8-zaqzhqFE7fGtr8iRhw-c-mcS/exec';

    // Map QR Code value to a readable location name
    const qr_code_map = {
        'SITE_1_QR_CODE_VALUE': 'ตึก A1-1 ฝั่งซ้าย',
        'SITE_2_QR_CODE_VALUE': 'ตึก A1-2 ฝั่งซ้าย',
        'SITE_3_QR_CODE_VALUE': 'ตึก A1-3 ฝั่งซ้าย',
         'SITE_4_QR_CODE_VALUE': 'ตึก A1-4 ฝั่งซ้าย',
        'SITE_5_QR_CODE_VALUE': 'ตึก A1-5 ฝั่งซ้าย',
        'SITE_6_QR_CODE_VALUE': 'ตึก A1-6 ฝั่งซ้าย',
           'SITE_7_QR_CODE_VALUE': 'ตึก A1-7 ฝั่งซ้าย',
        'SITE_8_QR_CODE_VALUE':'ตึก A1-8 ฝั่งซ้าย',
        'SITE_9_QR_CODE_VALUE': 'ตึก A1-1 ฝั่งขวา',
         'SITE_10_QR_CODE_VALUE': 'ตึก A1-2 ฝั่งขวา',
        'SITE_11_QR_CODE_VALUE': 'ตึก A1-3 ฝั่งขวา',
        'SITE_12_QR_CODE_VALUE': 'ตึก A1-4 ฝั่งขวา',
           'SITE_13_QR_CODE_VALUE': 'ตึก A1-5 ฝั่งขวา',
        'SITE_14_QR_CODE_VALUE': 'ตึก A1-6 ฝั่งขวา',
        'SITE_15_QR_CODE_VALUE': 'ตึก A1-7 ฝั่งขวา',
         'SITE_16_QR_CODE_VALUE': 'ตึก A1-8 ฝั่งขวา',
        'SITE_17_QR_CODE_VALUE': 'ตึก A2-1 ฝั่งซ้าย',
        'SITE_18_QR_CODE_VALUE': 'ตึก A2-2 ฝั่งซ้าย',
           'SITE_19_QR_CODE_VALUE':'ตึก A2-3 ฝั่งซ้าย',
        'SITE_20_QR_CODE_VALUE': 'ตึก A2-4 ฝั่งซ้าย',
        'SITE_21_QR_CODE_VALUE': 'ตึก A2-5 ฝั่งซ้าย',
         'SITE_22_QR_CODE_VALUE': 'ตึก A2-6 ฝั่งซ้าย',
        'SITE_23_QR_CODE_VALUE': 'ตึก A2-7 ฝั่งซ้าย',
        'SITE_24_QR_CODE_VALUE': 'ตึก A2-8 ฝั่งซ้าย',
           'SITE_25_QR_CODE_VALUE': 'ตึก A2-1 ฝั่งซ้าย',
        'SITE_26_QR_CODE_VALUE': 'อาคาร A',
        'SITE_27_QR_CODE_VALUE': 'ลานจอดรถ',
         'SITE_28_QR_CODE_VALUE': 'B1-1',
        'SITE_29_QR_CODE_VALUE': 'อาคาร A',
        'SITE_30_QR_CODE_VALUE': 'ลานจอดรถ',
           'SITE_31_QR_CODE_VALUE': 'B1-1',
        'SITE_32_QR_CODE_VALUE': 'อาคาร A',
        'SITE_33_QR_CODE_VALUE': 'ลานจอดรถ',
         'SITE_34_QR_CODE_VALUE': 'B1-1',
        'SITE_35_QR_CODE_VALUE': 'อาคาร A',
        'SITE_36_QR_CODE_VALUE': 'ลานจอดรถ',
         'SITE_37_QR_CODE_VALUE': 'ลานจอดรถ',
             'SITE_38_QR_CODE_VALUE': 'ลานจอดรถ',
                 'SITE_39_QR_CODE_VALUE': 'ลานจอดรถ',
                     'SITE_40_QR_CODE_VALUE': 'ลานจอดรถ',
                       'SITE_41_QR_CODE_VALUE': 'B1-1',
        'SITE_42_QR_CODE_VALUE': 'อาคาร A',
        'SITE_43_QR_CODE_VALUE': 'ลานจอดรถ',
         'SITE_44_QR_CODE_VALUE': 'B1-1',
        'SITE_45_QR_CODE_VALUE': 'อาคาร A',
        'SITE_46_QR_CODE_VALUE': 'ลานจอดรถ',
         'SITE_47_QR_CODE_VALUE': 'ลานจอดรถ',
             'SITE_48_QR_CODE_VALUE': 'ลานจอดรถ',
                 'SITE_49_QR_CODE_VALUE': 'ลานจอดรถ',
                     'SITE_50_QR_CODE_VALUE': 'ลานจอดรถ',
                       'SITE_51_QR_CODE_VALUE': 'B1-1',
        'SITE_52_QR_CODE_VALUE': 'อาคาร A',
        'SITE_53_QR_CODE_VALUE': 'ลานจอดรถ',
         'SITE_54_QR_CODE_VALUE': 'B1-1',
        'SITE_55_QR_CODE_VALUE': 'อาคาร A',
        'SITE_56_QR_CODE_VALUE': 'ลานจอดรถ',
         'SITE_57_QR_CODE_VALUE': 'ลานจอดรถ',
             'SITE_58_QR_CODE_VALUE': 'ลานจอดรถ',
                 'SITE_59_QR_CODE_VALUE': 'ลานจอดรถ',
                     'SITE_60_QR_CODE_VALUE': 'ลานจอดรถ',

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
