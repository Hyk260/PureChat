import React, { StrictMode} from "react"
import { createRoot } from "react-dom/client"
import App from "./app.tsx"
import "./normalize.css"

const root = createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <StrictMode>
    <App />
  </StrictMode>
)