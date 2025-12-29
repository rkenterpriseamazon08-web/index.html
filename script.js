document.addEventListener("DOMContentLoaded", () => {

  const containerSize = document.getElementById("containerSize");
  const bedrooms = document.getElementById("bedrooms");
function calculate(){
  document.getElementById("priceModal").style.display = "block";
}

function calculatePriceAfterForm() {
  const size = containerSize.value;
  const rooms = parseInt(bedrooms.value);
  const kitchen = parseInt(document.getElementById("kitchen").value);
  const toilet = parseInt(document.getElementById("toilet").value);
  const flooring = document.getElementById("flooring").value;
  const bedType = document.getElementById("bedType").value;
  const bedCount = parseInt(document.getElementById("bedCount").value) || 0;

  const sqft = { "20x10": 200, "30x10": 300, "40x10": 400 };
  let total = sqft[size] * 1300;

  if (rooms === 2) total += 8000;
  total += kitchen + toilet;

  const flooringCost = {
    "20x10": { tiles: 12000, wood: 18000 },
    "30x10": { tiles: 18000, wood: 25000 },
    "40x10": { tiles: 25000, wood: 32000 }
  };

  if (flooring === "tiles") total += flooringCost[size].tiles;
  if (flooring === "wood") total += flooringCost[size].wood;

  let bedPrice = 0;
  if (bedType === "single") bedPrice = 8000;
  if (bedType === "double") bedPrice = 16000;
  if (bedType === "bunk") bedPrice = 15000;

  total += bedPrice * bedCount;

  document.getElementById("total").innerText =
    "Total: ₹" + total.toLocaleString("en-IN");

  // close popup after calculation
  document.getElementById("priceModal").style.display = "none";
}
document.getElementById("popupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const truckAccessEl = document.querySelector('input[name="truckAccess"]:checked');

  if (!truckAccessEl) {
    alert("Please select truck accessible road (Yes / No)");
    return;
  }

  const data = {
    name: document.getElementById("name").value.trim(),
    mobile: document.getElementById("mobile").value.trim(),
    email: document.getElementById("email").value.trim(),
    fullAddress: document.getElementById("address")?.value.trim() || "",
    city: document.getElementById("city").value.trim(),
    truckAccess: truckAccessEl.value,
    pincode: document.getElementById("pincode")?.value.trim() || ""
  };

  fetch("https://script.google.com/macros/s/AKfycbxqAtV-QAtl6JG05nT-wochacg6aBI3Sm-UVQ-HxATBDXbG0zQ51e0R1ub0Ldxcy3GNyw/exec", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(res => res.json())
  .then(response => {
    if (response.status === "success") {
      alert("Details submitted successfully!");
      document.getElementById("popupForm").reset();
      document.getElementById("priceModal").style.display = "none";
    } else {
      throw new Error("Submission failed");
    }
  })
  .catch(err => {
    alert("Something went wrong. Please try again.");
    console.error(err);
  });
});


  window.calculate = calculate;

  function updateBedroomDropdown() {
    const twoBedOption = bedrooms.querySelector('option[value="2"]');

    if (containerSize.value === "20x10") {
      bedrooms.value = "1";
      bedrooms.disabled = true;
      twoBedOption.disabled = true;
    } else {
      bedrooms.disabled = false;
      twoBedOption.disabled = false;
    }
  }

  updateBedroomDropdown();
  containerSize.addEventListener("change", updateBedroomDropdown);
});
/* ===== MOBILE MENU AUTO-CLOSE FIX ===== */

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");
const navLinks = navMenu.querySelectorAll("a");

// Toggle menu on hamburger click
menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
});

// Close menu when any link is clicked
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
  });
});
