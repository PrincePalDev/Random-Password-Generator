//access all dom values
const passwordInput = document.getElementById("input-box");
const copyButton = document.getElementById("copy-btn");
const passwordLength = document.querySelector("#password-length");
const rangeBtn = document.getElementById("range-btn");
const numbersCheckbox = document.getElementById("numbers");
const specialCharsCheckbox = document.getElementById("Characters");
const indicateBtn = document.getElementById("indicate-btn");

//create Function to generate a random password
const generatePassword = (length, includeNumbers, includeSpecialChars) => {
  const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const specialChars = "!@#$%^&*().";

  let availableChars = letters;
  if (includeNumbers) availableChars += numbers;
  if (includeSpecialChars) availableChars += specialChars;

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * availableChars.length);
    password += availableChars[randomIndex];
  }

  return password;
};

// check the password weak,good and strong
const passwordStrength = (password) => {
  let strength = "weak";
  let strengthText = "Weak";

  if (password.length >= 16) {
    strength = "strong";
    strengthText = "Strong";
    indicateBtn.textContent = strengthText;
    indicateBtn.style.backgroundColor = "green"; 
  } else if (password.length >= 8 && password.length < 16) {
    strength = "good";
    strengthText = "Good";
    indicateBtn.textContent = strengthText;
    indicateBtn.style.backgroundColor = "orange";
  } else {
    strength = "weak";
    strengthText = "Weak";
    indicateBtn.textContent = strengthText;
    indicateBtn.style.backgroundColor = "red"; 
  }

  return strength;
};

// Update the display of password length 
rangeBtn.addEventListener("input", () => {
  const length = rangeBtn.value;
  passwordLength.textContent = length;
});

// Generate a new password 
rangeBtn.addEventListener("change", () => {
  const length = rangeBtn.value;
  const useNumbers = numbersCheckbox.checked;
  const useSpecialChars = specialCharsCheckbox.checked;
  const newPassword = generatePassword(length, useNumbers, useSpecialChars);
  passwordInput.value = newPassword;

  passwordStrength(newPassword);
});

// click the button copy the password
copyButton.addEventListener("click", () => {
  const password = passwordInput.value;
  if (password) {
    navigator.clipboard.writeText(password).then(() => {
      // this line a modern broweser API that write text to the clipboard.
    });
  } else {
    alert("Please generate a password first");
  }
});

// Generate an initial password 
document.addEventListener("DOMContentLoaded", () => {
  const length = rangeBtn.value;
  const useNumbers = numbersCheckbox.checked;
  const useSpecialChars = specialCharsCheckbox.checked;
  passwordInput.value = generatePassword(length, useNumbers, useSpecialChars);
  passwordLength.textContent = length;

  passwordStrength(passwordInput.value);
});
