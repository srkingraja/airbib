import "./style.css";
import { isNullOrUndefined } from "util";
import { BibCardRenderer } from "./modules/bib-card-renderer";

function saveToLocalStorage() {
  var elem = document.getElementById("mainform").elements;

  for (var i = 0; i < elem.length; i++) {
    if (
      elem[i].type === "text" ||
      elem[i].type === "number" ||
      elem[i].type === "color" ||
      elem[i].type === "select-one"
    ) {
      if (elem[i].value !== "") {
        localStorage.setItem(elem[i].id, elem[i].value);
      }
    }
  }
}

function getFromLocalStorage() {
  var elem = document.getElementById("mainform").elements;

  for (var i = 0; i < elem.length; i++) {
    if (
      elem[i].type === "text" ||
      elem[i].type === "number" ||
      elem[i].type === "color" ||
      elem[i].type === "select-one"
    ) {
      setValueIfNotNull(elem[i].id);
    }
  }
}

function setValueIfNotNull(key) {
  const elem = document.getElementById(key);

  if (!isNullOrUndefined(elem)) {
    const value = localStorage.getItem(key);

    if (!isNullOrUndefined(value)) {
      elem.value = value;
    }
  }
}

document.getElementById("apply").onclick = function(event) {
  const renderer = new BibCardRenderer();
  renderer.initialize({
    bgcolor: document.getElementById("color1").value,
    airnumbercolor: document.getElementById("color2").value,
    bodycolor: document.getElementById("color3").value,
    labelcolor: document.getElementById("color4").value
  });
  renderer.renderBibCard();
  saveToLocalStorage();
  event.preventDefault();
};

document.getElementById("download").onclick = function(event) {
  const downloadLink = document.getElementById("downloadlink");
  downloadLink.click();
  event.preventDefault();
};

document.getElementById("clear").onclick = function(event) {
  localStorage.clear();
  window.location.reload();
  event.preventDefault();
};

document.getElementById("downloadlink").onclick = function(event) {
  var bibcanvas = document.getElementById("bibcanvas");
  var img = bibcanvas.toDataURL("image/png");
  event.target.href = img;
};

window.onload = function(event) {
  getFromLocalStorage();
  initSW();
};

function initSW() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("SW registered: ", registration);
      })
      .catch(registrationError => {
        console.log("SW registration failed: ", registrationError);
      });
  }
}
