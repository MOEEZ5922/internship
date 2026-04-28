const fs = require('fs');
const { PDFParse } = require('pdf-parse');

async function readPdfs() {
    let files = [
        "C:\\Users\\mahmed\\Downloads\\internship\\files\\confpaper\\Conference Paper(Evaluating Digital Biomarker Implementation in Personalized CPAP Therapy).pdf",
        "C:\\Users\\mahmed\\Downloads\\internship\\files\\confpaper\\pcbi.1005619 (1).pdf"
    ];

    for (let file of files) {
        try {
            const dataBuffer = fs.readFileSync(file);
            const parser = new PDFParse({ data: dataBuffer });
            
            const result = await parser.getText({});
            console.log("=== FILE: " + file + " ===");
            console.log(result.text.substring(0, 3000)); // Print more to see structure
            console.log("=========================================\n");
            
            await parser.destroy();
        } catch (err) {
            console.error("Error reading " + file, err.message);
        }
    }
}

readPdfs();
