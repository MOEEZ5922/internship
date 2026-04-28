const fs = require('fs');
const pp = require('pdf-parse');

async function test() {
    const parser = new pp.PDFParse({});
    const file = "C:\\Users\\mahmed\\Downloads\\internship\\files\\confpaper\\Conference Paper(Evaluating Digital Biomarker Implementation in Personalized CPAP Therapy).pdf";
    const dataBuffer = fs.readFileSync(file);
    try {
        // Try passing the buffer in different ways
        console.log('Trying with { data: dataBuffer }');
        const text = await parser.getText({ data: dataBuffer });
        console.log('Text preview:', text.substring(0, 100));
    } catch (e) {
        console.error('Error with { data }: ', e.message);
        try {
            console.log('Trying with dataBuffer directly');
            const text2 = await parser.getText(dataBuffer);
            console.log('Text preview:', text2.substring(0, 100));
        } catch (e2) {
             console.error('Error with buffer directly: ', e2.message);
        }
    }
}

test();
