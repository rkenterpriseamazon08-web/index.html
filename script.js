function calculate() {
  const size = document.getElementById("size").value;
  const rooms = parseInt(document.getElementById("rooms").value);
  const kitchen = parseInt(document.getElementById("kitchen").value);
  const toilet = parseInt(document.getElementById("toilet").value);
  const flooring = document.getElementById("flooring").value;
  const bedType = document.getElementById("bedType").value;
  const bedCount = parseInt(document.getElementById("bedCount").value) || 0;

  const sqftMap = { "20x10": 200, "30x10": 300, "40x10": 400 };
  let total = sqftMap[size] * 1300;

  /* Extra room cost */
  if (rooms === 2) total += 8000;

  /* Kitchen & toilet */
  total += kitchen + toilet;

  /* Flooring prices */
  const flooringPrices = {
    "20x10": { tiles: 12000, wood: 18000 },
    "30x10": { tiles: 18000, wood: 25000 },
    "40x10": { tiles: 25000, wood: 32000 }
  };

  if (flooring === "tiles") total += flooringPrices[size].tiles;
  if (flooring === "wood") total += flooringPrices[size].wood;

  /* Bed pricing */
  let bedPrice = 0;
  if (bedType === "single") bedPrice = 8000;
  if (bedType === "double") bedPrice = 16000;
  if (bedType === "bunk") bedPrice = 15000;

  total += bedCount * bedPrice;

  document.getElementById("total").innerText =
    "Total: ₹" + total.toLocaleString("en-IN");
}

/* Size-based room restriction */
document.getElementById("size").addEventListener("change", function () {
  const rooms = document.getElementById("rooms");

  if (this.value === "20x10") {
    rooms.innerHTML = `<option value="1">1 Bedroom</option>`;
  } else {
    rooms.innerHTML = `
      <option value="1">1 Bedroom</option>
      <option value="2">2 Bedrooms</option>
    `;
  }

  calculate();
});

/* Mobile menu */
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}
