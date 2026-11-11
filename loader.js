(async function loadFieldRange() {
  const packageRoot = new URL(".", document.currentScript.src);
  const container = document.getElementById("field-range");
  const status = document.getElementById("field-range-status");

  try {
    const response = await fetch(new URL("index.html", packageRoot));
    if (!response.ok) throw new Error("Game request returned HTTP " + response.status);

    const gamePage = new DOMParser().parseFromString(await response.text(), "text/html");
    if (!gamePage.getElementById("weaponData")) throw new Error("The game page is missing");
    const base = gamePage.createElement("base");
    base.href = packageRoot.href;
    gamePage.head.prepend(base);

    const frame = document.createElement("iframe");
    frame.title = "T5DW Field Range";
    frame.allow = "autoplay; fullscreen; gamepad";
    frame.allowFullscreen = true;
    frame.srcdoc = "<!doctype html>\n" + gamePage.documentElement.outerHTML;
    container.replaceChildren(frame);
  } catch (error) {
    status.textContent = "Field Range could not load. " + error.message;
  }
})();
