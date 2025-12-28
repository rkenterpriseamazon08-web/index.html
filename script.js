function calculate() {
  const size = document.getElementById("size").value;
  const rooms = parseInt(document.getElementById("rooms").value);
  const kitchen = parseInt(document.getElementById("kitchen").value);
  const toilet = parseInt(document.getElementById("toilet").value);
  const flooring = document.getElementById("flooring").value;
  const bedType = document.getElementById("bedType").value;
  const bedCount = parseInt(document.getElementById("bedCount").value) || 0;

  const sqft = { "20x10": 200, "30x10": 300, "40x10": 400 };
  let total = sqft[size] * 1300;

  // Extra bedroom
  if (rooms === 2) total += 8000;

  // Kitchen & toilet
  total += kitchen + toilet;

  // Flooring
  const flooringCost = {
    "20x10": { tiles: 12000, wood: 18000 },
    "30x10": { tiles: 18000, wood: 25000 },
    "40x10": { tiles: 25000, wood: 32000 }
  };

  if (flooring === "tiles") total += flooringCost[size].tiles;
  if (flooring === "wood") total += flooringCost[size].wood;

  // Bed pricing
  let bedPrice = 0;
  if (bedType === "single") bedPrice = 8000;
  if (bedType === "double") bedPrice = 16000;
  if (bedType === "bunk") bedPrice = 15000;

  total += bedPrice * bedCount;

  document.getElementById("total").innerText =
    "Total: ₹" + total.toLocaleString("en-IN");
}
