const puppeteer = require('puppeteer');

const pdfReport = async (req,res) => {
     // We get all the information for report from Electron
    const {
        name='Md Shariq',
        Age,
        Gender,
        BMI,
        SBP,
        DBP,
        FPG,
        HDL,
        LDL,
        ALT,
        BUN,
        CCR,
        FFPG,
        smoking,
        drinking,
        family_histroy,
        prediction = 'Diabetic'
    } = req.body

    const isDiabetes = (prediction == 'Diabetic') ? true : false;
    // Design the PDF Report
    const html=`
    <html>
        <head>
            <style>
                body {font-size: 12px; padding: 20px;}
                .header {text-align: center; font-size: 20px; font-weight: bold; color: #004080;}
                .sub-header {background: #002E5D; color: #fff; padding: 5px; text-align: center; margin-top: 5px;}
                .patient-info {border: 1px solid #000; margin-top: 10px; padding: 4px;}
                .patient-info table {width: 100%; font-size: 12px;}
                .patient-info td {padding: 3px;}
                .section-title {font-weight: bold; margin-top: 15px; font-size: 14px; text-decoration: underline;}
                table.report {width: 100%; border-collapse: collapse; margin-top: 5px;}
                table.report td {padding: 4px; border-bottom: 1px solid #ccc;}
                .footer {text-align: center; margin-top: 30px; font-style: italic;}
                .signature {text-align: right; margin-top: 40px;}
                .signature span {border-top: 1px solid #000; display: inline-block;padding-top: 5px;}
            </style>
        </head>
        <body>
            <div class="header">Medico</div>
            <div class="sub-header">LABORATORY REPORT</div>
            <div class="patient-info">
                <table>
                    <tr>
                        <td><b>Name : </b>${name}</td>
                        <td><b>Age : </b>${Age}</td>
                        <td><b>Gender : </b>${Gender == 1 ? 'Female' : 'Male'}</td>
                    </tr>

                    <tr>
                        <td><b>Visit No:</b> A0000000 - KOLK</td>
                        <td><b>Collected on:</b> ${new Date().toLocaleTimeString()}</td>
                        <td><b>Reported on:</b> ${new Date().toLocaleTimeString()}</td>
                    </tr>
                </table>
            </div>
            <div class="section-title">Type I Diabetes Test</div>

            <div class="section-title" style="text-decoration:none;">PERSONAL INFORMATION</div>
            <table class="report">
                <tr><td>Age</td><td>${Age}</td></tr>
                <tr><td>Gender</td><td>${Gender == 1 ? 'Female' : 'Male'}</td></tr>
                <tr><td>BMI</td><td>${BMI}</td></tr>
                <tr><td>Family History of Diabetes</td><td>${family_histroy == 1 ? 'Yes' : 'No'}</td></tr>
            </table>
            <div class="section-title" style="text-decoration:none;">VITAL SIGNS AND GLUCOSE LEVELS</div>
            <table class="report">
                <tr><td>Systlic Blood Pressure</td><td>${SBP}</td></tr>
                <tr><td>Diastolic Blood Pressure</td><td>${DBP}</td></tr>
                <tr><td>Fasting Plasma Glucose</td><td>${FPG}</td></tr>
                <tr><td>Final Fasting Plasma Glucose</td><td>${FFPG}</td></tr>
            </table>
            <div class="section-title" style="text-decoration:none;">BLOOD AND BIOCHEMICAL PROFILE</div>
            <table class="report">
                <tr><td>High-Density Lipoprotein</td><td>${HDL}</td></tr>
                <tr><td>Low-Density Lipoprotein</td><td>${LDL}</td></tr>
                <tr><td>Alanine Aminotransferase</td><td>${ALT}</td></tr>
                <tr><td>Blood Urea Nitrogen</td><td>${BUN}</td></tr>
                <tr><td>Creatinine Clearance</td><td>${CCR}</td></tr>
            </table>
            <div class="section-title" style="text-decoration:none;">LIFESTYLE FACTORS</div>
            <table class="report">
                <tr><td>Smoking Status</td><td>${smoking == 1 ? 'Current Smoker' : (smoking == 2) ? 'Ever Smoker' : 'Never Smoker'}</td></tr>
                <tr><td>Drinking Status</td><td>${drinking == 1 ? 'Current Drinker' : (drinking == 2) ? 'Ever Drinker' : 'Never Drinker'}</td></tr>
            </table>
            <div class="section-title" style="text-decoration:underline;">RESULT / INTERPRETATION</div>
            <div style="border: 3px solid ${isDiabetes ? 'red' : 'green'}; padding: 10px; margin-top: 5px; font-size: 13px;">
                <p><b>Clinical Interpretation: </b>Based on our ML model prediction, the indivisual is <span style="color: ${isDiabetes ? 'red' : 'green'}; font-weight: bold;">${prediction}</span>.</p>
                <p style="margin-top: 8px;">It is ${isDiabetes ? 'strongly' : 'still'} recommended to consult a <b>Diabetologist</b> for further treatment</p>
                <p style="margin-top: 8px; font-size: 12px; color: #444;"><i>This is a model-based prediction. Final diagnosis must be confirmed by the doctor.</i></p>
            </div> 
            <div class="footer" style="font-weight: bolder;">------------------------------  END OF REPORT  ------------------------------</div>

            <div class="signature">
                <span>Dr. Anfaas Vettiyapuri <br/>General Physician</span>
            </div>

            <div style="margin-top: 20px; font-size: 10px; text-align: center;">
                Report Printed on : ${new Date().toLocaleDateString()}<br/>
                MediCo - Chennai, Tamil Nadu<br/>
                Telephone: +080 123 456 7890 | www.medico.com
            </div>
        </body>
    </html>
   `;   
    
    // Launching a browser object (Headless so puppeteer can work without GUI)
    const browser = await puppeteer.launch({
        executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
        headless:true,
    });
    // Open a new page in browser
    const page = await browser.newPage();
    // Render HTML,CSS and JS in Chromium
    await page.setContent(html,{waitUntil:'networkidle0'});
    // Generate PDF( HTML --> PDF)
    const pdf = await page.pdf({format:'A4',printBackground:true});
    // Close the browser
    await browser.close();
    // Set the properties of generated PDF
    res.set({
        'Content-Type':'application/pdf',
        'Content-Disposition':"attachment; filename=diabetes_report.pdf",
    });
    // Send the Report to Electron
    return res.send(pdf);
}

module.exports = pdfReport;