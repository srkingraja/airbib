import WccgLogo from "../../images/WccgLogoSmall.jpg";
import MRLogo from "../../images/MRLogo.png";

export class BibCardRenderer {
  constructor() {
    this.data = {
      riderName: "",
      airNumber: "",
      bloodGroup: "",
      emergencyContact: "",
      emergencyNumber: "",
      theme: 0,
      colors: {
        bgcolor: "#87ceeb",
        airnumbercolor: "#8B0000",
        bodycolor: "#B22222",
        labelcolor: "#000000",
      }
    };
    this.bibcanvas = {};
    this.ctx = {};
  }

  initialize(bibCanvas) {
    this.bibcanvas = bibCanvas;
    this.ctx = bibcanvas.getContext("2d");
  }

  renderBibCard(data) {
    this.data = data;

    switch (this.data.theme) {
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

    const color = this.data.colors.bgcolor;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(20, 20, 560, 210);
    this.ctx.fillRect(20, 350, 560, 30);

    this.ctx.fillStyle = this.data.colors.labelcolor;
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
    this.ctx.fillStyle = this.data.colors.labelcolor;
    this.ctx.font = "20px Arial";

    this.ctx.fillText("Name", 20, 280);
    this.ctx.fillText("Blood Group", 370, 280);

    this.ctx.font = "15px Arial";
    this.ctx.fillText("Emergency Contact & Number", 20, 310);
    //this.ctx.fillText("Emergency Number", 20, 330);
  }

  renderBodyValues() {
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = this.data.colors.bodycolor;

    this.ctx.font = "20px Arial";
    const ridername = this.data.riderName;
    this.ctx.fillText(ridername, 90, 280);
    const bloodgroup = this.data.bloodGroup;
    this.ctx.fillText(bloodgroup, 500, 280);

    this.ctx.font = "15px Arial";
    const emergencycontactandnumber = this.getEmergencyContactNameAndNumber();
    this.ctx.fillText(emergencycontactandnumber, 20, 330);
    //this.ctx.fillText(emergencynumber, 170, 330);
  }

  getEmergencyContactNameAndNumber()
  {
    const emergencycontactandnumber = this.data.emergencyContact + "  " + this.data.emergencyNumber;
    return emergencycontactandnumber;
  }

  renderAirNumber(x, width) {
    this.ctx.fillStyle = this.data.colors.airnumbercolor;
    this.ctx.textAlign = "center";
    const fontSize = this.getFontHeight(this.data.airNumber, width);
    this.ctx.font = "bold " + fontSize + "px Arial";
    console.log("Font size is calculated as " + fontSize + " for width " + width);
    let y = 200 - (((200 - fontSize) / 40) * 5) + 5;
    this.ctx.fillText(this.data.airNumber, x, y);
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
