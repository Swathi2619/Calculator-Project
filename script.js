let display = document.getElementById("display");

// Append value to display
function appendValue(value) {
  display.value += value;
}

// Clear display
function clearDisplay() {
  display.value = "";
}

// Calculate result
function calculateResult() {
  try {
    let expression = display.value;

    // Handle square root: replace "√number" with "Math.sqrt(number)"
    expression = expression.replace(/√(\d+(\.\d+)?)/g, "Math.sqrt($1)");

    // Also allow "√(" syntax like √(16)
    expression = expression.replace(/√\(/g, "Math.sqrt(");

    let result = eval(expression);

    if (!isFinite(result)) {
      throw new Error("Math Error");
    }

    display.value = result;
  } catch (error) {
    display.value = "Error";
  }
}

// Backspace
function backspace() {
  display.value = display.value.slice(0, -1);
}

// Keyboard support

document.addEventListener("keydown", function (event) {
  const key = event.key;

  if (!isNaN(key) || key === ".") {                     // Numbers and decimal
    appendValue(key);
  } 

  else if (["+", "-", "*", "/", "%"].includes(key)) {   // Operators
    appendValue(key);
  } 

  else if (key === "Enter" || key === "=") {            // Enter or = → calculate
    calculateResult();
  } 
  else if (key === "Backspace") {                       // Backspace → delete last character
    backspace();
  }
   else if (key.toLowerCase() === "c") {                // C key → clear display
    clearDisplay();
  } 
  else if (key === "r"){                                // R key → square root
    appendValue("√");
  }
}
);


