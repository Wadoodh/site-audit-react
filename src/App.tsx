import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [showResults, setShowResults] = useState(true);

  useEffect(() => {
    console.log("use effect");

    if (!showResults) return;

    fetchWebflowCssFile();
    fetchMainPage();
  }, []);

  async function fetchMainPage() {
    const res = await fetch("https://ent-site-audit.webflow.io/");
    const html = await res.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const pageWrap: HTMLElement = doc.getElementById("page-wrap")!;
    document.body.append(pageWrap);

    setShowResults(false);
  }

  async function fetchWebflowCssFile() {
    const doc = await fetchWebflowTips();
    const cssFile: Element = doc.querySelector(`link[rel="stylesheet"]`)!;
    document.head.append(cssFile);
  }

  async function fetchWebflowTips() {
    const res = await fetch("https://ent-site-audit.webflow.io/components");
    const html = await res.text();
    const parser = new DOMParser();
    return parser.parseFromString(html, "text/html");
  }

  return (
    <>
      <div></div>
    </>
  );
}

export default App;
