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
        'SITE_8_QR_CODE_VALUE': 'ตึก A1-8 ฝั่งซ้าย',
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
        'SITE_19_QR_CODE_VALUE': 'ตึก A2-3 ฝั่งซ้าย',
        'SITE_20_QR_CODE_VALUE': 'ตึก A2-4 ฝั่งซ้าย',
        'SITE_21_QR_CODE_VALUE': 'ตึก A2-5 ฝั่งซ้าย',
        'SITE_22_QR_CODE_VALUE': 'ตึก A2-6 ฝั่งซ้าย',
        'SITE_23_QR_CODE_VALUE': 'ตึก A2-7 ฝั่งซ้าย',
        'SITE_24_QR_CODE_VALUE': 'ตึก A2-8 ฝั่งซ้าย',
        'SITE_25_QR_CODE_VALUE': 'ตึก A2-1 ฝั่งขวา',
        'SITE_26_QR_CODE_VALUE': 'ตึก A2-2 ฝั่งขวา',
        'SITE_27_QR_CODE_VALUE': 'ตึก A2-3 ฝั่งขวา',
        'SITE_28_QR_CODE_VALUE': 'ตึก A2-4 ฝั่งขวา',
        'SITE_29_QR_CODE_VALUE': 'ตึก A2-5 ฝั่งขวา',
        'SITE_30_QR_CODE_VALUE': 'ตึก A2-6 ฝั่งขวา',
        'SITE_31_QR_CODE_VALUE': 'ตึก A2-7 ฝั่งขวา',
        'SITE_32_QR_CODE_VALUE': 'ตึก A2-8 ฝั่งขวา',
        'SITE_33_QR_CODE_VALUE': 'ตึก C3-1 ฝั่งซ้าย',
        'SITE_34_QR_CODE_VALUE': 'ตึก C3-2 ฝั่งซ้าย',
        'SITE_35_QR_CODE_VALUE': 'ตึก C3-3 ฝั่งซ้าย',
        'SITE_36_QR_CODE_VALUE': 'ตึก C3-4 ฝั่งซ้าย',
        'SITE_37_QR_CODE_VALUE': 'ตึก C3-5 ฝั่งซ้าย',
        'SITE_38_QR_CODE_VALUE': 'ตึก C3-6 ฝั่งซ้าย',
        'SITE_39_QR_CODE_VALUE': 'ตึก C3-7 ฝั่งซ้าย',
        'SITE_40_QR_CODE_VALUE': 'ตึก C3-8 ฝั่งซ้าย',
        'SITE_41_QR_CODE_VALUE': 'ตึก C3-1 ฝั่งขวา',
        'SITE_42_QR_CODE_VALUE': 'ตึก C3-2 ฝั่งขวา',
        'SITE_43_QR_CODE_VALUE': 'ตึก C3-3 ฝั่งขวา',
        'SITE_44_QR_CODE_VALUE': 'ตึก C3-4 ฝั่งขวา',
        'SITE_45_QR_CODE_VALUE': 'ตึก C3-5 ฝั่งขวา',
        'SITE_46_QR_CODE_VALUE': 'ตึก C3-6 ฝั่งขวา',
        'SITE_47_QR_CODE_VALUE': 'ตึก C3-7 ฝั่งขวา',
        'SITE_48_QR_CODE_VALUE': 'ตึก C3-8 ฝั่งขวา',
        'SITE_49_QR_CODE_VALUE': 'ตึก E2-1 ฝั่งซ้าย',
        'SITE_50_QR_CODE_VALUE': 'ตึก E2-2 ฝั่งซ้าย',
        'SITE_51_QR_CODE_VALUE': 'ตึก E2-3 ฝั่งซ้าย',
        'SITE_52_QR_CODE_VALUE': 'ตึก E2-4 ฝั่งซ้าย',
        'SITE_53_QR_CODE_VALUE': 'ตึก E2-5 ฝั่งซ้าย',
        'SITE_54_QR_CODE_VALUE': 'ตึก E2-6 ฝั่งซ้าย',
        'SITE_55_QR_CODE_VALUE': 'ตึก E2-7 ฝั่งซ้าย',
        'SITE_56_QR_CODE_VALUE': 'ตึก E2-8 ฝั่งซ้าย',
        'SITE_57_QR_CODE_VALUE': 'ตึก E2-1 ฝั่งขวา',
        'SITE_58_QR_CODE_VALUE': 'ตึก E2-2 ฝั่งขวา',
        'SITE_59_QR_CODE_VALUE': 'ตึก E2-3 ฝั่งขวา',
        'SITE_60_QR_CODE_VALUE': 'ตึก E2-4 ฝั่งขวา',
        'SITE_61_QR_CODE_VALUE': 'ตึก E2-5 ฝั่งขวา',
        'SITE_62_QR_CODE_VALUE': 'ตึก E2-6 ฝั่งขวา',
        'SITE_63_QR_CODE_VALUE': 'ตึก E2-7 ฝั่งขวา',
        'SITE_64_QR_CODE_VALUE': 'ตึก E2-8 ฝั่งขวา',
        'SITE_65_QR_CODE_VALUE': 'ตึก B1-1',
        'SITE_66_QR_CODE_VALUE': 'ตึก B1-2',
        'SITE_67_QR_CODE_VALUE': 'ตึก B1-3',
        'SITE_68_QR_CODE_VALUE': 'ตึก B1-4',
        'SITE_69_QR_CODE_VALUE': 'ตึก B1-5',
        'SITE_70_QR_CODE_VALUE': 'ตึก B1-6',
        'SITE_71_QR_CODE_VALUE': 'ตึก B1-7',
        'SITE_72_QR_CODE_VALUE': 'ตึก B1-8',
        'SITE_73_QR_CODE_VALUE': 'ตึก B2-1',
        'SITE_74_QR_CODE_VALUE': 'ตึก B2-2',
        'SITE_75_QR_CODE_VALUE': 'ตึก B2-3',
        'SITE_76_QR_CODE_VALUE': 'ตึก B2-4',
        'SITE_77_QR_CODE_VALUE': 'ตึก B2-5',
        'SITE_78_QR_CODE_VALUE': 'ตึก B2-6',
        'SITE_79_QR_CODE_VALUE': 'ตึก B2-7',
        'SITE_80_QR_CODE_VALUE': 'ตึก B2-8',
        'SITE_81_QR_CODE_VALUE': 'ตึก B3-1',
        'SITE_82_QR_CODE_VALUE': 'ตึก B3-2',
        'SITE_83_QR_CODE_VALUE': 'ตึก B3-3',
        'SITE_84_QR_CODE_VALUE': 'ตึก B3-4',
        'SITE_85_QR_CODE_VALUE': 'ตึก B3-5',
        'SITE_86_QR_CODE_VALUE': 'ตึก B3-6',
        'SITE_87_QR_CODE_VALUE': 'ตึก B3-7',
        'SITE_88_QR_CODE_VALUE': 'ตึก B3-8',
        'SITE_89_QR_CODE_VALUE': 'ตึก B4-1',
        'SITE_90_QR_CODE_VALUE': 'ตึก B4-2',
        'SITE_91_QR_CODE_VALUE': 'ตึก B4-3',
        'SITE_92_QR_CODE_VALUE': 'ตึก B4-4',
        'SITE_93_QR_CODE_VALUE': 'ตึก B4-5',
        'SITE_94_QR_CODE_VALUE': 'ตึก B4-6',
        'SITE_95_QR_CODE_VALUE': 'ตึก B4-7',
        'SITE_96_QR_CODE_VALUE': 'ตึก B4-8',
        'SITE_97_QR_CODE_VALUE': 'ตึก B5-1',
        'SITE_98_QR_CODE_VALUE': 'ตึก B5-2',
        'SITE_99_QR_CODE_VALUE': 'ตึก B5-3',
        'SITE_100_QR_CODE_VALUE': 'ตึก B5-4',
        'SITE_101_QR_CODE_VALUE': 'ตึก B5-5',
        'SITE_102_QR_CODE_VALUE': 'ตึก B5-6',
        'SITE_103_QR_CODE_VALUE': 'ตึก B5-7',
        'SITE_104_QR_CODE_VALUE': 'ตึก B5-8',
        'SITE_105_QR_CODE_VALUE': 'ตึก B6-1',
        'SITE_106_QR_CODE_VALUE': 'ตึก B6-2',
        'SITE_107_QR_CODE_VALUE': 'ตึก B6-3',
        'SITE_108_QR_CODE_VALUE': 'ตึก B6-4',
        'SITE_109_QR_CODE_VALUE': 'ตึก B6-5',
        'SITE_110_QR_CODE_VALUE': 'ตึก B6-6',
        'SITE_111_QR_CODE_VALUE': 'ตึก B6-7',
        'SITE_112_QR_CODE_VALUE': 'ตึก B6-8',
        'SITE_113_QR_CODE_VALUE': 'ตึก E1-1',
        'SITE_114_QR_CODE_VALUE': 'ตึก E1-2',
        'SITE_115_QR_CODE_VALUE': 'ตึก E1-3',
        'SITE_116_QR_CODE_VALUE': 'ตึก E1-4',
        'SITE_117_QR_CODE_VALUE': 'ตึก E1-5',
        'SITE_118_QR_CODE_VALUE': 'ตึก E1-6',
        'SITE_119_QR_CODE_VALUE': 'ตึก E1-7',
        'SITE_120_QR_CODE_VALUE': 'ตึก E1-8',
        'SITE_121_QR_CODE_VALUE': 'ตึก D1-1',
        'SITE_122_QR_CODE_VALUE': 'ตึก D1-2',
        'SITE_123_QR_CODE_VALUE': 'ตึก D1-3',
        'SITE_124_QR_CODE_VALUE': 'ตึก D1-4',
        'SITE_125_QR_CODE_VALUE': 'ตึก D1-5',
        'SITE_126_QR_CODE_VALUE': 'ตึก D1-6',
        'SITE_127_QR_CODE_VALUE': 'ตึก D1-7',
        'SITE_128_QR_CODE_VALUE': 'ตึก D1-8',
        'SITE_129_QR_CODE_VALUE': 'ตึก D2-1',
        'SITE_130_QR_CODE_VALUE': 'ตึก D2-2',
        'SITE_131_QR_CODE_VALUE': 'ตึก D2-3',
        'SITE_132_QR_CODE_VALUE': 'ตึก D2-4',
        'SITE_133_QR_CODE_VALUE': 'ตึก D2-5',
        'SITE_134_QR_CODE_VALUE': 'ตึก D2-6',
        'SITE_135_QR_CODE_VALUE': 'ตึก D2-7',
        'SITE_136_QR_CODE_VALUE': 'ตึก D2-8',
        'SITE_137_QR_CODE_VALUE': 'ตึก D3-1',
        'SITE_138_QR_CODE_VALUE': 'ตึก D3-2',
        'SITE_139_QR_CODE_VALUE': 'ตึก D3-3',
        'SITE_140_QR_CODE_VALUE': 'ตึก D3-4',
        'SITE_141_QR_CODE_VALUE': 'ตึก D3-5',
        'SITE_142_QR_CODE_VALUE': 'ตึก D3-6',
        'SITE_143_QR_CODE_VALUE': 'ตึก D3-7',
        'SITE_144_QR_CODE_VALUE': 'ตึก D3-8',
        'SITE_145_QR_CODE_VALUE': 'ตึก D4-1',
        'SITE_146_QR_CODE_VALUE': 'ตึก D4-2',
        'SITE_147_QR_CODE_VALUE': 'ตึก D4-3',
        'SITE_148_QR_CODE_VALUE': 'ตึก D4-4',
        'SITE_149_QR_CODE_VALUE': 'ตึก D4-5',
        'SITE_150_QR_CODE_VALUE': 'ตึก D4-6',
        'SITE_151_QR_CODE_VALUE': 'ตึก D4-7',
        'SITE_152_QR_CODE_VALUE': 'ตึก D4-8',
        'SITE_153_QR_CODE_VALUE': 'ตึก C1-1',
        'SITE_154_QR_CODE_VALUE': 'ตึก C1-2',
        'SITE_155_QR_CODE_VALUE': 'ตึก C1-3',
        'SITE_156_QR_CODE_VALUE': 'ตึก C1-4',
        'SITE_157_QR_CODE_VALUE': 'ตึก C1-5',
        'SITE_158_QR_CODE_VALUE': 'ตึก C1-6',
        'SITE_159_QR_CODE_VALUE': 'ตึก C1-7',
        'SITE_160_QR_CODE_VALUE': 'ตึก C1-8',
        'SITE_161_QR_CODE_VALUE': 'ตึก C2-1',
        'SITE_162_QR_CODE_VALUE': 'ตึก C2-2',
        'SITE_163_QR_CODE_VALUE': 'ตึก C2-3',
        'SITE_164_QR_CODE_VALUE': 'ตึก C2-4',
        'SITE_165_QR_CODE_VALUE': 'ตึก C2-5',
        'SITE_166_QR_CODE_VALUE': 'ตึก C2-6',
        'SITE_167_QR_CODE_VALUE': 'ตึก C2-7',
        'SITE_168_QR_CODE_VALUE': 'ตึก C2-8',
        'SITE_169_QR_CODE_VALUE': 'ตึก C4-1',
        'SITE_170_QR_CODE_VALUE': 'ตึก C4-2',
        'SITE_171_QR_CODE_VALUE': 'ตึก C4-3',
        'SITE_172_QR_CODE_VALUE': 'ตึก C4-4',
        'SITE_173_QR_CODE_VALUE': 'ตึก C4-5',
        'SITE_174_QR_CODE_VALUE': 'ตึก C4-6',
        'SITE_175_QR_CODE_VALUE': 'ตึก C4-7',
        'SITE_176_QR_CODE_VALUE': 'ตึก C4-8',
        'SITE_177_QR_CODE_VALUE': 'ตึก C5-1',
        'SITE_178_QR_CODE_VALUE': 'ตึก C5-2',
        'SITE_179_QR_CODE_VALUE': 'ตึก C5-3',
        'SITE_180_QR_CODE_VALUE': 'ตึก C5-4',
        'SITE_181_QR_CODE_VALUE': 'ตึก C5-5',
        'SITE_182_QR_CODE_VALUE': 'ตึก C5-6',
        'SITE_183_QR_CODE_VALUE': 'ตึก C5-7',
        'SITE_184_QR_CODE_VALUE': 'ตึก C5-8',

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
    form.addEventListener('submit', function (event) {
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
