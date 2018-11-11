import WccgLogo from "../../images/WccgLogoSmall.jpg";
import MRLogo from "../../images/MRLogo.png";

export class BibCardRenderer {
  constructor() {
    this.settings = {
      bgcolor: "#87ceeb",
      airnumbercolor: "#8B0000",
      bodycolor: "#B22222",
      labelcolor: "#000000"
    };
    this.bibcanvas = document.getElementById("bibcanvas");
    this.ctx = bibcanvas.getContext("2d");
  }

  initialize(settings) {
    this.settings = settings;
  }

  renderBibCard() {
    const selectedTheme = document.getElementById("theme").selectedIndex;

    switch (selectedTheme) {
      case 1:
        this.renderThemeWithWccgLogo();
        break;
      case 2:
        this.renderThemeWithMRLogo();
        break;
      case 3:
        this.renderThemeWithWccgAndMRLogo();
        break;
      default:
        this.renderSimpleTheme();
    }
  }

  renderSimpleTheme() {
    this.renderBasicTheme(bibcanvas.width / 2, 560);
  }

  renderThemeWithWccgLogo() {
    this.renderBasicTheme(bibcanvas.width / 2 + 50, 460);
    this.renderLogo(WccgLogo, 30);
  }

  renderThemeWithMRLogo() {
    this.renderBasicTheme(bibcanvas.width / 2 + 50, 460);
    this.renderLogo(MRLogo, 30);
  }

  renderThemeWithWccgAndMRLogo() {
    this.renderBasicTheme(bibcanvas.width / 2, 360);
    this.renderLogo(WccgLogo, 30);
    this.renderLogo(MRLogo, 470);
  }

  renderBasicTheme(airnumberx, airnumberwidth) {
    this.clearCanvas();
    this.renderHeaderFooter();
    this.renderAirNumber(airnumberx, airnumberwidth);
    this.renderBody();
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.bibcanvas.width, this.bibcanvas.height);
  }

  renderHeaderFooter(ctx) {
    this.ctx.fillStyle = "WHITE";
    this.ctx.fillRect(0, 0, 600, 400);

    const color = this.settings.bgcolor;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(20, 30, 560, 200);
    this.ctx.fillRect(20, 350, 560, 30);

    this.ctx.fillStyle = this.settings.labelcolor;
    this.ctx.textAlign = "center";
    this.ctx.font = "bold 15px Arial";
    this.ctx.fillText("AIR Number", bibcanvas.width / 2, 50);
  }

  renderBody() {
    this.renderBodyLabels();
    this.renderBodyValues();
  }

  renderBodyLabels() {
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = this.settings.labelcolor;
    this.ctx.font = "20px Arial";

    this.ctx.fillText("Name", 20, 280);
    this.ctx.fillText("Blood Group", 370, 280);

    this.ctx.font = "15px Arial";
    this.ctx.fillText("Emergency Contact", 20, 310);
    this.ctx.fillText("Emergency Number", 20, 330);
  }

  renderBodyValues(ctx) {
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = this.settings.bodycolor;

    this.ctx.font = "20px Arial";
    const ridername = document.getElementById("ridername").value;
    this.ctx.fillText(ridername, 90, 280);
    const bloodgroup = document.getElementById("bloodgroup").value;
    this.ctx.fillText(bloodgroup, 500, 280);

    this.ctx.font = "15px Arial";
    const emergencycontact = document.getElementById("emergencycontact").value;
    this.ctx.fillText(emergencycontact, 170, 310);
    const emergencynumber = document.getElementById("emergencynumber").value;
    this.ctx.fillText(emergencynumber, 170, 330);
  }

  renderAirNumber(x, width) {
    const airnumber = document.getElementById("airnumber").value;
    this.ctx.fillStyle = this.settings.airnumbercolor;
    this.ctx.textAlign = "center";
    const fontSize = this.getFontHeight(airnumber, width);
    this.ctx.font = "bold " + fontSize + "px Arial";
    console.log("Font size is calculated as " + fontSize + " for width " + width);
    let y = 200 - (((200 - fontSize) / 40) * 5) + 5;
    this.ctx.fillText(airnumber, x, y);
  }

  getFontHeight(text, allowedWidth) {
    for (var fontSize = 200; fontSize >= 0 ; fontSize = fontSize - 5) {
        this.ctx.font = "bold " + fontSize + "px Arial";
        const calcWidth = this.ctx.measureText(text).width;
        if (calcWidth <= allowedWidth - 5) {
            return fontSize;
        }
    }
  }

  renderLogo(logoImage, x) {
    var img = new Image();
    img.addEventListener("load", onImageLoad);
    img.src = logoImage;
    const ctx = this.ctx;

    function onImageLoad(e) {
      ctx.drawImage(img, x, 100);
    }
  }
}
