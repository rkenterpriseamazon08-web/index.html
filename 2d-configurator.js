

const steps = [
  { key: "containerModel", question: "Which container model are you interested in?", options: ["Kennedy", "Ezra", "Augustine", "Custom Build"] },
  { key: "floorPlan", question: "Select your floor plan", options: ["Floorplan A", "Floorplan B"] },
  { key: "exteriorColor", question: "Select an Exterior Color", options: ["Black", "Grey", "White", "Custom"] },
  { key: "flooring", question: "Select Flooring", options: ["Wood", "Concrete", "Tile"] },
  { key: "wallFinish", question: "Select your wall finish", options: ["Drywall", "Pine", "White Shiplap"] },
  { key: "kitchenFinish", question: "Select your kitchen finish", options: ["Grey", "White", "Undecided"] },
  { key: "bathroomFixtures", question: "Select Your Bathroom Fixtures", options: ["Black", "Chrome", "Gold"] },
  { key: "showerPanel", question: "Select a Composite Shower Tile Panel Style", options: ["Urban Cement", "Marble", "Rustic"] },
  { key: "purchaseInterest", question: "How interested are you in purchasing?", options: ["Ready now", "3 months", "6 months", "Just exploring"] },
  { key: "hasLand", question: "Do you have land?", options: ["Yes", "No"] },
  { type: "form" }
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
          <input name="firstName" placeholder="First name"  />
          <input name="lastName" placeholder="Last name"  />
        </div>

        <input name="phone" placeholder="Phone number" required />
        <input name="email" placeholder="Email address" required />

        <label class="checkbox-group">
          <span>How do you prefer to be contacted?</span>
          <label><input type="checkbox" name="contactPref" value="Email"> Email</label>
          <label><input type="checkbox" name="contactPref" value="Phone"> Phone Call</label>
          <label><input type="checkbox" name="contactPref" value="Text"> Text</label>
        </label>

        <input name="zip" placeholder="Delivery Zip Code" required />
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
  answers[steps[currentStep].key] = opt;

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

  const payload = {
    timestamp: new Date().toLocaleString(),
    ...answers,
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    contactPreference: formData.getAll("contactPref").join(", "),
    zipCode: formData.get("zip"),
    comments: formData.get("comments")
  };

  fetch("https://script.google.com/macros/s/AKfycbw04DfolWFtL57xJICc8ldt7UudfMAp6VOcJpg7gutNjWDogkSQj95XUQSypZ3Su3DGGQ/exec", {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(() => {
    title.textContent = "";
    container.innerHTML = `
      <div class="success-message">
        <h2>Thank you!</h2>
        <p>Your quote request has been submitted successfully.</p>
        <a href="/" class="back-home-btn">← Back to Home</a>
      </div>
    `;
    backBtn.style.display = "none";
  }).catch(() => {
    alert("Submission failed. Please try again.");
  });
}

