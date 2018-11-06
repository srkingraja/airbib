
function getPreview() {
    var bibcanvas = document.getElementById("bibcanvas");
    var ctx = bibcanvas.getContext("2d");
    ctx.clearRect(0, 0, bibcanvas.width, bibcanvas.height);

    ctx.fillStyle = "WHITE";
    ctx.fillRect(0,0,600,400);

    ctx.fillStyle = "SKYBLUE";
    ctx.fillRect(20,30,560,200);
    ctx.fillRect(20,350,560,30);

    ctx.fillStyle = "black";
    ctx.textAlign="center";
    ctx.font = "bold 15px Arial";
    ctx.fillText("AIR Number", bibcanvas.width / 2, 50);
    ctx.font = "bold 200px Times";
    const airnumber = document.getElementById("airnumber").value;
    ctx.fillText(airnumber, bibcanvas.width / 2, 200);

    ctx.textAlign="left"; 
    ctx.font = "20px Arial";

    ctx.fillText("Name", 20, 280);
    ctx.fillText("Blood Group", 350, 280);
    ctx.fillText("Emergency Contact", 20, 310);
    ctx.fillText("Phone", 350, 310);

    ctx.fillStyle = "ORANGERED";
    const ridername = document.getElementById("ridername").value;
    ctx.fillText(ridername, 100, 280);
    const bloodgroup = document.getElementById("bloodgroup").value;
    ctx.fillText(bloodgroup, 470, 280);
    const emergencycontact = document.getElementById("emergencycontact").value;
    ctx.fillText(emergencycontact, 200, 310);
    const emergencynumber = document.getElementById("emergencynumber").value;
    ctx.fillText(emergencynumber, 420, 310);
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