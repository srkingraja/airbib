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
      theme: 'simple',
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
      case 'withwccglogo':
        this.renderThemeWithWccgLogo();
        break;
      case 'withmrlogo':
        this.renderThemeWithMRLogo();
        break;
      case 'withwccgmrlogo':
        this.renderThemeWithWccgAndMRLogo();
        break;
      case 'simpleportrait':
        this.renderSimplePortraitTheme();
        break;
      case 'simplesquare':
        this.renderSimpleSquareTheme();
        break;
      default:
        this.renderSimpleTheme();
    }
  }

  renderSimpleTheme() {
    this.renderBasicTheme(bibcanvas.width / 2, bibcanvas.width - 40);
  }

  renderSimplePortraitTheme() {
    this.renderBasicTheme(bibcanvas.width / 2, bibcanvas.width - 40);
  }

  renderSimpleSquareTheme() {
    this.renderBasicTheme(bibcanvas.width / 2, bibcanvas.width - 40);
  }

  renderThemeWithWccgLogo() {
    this.renderBasicTheme(bibcanvas.width / 2 + 50, bibcanvas.width - 140);
    this.renderLogo(WccgLogo, 30);
  }

  renderThemeWithMRLogo() {
    this.renderBasicTheme(bibcanvas.width / 2 + 50, bibcanvas.width - 140);
    this.renderLogo(MRLogo, 30);
  }

  renderThemeWithWccgAndMRLogo() {
    this.renderBasicTheme(bibcanvas.width / 2, bibcanvas.width - 240);
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

  renderHeaderFooter() {
    this.ctx.fillStyle = "WHITE";
    this.ctx.fillRect(0, 0, this.bibcanvas.width, this.bibcanvas.height);

    const color = this.data.colors.bgcolor;
    this.ctx.fillStyle = color;

    const headerHeight = this.isLandscapeMode() ? 210 : 200;
    this.ctx.fillRect(20, 20, this.bibcanvas.width - 40, headerHeight);
    this.ctx.fillRect(20, 350, this.bibcanvas.width- 40, 30);

    this.ctx.fillStyle = this.data.colors.labelcolor;
    this.ctx.textAlign = "center";
    this.ctx.font = "bold 15px Arial";
    this.ctx.fillText("AIR Number", bibcanvas.width / 2, 50);
  }

  isLandscapeMode() {
    return this.bibcanvas.width == 600;
  }

  renderBody() {
    this.renderBodyLabels();
    this.renderBodyValues();
  }

  renderBodyLabels() {
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = this.data.colors.labelcolor;
    this.ctx.font = "20px Arial";

    const nameLabelY = this.isLandscapeMode() ? 280 : 260;
    this.ctx.fillText("Name", 20, nameLabelY);
    const bloodGroupLabelX = this.isLandscapeMode() ? 370 : 20;
    const bloodGroupLabelY = this.isLandscapeMode() ? 280 : 285;
    
    this.ctx.fillText("Blood Group", bloodGroupLabelX, bloodGroupLabelY);

    this.ctx.font = "15px Arial";
    this.ctx.fillText("Emergency Contact & Number", 20, 310);
    //this.ctx.fillText("Emergency Number", 20, 330);
  }

  renderBodyValues() {
    this.ctx.textAlign = "left";
    this.ctx.fillStyle = this.data.colors.bodycolor;

    this.ctx.font = "20px Arial";
    const ridername = this.data.riderName;
    const nameX = this.isLandscapeMode() ? 90 : 90;
    const nameY = this.isLandscapeMode() ? 280 : 260;
    this.ctx.fillText(ridername, nameX, nameY);
    const bloodgroup = this.data.bloodGroup;
    const bloodGroupX = this.isLandscapeMode() ? 500 : 150;
    const bloodGroupY = this.isLandscapeMode() ? 280 : 285;
    this.ctx.fillText(bloodgroup, bloodGroupX, bloodGroupY);

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
