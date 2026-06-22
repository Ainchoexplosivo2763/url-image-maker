const palette = [
  "#000000", "#ffffff", "#ff0000", "#00ff00",
  "#0000ff", "#ffff00", "#ff00ff", "#00ffff",
  "#888888", "#ff8800", "#8800ff", "#0088ff",
  "#00aa00", "#aa0000", "#aaaaaa", "#222222"
];

// 🔥 HASH ROUTING (lo importante)
function getRoute() {
  const hash = window.location.hash.replace("#", "");
  return hash.split("/").filter(Boolean);
}

function render() {
  const parts = getRoute();

  if (parts.length < 3) {
    document.body.innerHTML = `
      <div style="color:white;font-family:monospace">
        Usa formato:<br>
        #/width/height/data<br><br>
        Ejemplo:<br>
        #/2/4/02-21-12-22
      </div>
    `;
    return;
  }

  const w = parseInt(parts[0]);
  const h = parseInt(parts[1]);
  const data = parts[2].split("-");

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;

  const ctx = canvas.getContext("2d");

  for (let y = 0; y < h; y++) {
    const row = data[y] || "";
    for (let x = 0; x < w; x++) {
      const colorIndex = parseInt(row[x] || "0");
      ctx.fillStyle = palette[colorIndex] || "#000000";
      ctx.fillRect(x, y, 1, 1);
    }
  }

  document.body.innerHTML = "";
  document.body.appendChild(canvas);

  // 🔍 zoom bonito
  const scale = 80;
  canvas.style.width = (w * scale) + "px";
  canvas.style.height = (h * scale) + "px";
  canvas.style.imageRendering = "pixelated";
}

// 🚀 render inicial
render();

// 🔁 por si cambia el hash sin recargar
window.addEventListener("hashchange", render);
