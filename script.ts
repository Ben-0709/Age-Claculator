console.clear();

type DisplayResultArguments = {
  bDate: number;
  bMonth: number;
  bYear: number;
};

const allMonths: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const button: HTMLButtonElement | null = document.getElementById(
  "button"
) as HTMLButtonElement | null;
const years: HTMLElement | null = document.getElementById("years");
const months: HTMLElement | null = document.getElementById("months");
const days: HTMLElement | null = document.getElementById("days");
const date: HTMLInputElement | null = document.getElementById(
  "date"
) as HTMLInputElement;
const errorMessage: HTMLDivElement | null =
  document.querySelector(".errorMessage");

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
      setTimeout(() => {
        if (errorMessage) {
          errorMessage.classList.add("errorMessageHide");
        }
      }, 3000);
    }
    return;
  }

  const inputId: string = date.value.trim();
  const today: Date = new Date();
  const inputDate: Date = new Date(inputId);
  let birthMonth: number, birthDate: number, birthYear: number;

  const birthDetails = {
    date: inputDate.getDate(),
    month: inputDate.getMonth() + 1,
    year: inputDate.getFullYear(),
  };

  const currentYear: number = today.getFullYear();
  const currentMonth: number = today.getMonth() + 1;
  const currentDate: number = today.getDate();

  leapChecker(currentYear);

  if (
    birthDetails.year > currentYear ||
    (birthDetails.month > currentMonth && birthDetails.year === currentYear) ||
    (birthDetails.date > currentDate &&
      birthDetails.month === currentMonth &&
      birthDetails.year === currentYear)
  ) {
    alert("Not Born Yet");
    if (years && months && days) {
      displayResult({ bDate: 0, bMonth: 0, bYear: 0 });
    }
    return;
  }

  birthYear = currentYear - birthDetails.year;

  if (currentMonth >= birthDetails.month) {
    birthMonth = currentMonth - birthDetails.month;
  } else {
    birthYear--;
    birthMonth = 12 + currentMonth - birthDetails.month;
  }

  if (currentDate >= birthDetails.date) {
    birthDate = currentDate - birthDetails.date;
  } else {
    birthMonth--;
    const daysInMonth = allMonths[birthDetails.month - 1];
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

function displayResult({ bDate, bMonth, bYear }: DisplayResultArguments) {
  if (years && months && days) {
    years.textContent = bYear.toString();
    months.textContent = bMonth.toString();
    days.textContent = bDate.toString();
  }
}

function leapChecker(year: number) {
  if (year % 4 === 0 || (year % 100 === 0 && year % 400 === 0)) {
    allMonths[1] = 29;
  } else {
    allMonths[1] = 28;
  }
}
