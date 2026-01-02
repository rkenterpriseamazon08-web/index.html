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
  },
  {
  question: "Please provide contact information so we can send your quote details!",
  type: "form"
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

  if (backBtn) backBtn.disabled = currentStep === 0;

  // 👉 FINAL FORM STEP
  if (steps[currentStep].type === "form") {
    container.innerHTML = `
      <form id="finalForm" class="final-form">
        <div class="form-row">
          <input name="firstName" placeholder="First name" required />
          <input name="lastName" placeholder="Last name" required />
        </div>

        <input name="phone" placeholder="Phone number" required />
        <input name="email" placeholder="Email address" required />

        <label class="checkbox-group">
          <span>How do you prefer to be contacted?</span>
          <label><input type="checkbox" name="contactPref" value="Email"> Email</label>
          <label><input type="checkbox" name="contactPref" value="Phone"> Phone Call</label>
          <label><input type="checkbox" name="contactPref" value="Text"> Text</label>
        </label>

        <input name="zip" placeholder="Delivery Zip Code" />
        <textarea name="comments" placeholder="Questions / Comments"></textarea>

        <label class="checkbox">
          <input type="checkbox" required />
          I agree to the terms of service
        </label>

        <button type="submit" class="submit-btn">GET QUOTE</button>
      </form>
    `;

    document.getElementById("finalForm").onsubmit = handleSubmit;
    return;
  }

  // 👉 NORMAL OPTION STEPS
  const grid = document.createElement("div");
  grid.className = "option-grid";

  steps[currentStep].options.forEach(opt => {
    const card = document.createElement("div");
    card.className = "option-card";
    card.innerHTML = `<p>${opt}</p>`;

    if (answers[steps[currentStep].question] === opt) {
      card.classList.add("selected");
    }

    card.onclick = () => {
      answers[steps[currentStep].question] = opt;

      setTimeout(() => {
        currentStep++;
        loadStep();
      }, 300);
    };

    grid.appendChild(card);
  });

  container.appendChild(grid);
}




if (backBtn) {
  backBtn.onclick = () => {
    if (isTransitioning || currentStep === 0) return;

    isTransitioning = true;
    currentStep--;

    setTimeout(() => {
      loadStep();
      isTransitioning = false;
    }, 200);
  };
}

loadStep();
function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const payload = {};

  formData.forEach((value, key) => {
    if (payload[key]) {
      payload[key] += ", " + value;
    } else {
      payload[key] = value;
    }
  });

  // Merge popup answers + form answers
  const finalData = {
    ...answers,
    ...payload,
    timestamp: new Date().toISOString()
  };

  fetch("YOUR_GOOGLE_SCRIPT_URL_HERE", {
    method: "POST",
    body: JSON.stringify(finalData),
    headers: { "Content-Type": "application/json" }
  })
  .then(() => {// REMOVE the question title
title.textContent = "";

// SHOW success message only
container.innerHTML = `
  <div class="success-message">
    <h2>Thank you!</h2>
    <p>Your quote request has been submitted successfully.</p>

    <a href="/" class="back-home-btn">
      ←  Back to Home
    </a>
  </div>
`;


// Optional: hide back button after submit
if (backBtn) backBtn.style.display = "none";
  })
  .catch(() => alert("Submission failed. Please try again."));
}

