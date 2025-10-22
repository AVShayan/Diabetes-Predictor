const {app,shell} = require('electron');
const allInputs = document.querySelectorAll('input','select');
const predictBtn = document.getElementById('predict-btn');
const dnaLoader = document.getElementById('loading');
const dnaLoader_2 = document.getElementById('save-loading');
const refreshBtn = document.getElementById('refresh-btn');

allInputs.forEach(input=>{
    input.addEventListener('blur',validateInput);
});

function validateInput(e){
    const input = e.target;
    const validation = input.parentElement.querySelector('.validation');
	// Check if any input is invalid
    if(input.value==''){
        validation.innerHTML='<span class="invalid">⚠ This field is required</span>'
        input.style.borderColor="#EF4444";
    }else{
        validation.innerHTML='<span class="valid">✔️ Valid</span>';
        input.style.borderColor="#10B981";
    }
    predictButton();
}
// Button pulses once all input fields are filled 
function predictButton(){
    let allValid=true;
	// Check if any input is invalid
    allInputs.forEach(input=>{
        if(input.value==''){
            allValid=false;
		}
    });
    if(allValid){
        predictBtn.classList.add('pulse');
        predictBtn.disabled=false;
    }else{
        predictBtn.classList.remove('pulse');
        predictBtn.disabled=true;
    }
}

// Here, we handle the sending of request and recieving of response to and from Node
predictBtn.addEventListener('click',async (e) => {
	e.preventDefault();
	// Show loader when clicked
	dnaLoader.style.display='block';
	dnaLoader.scrollIntoView({behavior:'smooth'});
	const age = document.getElementById('input-1').value;
	const gender = document.getElementById('input-2').value;
	const bmi = document.getElementById('input-3').value;
	const sbp = document.getElementById('input-4').value;
	const dbp = document.getElementById('input-5').value;
	const fpg = document.getElementById('input-6').value;
	const chol = document.getElementById('input-7').value;
	const tri = document.getElementById('input-8').value;
	const hdl = document.getElementById('input-9').value;
	const ldl = document.getElementById('input-10').value;
	const alt = document.getElementById('input-11').value;
	const bun = document.getElementById('input-12').value;
	const ccr = document.getElementById('input-13').value;
	const ffpg = document.getElementById('input-14').value;
	const smoker = document.getElementById('input-15').value;
	const drinker = document.getElementById('input-16').value;
	const family_history = document.getElementById('input-17').value;
	const data = JSON.stringify({
	"Age": age,
	"Gender": gender,
	"BMI": bmi,
	"SBP": sbp,
	"DBP": dbp,
	"FPG": fpg,
	"Chol": chol,
	"Tri": tri,
	"HDL": hdl,
	"LDL": ldl,
	"ALT": alt,
	"BUN": bun,
	"CCR": ccr,
	"FFPG": ffpg,
	"smoking": smoker,
	"drinking": drinker,
	"family_histroy": family_history
	});
	const res = await fetch('http://localhost:3500/predict',{
	method:"POST",
	headers: {"Content-Type":"application/json"},
	body: data
	});
	const result = await res.json();
	displayPrediction(result); 
	console.log(result);
});

// An asynchronous function to get PDF Report from Node
async function getReport(features){
	const res = await fetch('http://localhost:3500/pdf',{
		method:"POST",
		headers:{"Content-Type":"application/json"},
		body: features
	});
	var counter = 0;
	counter++;
	const PDF = await res.blob();
	const url = window.URL.createObjectURL(PDF);
	const a = document.createElement('a');
	a.href=url;
	// Hide the loader
	a.download=`diabetes_report${counter}.pdf`;
	dnaLoader_2.style.display = 'none';
	a.click();
	window.URL.revokeObjectURL(PDF);
}

// Function to display the results in prediction card
function displayPrediction(result){
	const predictionSection = document.getElementById('prediction-section');
	const predictionIcon = document.getElementById('prediction-icon');
	const predictionResult = document.getElementById('prediction-result');
	const predictionDesc = document.getElementById('prediction-desc');
	const predictionScore = document.getElementById('prediction-score');
	// Hide the Loader
	dnaLoader.style.display='none';
	if(result.Prediction == 0){   // User with no Diabetes
		predictionIcon.textContent = '✔️';
		predictionResult.textContent = 'Low Probability';
		predictionScore.style.backgroundColor='#10B981';
		predictionDesc.textContent = 'Based on the provided parameters, the likelihood of Type 2 Diabetes is Low. We always advise you to consult a doctor'
	}else{   // User with Diabetes
		predictionIcon.textContent = '⚠️';
		predictionResult.textContent = 'High Probability';
		predictionScore.style.backgroundColor='#EF4444';
		predictionDesc.textContent = 'Based on the provided parameters, the likelihood of Type 2 Diabetes is High. We strongly advise you to consult a doctor'
	}
	console.log(result.Probability);
	predictionScore.textContent = `${result.Probability}%`;
	predictionSection.style.display='block';
	predictionSection.scrollIntoView({behavior:'smooth'});
}

const saveBtn = document.getElementById('save-report');
saveBtn.addEventListener('click', async (e) => {
	e.preventDefault();
	// Show loader whne button is clicked
	dnaLoader_2.style.display = 'block';
	dnaLoader_2.scrollIntoView({behavior:'smooth'});
	const age = document.getElementById('input-1').value;
	const gender = document.getElementById('input-2').value;
	const bmi = document.getElementById('input-3').value;
	const sbp = document.getElementById('input-4').value;
	const dbp = document.getElementById('input-5').value;
	const fpg = document.getElementById('input-6').value;
	const chol = document.getElementById('input-7').value;
	const tri = document.getElementById('input-8').value;
	const hdl = document.getElementById('input-9').value;
	const ldl = document.getElementById('input-10').value;
	const alt = document.getElementById('input-11').value;
	const bun = document.getElementById('input-12').value;
	const ccr = document.getElementById('input-13').value;
	const ffpg = document.getElementById('input-14').value;
	const smoker = document.getElementById('input-15').value;
	const drinker = document.getElementById('input-16').value;
	const family_history = document.getElementById('input-17').value;
	const name = document.getElementById('input-18').value;
	const data = JSON.stringify({
		"name": name,
		"Age": age,
		"Gender": gender,
		"BMI": bmi,
		"SBP": sbp,
		"DBP": dbp,
		"FPG": fpg,
		"Chol": chol,
		"Tri": tri,
		"HDL": hdl,
		"LDL": ldl,
		"ALT": alt,
		"BUN": bun,
		"CCR": ccr,
		"FFPG": ffpg,
		"smoking": smoker,
		"drinking": drinker,
		"family_histroy": family_history
	});
	getReport(data);
})

// In case user wants to test again
refreshBtn.addEventListener('click',async(e)=>{
	e.preventDefault();
	// Clear all inputs
	allInputs.forEach(input=>{
		input.value='';
		const validation = input.parentElement.querySelector('.validation');
		validation.innerHTML='';
		input.style.borderColor="#ddd";
	});
	// Hide the Prediction card
	const predictionSection = document.getElementById('prediction-section');
	predictionSection.style.display = 'none';
	// Scroll Up
	window.scrollTo({top:0,behavior:'smooth'});
});