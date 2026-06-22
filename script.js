const palette = [
  "#000000", "#ffffff", "#ff0000", "#00ff00",
  "#0000ff", "#ffff00", "#ff00ff", "#00ffff",
  "#888888", "#ff8800", "#8800ff", "#0088ff",
  "#00aa00", "#aa0000", "#aaaaaa", "#222222"
];

// leer URL tipo /2/4/02-21-12-22
const parts = window.location.pathname.split("/").filter(Boolean);

const width = parseInt(parts[0]);
const height = parseInt(parts[1]);
const data = parts[2].split("-");

const canvas = document.getElementById("c");
canvas.width = width;
canvas.height = height;

const ctx = canvas.getContext("2d");

let i = 0;
for (let y = 0; y < height; y++) {
  const row = data[y] || "";
  for (let x = 0; x < width; x++) {
    const colorIndex = parseInt(row[x] || "0");
    ctx.fillStyle = palette[colorIndex] || "#000";
    ctx.fillRect(x, y, 1, 1);
  }
}

// opcional: escalar para ver mejor
const scale = 50;
canvas.style.width = width * scale + "px";
canvas.style.height = height * scale + "px";
