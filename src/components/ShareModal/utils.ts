import { ref } from "vue"

export const backgColor = ref([
  {
    colorA: "#6DD5C4",
    colorB: "#5697F9",
    angle: "45deg",
  },
  {
    colorA: "#622FC2",
    colorB: "#87FFAD",
    angle: "45deg",
  },
  {
    colorA: "#4A4FFF",
    colorB: "#87FFAD",
    angle: "45deg",
  },
  {
    colorA: "#BAA7E4",
    colorB: "#F59F9C",
    angle: "45deg",
  },
  {
    colorA: "#45A5D7",
    colorB: "#F59F9C",
    angle: "45deg",
  },
  {
    colorA: "#2CB0CE",
    colorB: "#CDCBFF",
    angle: "150deg",
  },
  {
    colorA: "#B0BDBF",
    colorB: "#CDCBFF",
    angle: "45deg",
  },
])

export const back = ref(`
  background: linear-gradient(var(--houdini-angle), var(--houdini-colorA), var(--houdini-colorB));
  --houdini-colorA: #B0BDBF;
  --houdini-colorB: #CDCBFF;
  --houdini-angle: 120deg;
`)

export function getBackgroundStyle({ angle, colorA, colorB }) {
  return `background-image: linear-gradient(${angle}, ${colorA}, ${colorB});`
}

export function onColor(item) {
  const preview = document.querySelector("#preview")
  preview.style.setProperty("--houdini-colorA", item.colorA)
  preview.style.setProperty("--houdini-colorB", item.colorB)
  preview.style.setProperty("--houdini-angle", item.angle)
}
