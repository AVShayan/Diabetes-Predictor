/* This controller handles the request and response between Electron and FastAPI */

require('dotenv').config();
const predictDiabetes = async (req,res) => {
    // We already handle missing values in Electron (Assume all data is provided)
    // We get the JSON input from Electron
    try{
        // Recieve the features list from Electron
        const features = req.body;
        console.log(features);
        // Send the features list to FastAPI
        const result = await fetch('https://medico-api-1.onrender.com/predict',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: JSON.stringify(features)
        });
        // Get respsonse from FastAPI
        const prediction = await result.json();
        console.log(prediction);
        // Send the response to Electron
        return res.status(201).json(prediction);
    }catch(err){
        console.error(err);
    }
}

module.exports = predictDiabetes;
