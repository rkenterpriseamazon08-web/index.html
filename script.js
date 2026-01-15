/* =========================================
   FORCE MODAL CLOSED ON PAGE LOAD
========================================= */
document.addEventListener("DOMContentLoaded", () => {

  const priceModal = document.getElementById("priceModal");
  const calculateBtn = document.getElementById("calculateBtn");
  const closeBtn = document.querySelector(".close-btn");

  // 🔒 Always keep modal closed on load
  if (priceModal) priceModal.style.display = "none";

  /* ================================
     MODAL OPEN / CLOSE
  ================================= */

  if (calculateBtn && priceModal) {
    calculateBtn.addEventListener("click", (e) => {
      e.preventDefault();
      priceModal.style.display = "flex";
      document.body.style.overflow = "hidden";
    });
  }

  if (closeBtn && priceModal) {
    closeBtn.addEventListener("click", () => {
      priceModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target === priceModal) {
      priceModal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  /* ================================
     PRICE CALCULATOR LOGIC
  ================================= */

  const containerSize = document.getElementById("containerSize");
  const bedrooms = document.getElementById("bedrooms");

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
  }

  /* ================================
     FORM SUBMIT
  ================================= */

  const popupForm = document.getElementById("popupForm");

  if (popupForm) {
    popupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const truckAccessValue = document.getElementById("truckAccess").value;
      if (!truckAccessValue) {
        alert("Please select truck accessible road (Yes / No)");
        return;
      }

      const data = {
        name: document.getElementById("name").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        email: document.getElementById("email").value.trim(),
        fullAddress: document.getElementById("address").value.trim(),
        city: document.getElementById("city").value.trim(),
        pincode: document.getElementById("pincode").value.trim(),
        truckAccess: truckAccessValue
      };

      fetch("https://script.google.com/macros/s/AKfycbzbdngRY0ae-34rKn-bBvp0SlfcZkpQX9H9kqGAlSl0i3_JbL45Zoaf0r7sWgIozDJe/exec", {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" }
      })
      .then(() => {
        alert("Details submitted successfully!");
        popupForm.reset();
        priceModal.style.display = "none";
        document.body.style.overflow = "auto";
        calculatePriceAfterForm();
      })
      .catch(() => {
        alert("Network error. Please try again.");
      });
    });
  }

  /* ================================
     BEDROOM DROPDOWN LOGIC
  ================================= */

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
