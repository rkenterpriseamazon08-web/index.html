const grid = document.getElementById("grid");
let zIndex = 1;

function addContainer(size) {
  const box = document.createElement("div");
  box.className = "container-box";

  if (size === "20") {
    box.style.width = "240px";
    box.style.height = "120px";
    box.innerText = "20 ft";
  } else {
    box.style.width = "480px";
    box.style.height = "120px";
    box.innerText = "40 ft";
  }

  box.style.left = "50px";
  box.style.top = "50px";
  box.style.zIndex = zIndex++;

  makeDraggable(box);
  grid.appendChild(box);
}

function clearCanvas() {
  grid.innerHTML = "";
}

/* DRAG FUNCTION */
function makeDraggable(el) {
  let offsetX, offsetY;

  el.onmousedown = e => {
    offsetX = e.offsetX;
    offsetY = e.offsetY;

    document.onmousemove = move;
    document.onmouseup = stop;
  };

  function move(e) {
    const rect = grid.getBoundingClientRect();
    el.style.left = `${e.clientX - rect.left - offsetX}px`;
    el.style.top = `${e.clientY - rect.top - offsetY}px`;
  }

  function stop() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}
