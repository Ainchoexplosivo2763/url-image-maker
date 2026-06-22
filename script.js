const palette = [
  "#000000", "#ffffff", "#ff0000", "#00ff00",
  "#0000ff", "#ffff00", "#ff00ff", "#00ffff",
  "#888888", "#ff8800", "#8800ff", "#0088ff",
  "#00aa00", "#aa0000", "#aaaaaa", "#222222"
];

function getData() {
  return window.location.hash.replace("#", "").split("/").filter(Boolean);
}

function renderAsPNG() {
  const parts = getData();

  if (parts.length < 3) return;

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
      const c = parseInt(row[x] || "0");
      ctx.fillStyle = palette[c] || "#000";
      ctx.fillRect(x, y, 1, 1);
    }
  }

  // 🔥 ESTO ES LA CLAVE
  // convierte canvas a PNG real
  const img = document.createElement("img");
  img.src = canvas.toDataURL("image/png");

  document.body.innerHTML = "";
  document.body.appendChild(img);

  // opcional zoom
  img.style.width = (w * 80) + "px";
  img.style.height = (h * 80) + "px";
  img.style.imageRendering = "pixelated";
}

renderAsPNG();
window.addEventListener("hashchange", renderAsPNG);
