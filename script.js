const palette = [
  "#000000", "#ffffff", "#ff0000", "#00ff00",
  "#0000ff", "#ffff00", "#ff00ff", "#00ffff",
  "#888888", "#ff8800", "#8800ff", "#0088ff",
  "#00aa00", "#aa0000", "#aaaaaa", "#222222"
];

// toma URL real
const path = window.location.pathname;

// quita el nombre del repo
const clean = path.replace("/url-image-maker/", "");

// ejemplo: 2/4/02-21-12-22
const parts = clean.split("/").filter(Boolean);

if (parts.length < 3) {
  document.body.innerHTML = "usa /w/h/data";
  throw new Error("missing data");
}

const w = parseInt(parts[0]);
const h = parseInt(parts[1]);
const data = parts[2].split("-");

const canvas = document.createElement("canvas");
canvas.width = w;
canvas.height = h;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

for (let y = 0; y < h; y++) {
  const row = data[y] || "";
  for (let x = 0; x < w; x++) {
    const c = parseInt(row[x] || "0");
    ctx.fillStyle = palette[c] || "#000";
    ctx.fillRect(x, y, 1, 1);
  }
}

// zoom
canvas.style.width = (w * 50) + "px";
canvas.style.height = (h * 50) + "px";
canvas.style.imageRendering = "pixelated";
