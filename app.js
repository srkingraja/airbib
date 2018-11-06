
function getPreview() {
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

    renderBasicTheme(ctx, "bold 200px Arial", bibcanvas.width / 2);
}

function renderThemeWithWccgLogo() {
    var bibcanvas = document.getElementById("bibcanvas");
    var ctx = bibcanvas.getContext("2d");
    renderBasicTheme(ctx, "bold 170px Arial", (bibcanvas.width / 2) + 50);
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

    ctx.fillStyle = "SKYBLUE";
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
    ctx.fillText("Phone", 370, 310);

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
    ctx.fillText(emergencynumber, 430, 310);
}

function renderAirNumber(ctx, font, x) {
    ctx.fillStyle = "black";
    ctx.textAlign="center";
    ctx.font = font;
    const airnumber = document.getElementById("airnumber").value;
    ctx.fillText(airnumber, x, 200);
}

function renderWccgLogo(ctx) {
    var img = document.getElementById("wccglogo");
    ctx.drawImage(img, 30, 95);
}

document.getElementById("preview").addEventListener("click", function(event){
    getPreview();
    event.preventDefault();
});

document.getElementById("download").addEventListener("click", function(event){
    downloadLink = document.getElementById("downloadlink");
    downloadLink.click();
    event.preventDefault();
});

document.getElementById("downloadlink").addEventListener("click", function(event){
    getPreview();
    var bibcanvas = document.getElementById("bibcanvas");
    var img    = bibcanvas.toDataURL("image/png");
    event.target.href = img;
});