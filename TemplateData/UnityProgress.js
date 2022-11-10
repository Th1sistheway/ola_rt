function init() {

}

function UnityProgress (dom) {
	this.progress = 0.0;
	this.message = "";
	this.dom = dom;
	var parent = dom.parentNode;

	createjs.CSSPlugin.install(createjs.Tween);
	createjs.Ticker.setFPS(60);

	this.SetProgress = function (progress) { 
		if (this.progress < progress) {
			this.progress = progress;
		}
		if (progress == 1) {
			this.SetMessage("Ladataan...");
		} 
		this.Update();
	}

	this.SetMessage = function (message) {
		var matches = message.match(/Downloading data([^(]+)\((\d+(\.\d+)?)\/(\d+)\)/);
		
		if (matches) {
			var value = parseInt(matches[2]);
			var max = parseInt(matches[4]);
			var valueFixed = (value / 1024 / 1024).toFixed(1);
			var maxFixed = (max / 1024 / 1024).toFixed(1);
			
			message = message.replace(value + "/", valueFixed + "/");
			message = message.replace("/" + max, "/" + maxFixed + " MB");
		}
		else if (message == 'Downloading (0.0/1)')
		{
			message = 'Ladataan...';
		}
		else if (message.indexOf('Preparing') != -1)
		{
			message = 'Ladataan...';
		}
		
		message = message.replace("/", " / ");
		
		this.message = message; 
		this.Update();
	}

	this.Clear = function() {
		document.getElementById("loadingBox").style.display = "none";
	}

	this.Update = function() {
		var length = 200 * Math.min(this.progress, 1);
		bar = document.getElementById("progressBar");
		createjs.Tween.removeTweens(bar);
		createjs.Tween.get(bar).to({width: length}, 500, createjs.Ease.sineOut);
		bar.style.width = length + "px";
		document.getElementById("loadingInfo").innerHTML = this.message;
	}

	this.Update();
}