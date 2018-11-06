import './style.css';
import WccgLogo from '../images/WccgLogoSmall.jpg'
import { isNullOrUndefined } from 'util';

function renderBibCard() {
    var selectedTheme = document.getElementById("theme").selectedIndex;

    if (selectedTheme === 1) {
        renderThemeWithWccgLogo();
    } else {
        renderSimpleTheme();
    }
    
}

function renderSimpleTheme() {
    var bibcanvas = document.getElementById("bibcanvas");
    var ctx = bibcanvas.getContext("2d");

    renderBasicTheme(ctx, "bold 180px Arial", bibcanvas.width / 2);
}

function renderThemeWithWccgLogo() {
    var bibcanvas = document.getElementById("bibcanvas");
    var ctx = bibcanvas.getContext("2d");
    renderBasicTheme(ctx, "bold 160px Arial", (bibcanvas.width / 2) + 50);
    renderWccgLogo(ctx);
}

function renderBasicTheme(ctx, airnumberfont, airnumberx) {
    clearCanvas(bibcanvas, ctx);
    renderHeaderFooter(ctx);
    renderAirNumber(ctx, airnumberfont, airnumberx);
    renderBody(ctx);
}

function clearCanvas(canvas, ctx) {
    ctx.clearRect(0, 0, bibcanvas.width, bibcanvas.height);
}

function renderHeaderFooter(ctx) {
    ctx.fillStyle = "WHITE";
    ctx.fillRect(0,0,600,400);

    const color = document.getElementById("color").value;
    ctx.fillStyle = color;
    ctx.fillRect(20,30,560,200);
    ctx.fillRect(20,350,560,30);

    ctx.fillStyle = "black";
    ctx.textAlign="center";
    ctx.font = "bold 15px Arial";
    ctx.fillText("AIR Number", bibcanvas.width / 2, 50);
}

function renderBody(ctx) {
    ctx.textAlign="left"; 

    ctx.font = "20px Arial";

    ctx.fillText("Name", 20, 280);
    ctx.fillText("Blood Group", 370, 280);

    ctx.font = "15px Arial";
    ctx.fillText("Emergency Contact", 20, 310);
    ctx.fillText("Emergency Number", 20, 330);

    ctx.fillStyle = "ORANGERED";

    ctx.font = "20px Arial";
    const ridername = document.getElementById("ridername").value;
    ctx.fillText(ridername, 90, 280);
    const bloodgroup = document.getElementById("bloodgroup").value;
    ctx.fillText(bloodgroup, 500, 280);

    ctx.font = "15px Arial";
    const emergencycontact = document.getElementById("emergencycontact").value;
    ctx.fillText(emergencycontact, 170, 310);
    const emergencynumber = document.getElementById("emergencynumber").value;
    ctx.fillText(emergencynumber, 170, 330);
}

function renderAirNumber(ctx, font, x) {
    ctx.fillStyle = "black";
    ctx.textAlign="center";
    ctx.font = font;
    const airnumber = document.getElementById("airnumber").value;
    ctx.fillText(airnumber, x, 200);
}

function renderWccgLogo(ctx) {
    //var img = document.getElementById("wccglogo");
    var img = new Image();
    img.addEventListener('load', onImageLoad);
    img.src = WccgLogo;
    
    function onImageLoad(e) {
        ctx.drawImage(img, 30, 95);
    };
}

function saveToLocalStorage() {
    var elem = document.getElementById('mainform').elements;

    for (var i = 0; i < elem.length; i++) {
        if (elem[i].type === "text" || elem[i].type === "number" || elem[i].type === "color" || elem[i].type === "select-one") {
            if (elem[i].value !== "") {
                localStorage.setItem(elem[i].id, elem[i].value);
            }            
        }
    }
}

function getFromLocalStorage() {
    var elem = document.getElementById('mainform').elements;

    for (var i = 0; i < elem.length; i++) {
        if (elem[i].type === "text" || elem[i].type === "number" || elem[i].type === "color" || elem[i].type === "select-one") {
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

document.getElementById("apply").onclick = function(event){
    renderBibCard();
    saveToLocalStorage();
    event.preventDefault();
};

document.getElementById("download").onclick = function(event){
    const downloadLink = document.getElementById("downloadlink");
    downloadLink.click();
    event.preventDefault();
};

document.getElementById("clear").onclick = function(event){
    localStorage.clear();
    window.location.reload();
    event.preventDefault();
};

document.getElementById("downloadlink").onclick = function(event){
    var bibcanvas = document.getElementById("bibcanvas");
    var img    = bibcanvas.toDataURL("image/png");
    event.target.href = img;
};

window.onload  = function(event) {
    getFromLocalStorage();
};