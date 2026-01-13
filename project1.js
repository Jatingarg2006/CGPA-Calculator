console.log("JS connected");

// --- Get references ---
const addBtn = document.getElementById("addSubject");
const calcBtn = document.getElementById("calculate");
const result = document.getElementById("result");
const container = document.getElementById("subjects-container");

// --- Function to calculate grade point (IPU style) ---
function getGradePoint(total) {
  if (total >= 90) return 10;
  if (total >= 80) return 9;
  if (total >= 70) return 8;
  if (total >= 60) return 7;
  if (total >= 50) return 6;
  if (total >= 40) return 5;
  return 0;
}

// --- CGPA Calculation ---
calcBtn.addEventListener("click", function () {
  const subjects = container.querySelectorAll(".subject");

  let totalPoints = 0;
  let totalCredits = 0;

  for (let sub of subjects) {
    const internal = Number(sub.querySelector(".internal").value);
    const endSem = Number(sub.querySelector(".endsem").value);
    const credits = Number(sub.querySelector(".credits").value);

    if (
      internal < 0 || internal > 40 ||
      endSem < 0 || endSem > 60 ||
      credits <= 0
    ) {
      result.innerText = "Please enter valid marks and credits for all subjects";
      return;
    }

    const totalMarks = internal + endSem;
    const gradePoint = getGradePoint(totalMarks);

    totalPoints += gradePoint * credits;
    totalCredits += credits;
  }

  const cgpa = totalCredits === 0 ? 0 : (totalPoints / totalCredits);
  result.innerText = "CGPA: " + cgpa.toFixed(2);
});

// --- Function to add a new subject row dynamically ---
function addSubjectRow(focusFirst = true) {
  const div = document.createElement("div");
  div.className = "subject";

  div.innerHTML = `
    <input type="text" placeholder="Subject Name">
    <input type="number" class="internal" placeholder="Internal (40)">
    <input type="number" class="endsem" placeholder="End-Sem (60)">
    <input type="number" class="credits" placeholder="Credits">
  `;

  container.appendChild(div);

  const inputs = div.querySelectorAll("input");

  // Attach Enter navigation for this row
  inputs.forEach((input, i) => {
    input.addEventListener("keydown", function (event) {
      if (event.key === "Enter") {
        event.preventDefault();

        if (i < inputs.length - 1) {
          // Move to next input in same row
          inputs[i + 1].focus();
        } else {
          // Last input → focus Add Subject button
          addBtn.focus();
        }
      }
    });
  });

  // Optionally focus first input of the new row
  if (focusFirst) inputs[0].focus();
}

// --- Initialize first row on page load ---
addSubjectRow(false); // don't auto-focus

// --- Add Subject button click ---
addBtn.addEventListener("click", function () {
  addSubjectRow(); // adds new row and focuses first input
});

function getGrade(total) {
  if (total >= 90) return "O";
  if (total >= 80) return "A+";
  if (total >= 70) return "A";
  if (total >= 60) return "B+";
  if (total >= 50) return "B";
  if (total >= 40) return "C";
  return "F";
}


