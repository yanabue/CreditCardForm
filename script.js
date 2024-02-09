// Input Elements
const inputName = document.getElementById("input-name");
const inputNumber = document.getElementById("input-number");
const inputExpMonth = document.getElementById("input-month");
const inputExpYear = document.getElementById("input-year");
const inputCVC = document.getElementById("input-cvc");

//Card UI elements
const cardName = document.getElementById("card-name");
const cardNumber = document.getElementById("card-number");
const cardExp = document.getElementById("card-exp");
const cardCVC = document.getElementById("card-cvc");

//Error p elements
const nameError = document.getElementById('name-error');
const numberError = document.getElementById('number-error');
const dateError = document.getElementById('date-error');
const cvcError = document.getElementById('cvc-error');

//Button elements
const confirmBtn = document.getElementById('confirm');
const continueBtn = document.getElementById('continue').addEventListener('click', () => location.reload(true));

// Event Listeners
inputName.addEventListener("input", nameErrorCheck);
inputNumber.addEventListener("input", numberErrorCheck);
inputExpMonth.addEventListener('input', dateErrorCheck);
inputExpYear.addEventListener('input', dateErrorCheck);
inputCVC.addEventListener('input', cvcCheck);
confirmBtn.addEventListener('click', confirmation);



function nameErrorCheck() {
  cardName.innerText = inputName.value;
  if (/^[a-zA-Z]+\s[a-zA-Z]+$/.test(inputName.value.trim())) { // Name must be 2 words with only letters
    inputName.style.borderColor = "";
    nameError.innerText = "";   // Cancel error styling once correct
    return 'valid';
  } else {
    if (inputName.value === ""){ // If name blank
        inputName.style.borderColor = "red";
        return 'blank';
    } else {
        inputName.style.borderColor = "red";
        return 'invalid';
    }
  }
}

function dateErrorCheck(){
    let expCardString = `${inputExpMonth.value}/${inputExpYear.value}`;
    cardExp.innerText = expCardString;
    let currentDate = new Date();

    if (inputExpMonth.value === "" || inputExpYear.value === ""){ // If date blank
        inputExpMonth.style.borderColor = "red";
        inputExpYear.style.borderColor = 'red';
        return 'blank';
    }

    if ((inputExpMonth.value <= 12 && inputExpMonth.value >= 1 && inputExpMonth.value.length === 2 ) && // Month must be 2 char. and a number 1-12.
        (inputExpYear.value.length === 2 && inputExpYear.value >= (currentDate.getFullYear() - 2000) ) && // Year must be 2 char. and be the current or future year.
        (!(inputExpMonth.value - 1 <= currentDate.getMonth() && inputExpYear.value == currentDate.getFullYear() - 2000)) // If current year is enered - month must be a future one
        ){ 
        inputExpYear.style.borderColor = '';
        inputExpMonth.style.borderColor = '';
        dateError.innerText = '';
        return 'valid'; 
    } else {
        inputExpMonth.style.borderColor = "red";
        inputExpYear.style.borderColor = 'red';
        return 'invalid';
    }

}


function numberErrorCheck() {
    if (inputNumber.value.length <= 16){
  cardNumber.innerText = inputNumber.value;
}
  if (inputNumber.value.trim().length === 16 && /^[0-9]+$/.test(inputNumber.value)) { // Card number must be 16 char. and consist of only numbers.
    inputNumber.style.borderColor = "";
    numberError.innerText = '';
    return 'valid';
  } else if (inputNumber.value === "") {
    inputNumber.style.borderColor = 'red';
    return 'blank';
  } else {
    inputNumber.style.borderColor = 'red';
    return 'invalid';
  } 
}

function cvcCheck(){
    if (inputCVC.value.length <=3){
        cardCVC.innerText = inputCVC.value;
    }
    if (inputCVC.value.length === 3 && /^[0-9]+$/.test(inputCVC.value)){ // CVC  must be 3 char. and consist of only numbers.
        inputCVC.style.borderColor = "";
        cvcError.innerText = "";
        return 'valid';
    } else if (inputCVC.value === "") {
        inputCVC.style.borderColor = "red";
        return 'blank';
    } else {
        inputCVC.style.borderColor = "red";
        return 'invalid';
    }
}

function confirmation(){
 
    let isNameValid = nameErrorCheck();
    if (isNameValid === 'blank'){ // Check what name function returns
        inputName.style.borderColor = 'red';
        nameError.innerText = 'Can\'t be blank';
    } else if (isNameValid === 'invalid'){
        inputName.style.borderColor = 'red';
        nameError.innerText = 'Invalid Name';
    }

    let isNumberValid = numberErrorCheck();
    if (isNumberValid === 'blank'){ // Check what number function returns
        inputNumber.style.borderColor = 'red';
        numberError.innerText = 'Can\'t be blank';
    } else if (isNumberValid === 'invalid'){
        inputNumber.style.borderColor = 'red';
        numberError.innerText = 'Invalid Number';
    } 

    let isDateValid = dateErrorCheck();
    if (isDateValid === 'blank'){ // Check what date function returns
        inputExpMonth.style.borderColor = 'red';
        inputExpYear.style.borderColor = 'red';
        dateError.innerText = 'Can\'t be blank';
    } else if (isDateValid === 'invalid'){
        inputExpMonth.style.borderColor = 'red';
        inputExpYear.style.borderColor = 'red';
        dateError.innerText = 'Invalid Date';   
    }

    let isCvcValid = cvcCheck();
    if (isCvcValid === 'blank'){ // Check what CVC function returns
        inputCVC.style.borderColor = 'red';
        cvcError.innerText = 'Can\'t be blank';        
    } else if (isCvcValid === 'invalid'){
        inputCVC.style.borderColor = 'red';
        cvcError.innerText = 'Invalid CVC';
    }

    let isConfirmationPossible = (isNameValid === 'valid' && isNumberValid === 'valid' && isDateValid === 'valid' && isCvcValid === 'valid');
    // Check if all functions return that inputs are valid

    if (isConfirmationPossible){ // If all input is valid - hide form element & show confirmation element
        const form = document.querySelector('.card-details');
        form.style.display = 'none';
        const confirmMessage = document.querySelector('.confirmation-message');
        confirmMessage.style.display = 'flex';
    }
}

