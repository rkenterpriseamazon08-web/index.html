const steps = [
  {
    question: "Which container model are you interested in?",
    options: ["Kennedy", "Ezra", "Augustine", "Custom Build"]
  },
  {
    question: "Select your floor plan",
    options: ["Floorplan A", "Floorplan B"]
  },
  {
    question: "Select an Exterior Color",
    options: ["Black", "Grey", "White", "Custom"]
  },
  {
    question: "Select Flooring",
    options: ["Wood", "Concrete", "Tile"]
  },
  {
    question: "Select your wall finish",
    options: ["Drywall", "Pine", "White Shiplap"]
  },
  {
    question: "Select your kitchen finish",
    options: ["Grey", "White", "Undecided"]
  },
  {
    question: "Select Your Bathroom Fixtures",
    options: ["Black", "Chrome", "Gold"]
  },
  {
    question: "Select a Composite Shower Tile Panel Style",
    options: ["Urban Cement", "Marble", "Rustic"]
  },
  {
    question: "How interested are you in purchasing?",
    options: ["Ready now", "3 months", "6 months", "Just exploring"]
  },
  {
    question: "Do you have land?",
    options: ["Yes", "No"]
  }
];

let currentStep = 0;
let answers = {};
let isTransitioning = false;

const title = document.getElementById("question-title");
const container = document.getElementById("options-container");
const nextBtn = document.getElementById("nextBtn");

function loadStep() {
  container.innerHTML = "";
  title.textContent = steps[currentStep].question;

  if (nextBtn) nextBtn.disabled = true;

  const grid = document.createElement("div");
  grid.className = "option-grid";

  steps[currentStep].options.forEach(opt => {
    const card = document.createElement("div");
    card.className = "option-card";
    card.innerHTML = `<p>${opt}</p>`;

    card.onclick = () => {
      if (isTransitioning) return;
      isTransitioning = true;

      // visual selection
      document.querySelectorAll(".option-card").forEach(c =>
        c.classList.remove("selected")
      );
      card.classList.add("selected");

      // save answer
      answers[steps[currentStep].question] = opt;

      // mobile haptic feedback
      if (navigator.vibrate) navigator.vibrate(12);

      // auto move to next step
      setTimeout(() => {
        currentStep++;

        if (currentStep < steps.length) {
          loadStep();
        } else {
          console.log("Final Answers:", answers);
          window.location.href = "final-form.html";
        }

        isTransitioning = false;
      }, 350); // smooth UX delay
    };

    grid.appendChild(card);
  });

  container.appendChild(grid);
}

/* Optional fallback Next button */
if (nextBtn) {
  nextBtn.onclick = () => {
    currentStep++;
    if (currentStep < steps.length) {
      loadStep();
    } else {
      window.location.href = "final-form.html";
    }
  };
}

loadStep();
