function calculate() {
  const size = parseInt(document.getElementById("size").value);
  const rooms = parseInt(document.getElementById("rooms").value);
  const kitchen = parseInt(document.getElementById("kitchen").value);
  const toilet = parseInt(document.getElementById("toilet").value);
  const bed = parseInt(document.getElementById("bed").value);

  const base = size * 1300;
  const roomCost = rooms > 1 ? 30000 : 0;

  const total = base + roomCost + kitchen + toilet + bed;

  document.getElementById("total").innerText =
    "Total: ₹" + total.toLocaleString("en-IN");
}
function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("show");
}
