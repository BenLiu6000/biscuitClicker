const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const port = 8080;

app.use(express.json());
app.use(express.static(path.join(__dirname)));

async function getImgData(fileName) {
    try {
        console.log(`searching for: ${fileName}`);
        if(fs.existsSync(fileName)) {console.log("exists :>");} else {console.log("does not exist :<");};
        let imgData = fs.readFileSync(fileName);
        return createDataURL(imgData);
    } catch(err) {
        console.log(`error reading file: ${err}`);
    };
};

function createDataURL(binaryDataArray) {
    let binaryString = "";
    binaryDataArray.forEach(byte => {
        binaryString += String.fromCharCode(byte)
    });
    const base64String = btoa(binaryString);
    const dataUrl = `data:image/png;base64,${base64String}`;
    return dataUrl;
};

app.get("/", (req,res) => {
    console.log(`connection made from ${req.ip}`);

    res.set({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "image/png"
    });

    getImgData(req.query.fileName).then(function(imgData) {
        res.send(imgData);
        console.log("img data sent");
    });

});

app.listen(port, "localhost", () => {
    console.log(`server listening at http://localhost:${port}`);
});