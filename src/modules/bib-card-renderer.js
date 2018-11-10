import WccgLogo from '../../images/WccgLogoSmall.jpg'

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
        var selectedTheme = document.getElementById("theme").selectedIndex;
    
        if (selectedTheme === 1) {
            this.renderThemeWithWccgLogo();
        } else {
            this.renderSimpleTheme();
        }
        
    }
    
    renderSimpleTheme() {
        this.renderBasicTheme("bold 180px Arial", bibcanvas.width / 2);
    }
    
    renderThemeWithWccgLogo() {
        this.renderBasicTheme("bold 160px Arial", (bibcanvas.width / 2) + 50);
        this.renderWccgLogo();
    }
    
    renderBasicTheme(airnumberfont, airnumberx) {
        this.clearCanvas();
        this.renderHeaderFooter();
        this.renderAirNumber(airnumberfont, airnumberx);
        this.renderBody();
    }
    
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.bibcanvas.width, this.bibcanvas.height);
    }
    
    renderHeaderFooter(ctx) {
        this.ctx.fillStyle = "WHITE";
        this.ctx.fillRect(0,0,600,400);
    
        const color = this.settings.bgcolor;
        this.ctx.fillStyle = color;
        this.ctx.fillRect(20,30,560,200);
        this.ctx.fillRect(20,350,560,30);
    
        this.ctx.fillStyle = this.settings.labelcolor;
        this.ctx.textAlign="center";
        this.ctx.font = "bold 15px Arial";
        this.ctx.fillText("AIR Number", bibcanvas.width / 2, 50);
    }
    
    renderBody() {
        this.renderBodyLabels();
        this.renderBodyValues();
    }
    
    renderBodyLabels() {
        this.ctx.textAlign="left"; 
        this.ctx.fillStyle = this.settings.labelcolor;
        this.ctx.font = "20px Arial";
    
        this.ctx.fillText("Name", 20, 280);
        this.ctx.fillText("Blood Group", 370, 280);
    
        this.ctx.font = "15px Arial";
        this.ctx.fillText("Emergency Contact", 20, 310);
        this.ctx.fillText("Emergency Number", 20, 330);
    }
    
    renderBodyValues(ctx) {
        this.ctx.textAlign="left"; 
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
    
    
    renderAirNumber(font, x) {
        this.ctx.fillStyle = this.settings.airnumbercolor;
        this.ctx.textAlign="center";
        this.ctx.font = font;
        const airnumber = document.getElementById("airnumber").value;
        this.ctx.fillText(airnumber, x, 200);
    }
    
    renderWccgLogo() {
        var img = new Image();
        img.addEventListener('load', onImageLoad);
        img.src = WccgLogo;
        const ctx = this.ctx;
        
        function onImageLoad(e) {
            ctx.drawImage(img, 30, 95);
        };
    }
}

