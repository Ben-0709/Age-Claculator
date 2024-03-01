console.clear();
var allMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var button = document.getElementById("button");
var years = document.getElementById("years");
var months = document.getElementById("months");
var days = document.getElementById("days");
var date = document.getElementById("date");
var errorMessage = document.querySelector(".errorMessage");
if (button && years && months && days && date) {
    button.addEventListener("click", ageCalculate);
}
function ageCalculate() {
    if (!date || !date.value.trim()) {
        console.error("Please fill out all fields to get access age calculation!");
        if (errorMessage) {
            errorMessage.textContent =
                "Please fill out all fields to get access age calculation!";
            errorMessage.classList.add("errorMessage");
            errorMessage.classList.remove("errorMessageHide");
            setTimeout(function () {
                if (errorMessage) {
                    errorMessage.classList.add("errorMessageHide");
                }
            }, 3000);
        }
        return;
    }
    var inputId = date.value.trim();
    var today = new Date();
    var inputDate = new Date(inputId);
    var birthMonth, birthDate, birthYear;
    var birthDetails = {
        date: inputDate.getDate(),
        month: inputDate.getMonth() + 1,
        year: inputDate.getFullYear(),
    };
    var currentYear = today.getFullYear();
    var currentMonth = today.getMonth() + 1;
    var currentDate = today.getDate();
    leapChecker(currentYear);
    if (birthDetails.year > currentYear ||
        (birthDetails.month > currentMonth && birthDetails.year === currentYear) ||
        (birthDetails.date > currentDate &&
            birthDetails.month === currentMonth &&
            birthDetails.year === currentYear)) {
        alert("Not Born Yet");
        if (years && months && days) {
            displayResult({ bDate: 0, bMonth: 0, bYear: 0 });
        }
        return;
    }
    birthYear = currentYear - birthDetails.year;
    if (currentMonth >= birthDetails.month) {
        birthMonth = currentMonth - birthDetails.month;
    }
    else {
        birthYear--;
        birthMonth = 12 + currentMonth - birthDetails.month;
    }
    if (currentDate >= birthDetails.date) {
        birthDate = currentDate - birthDetails.date;
    }
    else {
        birthMonth--;
        var daysInMonth = allMonths[birthDetails.month - 1];
        birthDate = daysInMonth + currentDate - birthDetails.date;
        if (birthMonth < 0) {
            birthMonth = 11;
            birthYear--;
        }
    }
    if (years && months && days) {
        displayResult({ bDate: birthDate, bMonth: birthMonth, bYear: birthYear });
    }
}
function displayResult(_a) {
    var bDate = _a.bDate, bMonth = _a.bMonth, bYear = _a.bYear;
    if (years && months && days) {
        years.textContent = bYear.toString();
        months.textContent = bMonth.toString();
        days.textContent = bDate.toString();
    }
}
function leapChecker(year) {
    if (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)) {
        allMonths[1] = 29;
    }
    else {
        allMonths[1] = 28;
    }
}
