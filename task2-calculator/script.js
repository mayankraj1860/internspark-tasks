document.addEventListener("DOMContentLoaded", () => {
	const display = document.getElementById("display");
	const preview = document.getElementById("preview");
	const clearBtn = document.getElementById("clearBtn");
	const equalBtn = document.getElementById("equalBtn");
	const numbers = document.querySelectorAll(".number");
	const operators = document.querySelectorAll(".operator");

	let currentInput = "";
	let shouldResetDisplay = false;

	function appendNumber(number) {
		if (display.textContent === "0" || shouldResetDisplay) {
			display.textContent = "";
			shouldResetDisplay = false;
		}
		if (number === "." && currentInput.includes(".")) return;
		currentInput += number;
		display.textContent = currentInput;
		updateLivePreview();
	}

	function appendOperator(operator) {
		if (currentInput === "" && display.textContent === "0") return;
		if (shouldResetDisplay) shouldResetDisplay = false;

		const lastChar = currentInput.trim().slice(-1);
		if (["+", "-", "*", "/"].includes(lastChar)) {
			currentInput = currentInput.trim().slice(0, -1) + operator + " ";
		} else {
			currentInput += " " + operator + " ";
		}
		display.textContent = currentInput;
	}

	function clearScreen() {
		currentInput = "";
		display.textContent = "0";
		preview.textContent = "";
	}

	function updateLivePreview() {
		try {
			if (currentInput.trim() === "") {
				preview.textContent = "";
				return;
			}
			const result = eval(currentInput);
			if (result !== undefined && !isNaN(result) && isFinite(result)) {
				preview.textContent = result;
			}
		} catch (e) {
			// Live preview quietly waits during incomplete entries
		}
	}

	function calculate() {
		try {
			if (currentInput.trim() === "") return;
			const result = eval(currentInput);

			if (isNaN(result) || !isFinite(result)) {
				display.textContent = "Error";
			} else {
				display.textContent = Number(result.toFixed(8));
				preview.textContent = "";
				currentInput = display.textContent;
				shouldResetDisplay = true;
			}
		} catch (error) {
			display.textContent = "Error";
		}
	}

	// Click UI Actions
	numbers.forEach((button) => {
		button.addEventListener("click", () => appendNumber(button.textContent));
	});

	operators.forEach((button) => {
		button.addEventListener("click", () =>
			appendOperator(button.getAttribute("data-op")),
		);
	});

	clearBtn.addEventListener("click", clearScreen);
	equalBtn.addEventListener("click", calculate);

	// Helper function to animate keyboard click
	function triggerVisualFeedback(key) {
		let lookupKey = key;
		if (key === "=") lookupKey = "Enter";
		if (key === "Delete") lookupKey = "Escape";

		const targetButton = document.querySelector(
			`button[data-key="${lookupKey}"]`,
		);
		if (targetButton) {
			targetButton.classList.add("kbd-active");
			setTimeout(() => {
				targetButton.classList.remove("kbd-active");
			}, 100); // Removes the active flash color after 100ms
		}
	}

	// Physical Keyboard Actions
	document.addEventListener("keydown", (event) => {
		const key = event.key;

		if ((key >= "0" && key <= "9") || key === ".") {
			triggerVisualFeedback(key);
			appendNumber(key);
		} else if (key === "+" || key === "-" || key === "*" || key === "/") {
			triggerVisualFeedback(key);
			appendOperator(key);
		} else if (key === "Enter" || key === "=") {
			event.preventDefault();
			triggerVisualFeedback(key);
			calculate();
		} else if (key === "Escape" || key === "Delete") {
			triggerVisualFeedback(key);
			clearScreen();
		} else if (key === "Backspace") {
			currentInput = currentInput.trim().slice(0, -1);
			display.textContent = currentInput || "0";
			updateLivePreview();
		}
	});
});
