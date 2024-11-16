//access all dom values
const passwordInput = document.getElementById("input-box");
const copyButton = document.getElementById("copy-btn");
const passwordLengthDisplay = document.querySelector("#password-length");
const lengthSlider = document.getElementById("range-btn");
const includeNumbersCheckbox = document.getElementById("numbers");
const includeSpecialCharsCheckbox = document.getElementById("Characters");
const strengthIndicator = document.getElementById("indicate-btn");

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
const evaluatePasswordStrength = (password) => {
  let strength = "weak";
  let strengthText = "Weak";

  if (password.length >= 16) {
    strength = "strong";
    strengthText = "Strong";
    strengthIndicator.textContent = strengthText;
    strengthIndicator.style.backgroundColor = "green"; 
  } else if (password.length >= 12 && password.length < 16) {
    strength = "good";
    strengthText = "Good";
    strengthIndicator.textContent = strengthText;
    strengthIndicator.style.backgroundColor = "orange";
  } else {
    strength = "weak";
    strengthText = "Weak";
    strengthIndicator.textContent = strengthText;
    strengthIndicator.style.backgroundColor = "red"; 
  }

  return strength;
};

// Update the display of password length 
lengthSlider.addEventListener("input", () => {
  const length = lengthSlider.value;
  passwordLengthDisplay.textContent = length;
});

// Generate a new password 
lengthSlider.addEventListener("change", () => {
  const length = lengthSlider.value;
  const useNumbers = includeNumbersCheckbox.checked;
  const useSpecialChars = includeSpecialCharsCheckbox.checked;
  const newPassword = generatePassword(length, useNumbers, useSpecialChars);
  passwordInput.value = newPassword;

  evaluatePasswordStrength(newPassword);
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
  const length = lengthSlider.value;
  const useNumbers = includeNumbersCheckbox.checked;
  const useSpecialChars = includeSpecialCharsCheckbox.checked;
  passwordInput.value = generatePassword(length, useNumbers, useSpecialChars);
  passwordLengthDisplay.textContent = length;

  evaluatePasswordStrength(passwordInput.value);
});
