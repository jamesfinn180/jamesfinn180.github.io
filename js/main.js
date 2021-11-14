// Pointillism

// Get image and draw on canvas to grab colours of each pixel
var makeImage = () => {
	
	img = document.getElementById('main-img');

	colCan = document.getElementById('col-canvas');
	colCan.width = img.width;
	colCan.height = img.height;
	colCtx = colCan.getContext('2d');
	colCtx.drawImage(img, 0, 0, img.width, img.height);

	drawCan = document.getElementById('draw-canvas');
	drawCan.width = img.width;
	drawCan.height = img.height;
	drawCtx = drawCan.getContext('2d');
}

/*function getPixelCol(e) {
	var pixelData = ctx.getContext('2d').getImageData(e.offsetX, e.offsetY, 1, 1).data;
	
	var col = "rgb("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+")";
	console.log(col);
	drawShape(e.offsetX, e.offsetY, col);
}*/

var drawShape = (x, y, col, min, max) => {
	drawCtx.beginPath();
	drawCtx.fillStyle=col;
	drawCtx.arc(x, y, ranRange(min, max), 0, 2 * Math.PI);
	drawCtx.fill();
}

var ranRange = (min, max) => {
	return Math.floor(Math.random()*(max-min+1)+min);
}

let pointInterval;
var startPointilising = () => {
	if(!pointInterval) {
		console.log("start");
		pointInterval = setInterval(function() {
			randPixel();
		}, 5);
	}
	else {
		console.log("stop");
		clearInterval(pointInterval);
		pointInterval = false;
	}	
}

var imgFilter = (filter, val) => {
	drawCtx.filter = filter + "(" + val + ")";
	drawCtx.drawImage(img, 0, 0, img.width, img.height);	
}

var randPixel = () => {
	let ranX = ranRange(0, colCan.width);
	let ranY = ranRange(0, colCan.height);
	let pixelData = colCtx.getImageData(ranX, ranY, 1, 1).data;
	let col = "rgba("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+","+(pixelData[3]/255)+")";
	console.log(col);
	drawShape(ranX, ranY, col, 3, 6);
}

var regPixel = () => {
	for(let i=0; i<drawCan.height; i+=10) {
		for(let j=0; j<drawCan.width; j+=10) {
			let pixelData = colCtx.getImageData(j, i, 1, 1).data;
			let col = "rgba("+pixelData[0]+","+pixelData[1]+","+pixelData[2]+","+(pixelData[3]/255)+")";
			console.log(pixelData);
			drawShape(j, i, col, 5, 5);
		}
	}
}

var sketchPixel = () => {

	let imgData = colCtx.getImageData(0, 0, img.width, img.height);
	let data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
    	if( (data[i] + data[i+1] + data[i+2]) < (data[i+4] + data[i+5] + data[i+6] + 30) &&
    		(data[i] + data[i+1] + data[i+2]) > (data[i+4] + data[i+5] + data[i+6] - 30)) {
    		data[i] = data[i+1] = data[i+2] = 255;
    	}
    	else {
    		data[i] = data[i+1] = data[i+2] = 0;
    	}
    }
    drawCtx.putImageData(imgData, 0, 0);
}


var getSum = (total, num) => {
    return total + num;
}


// UPLOAD IMAGE
//document.getElementById('user-file').addEventListener('change', readURL, true);
function readURL() {
    let file = document.getElementById("user-file").files[0];
    let reader = new FileReader();
    reader.onloadend = function() {
        document.getElementById('main-img').src = reader.result;     
    }
    if(file) {
        reader.readAsDataURL(file);     
    }
    else {
    	console.log("Not FILE");
    }
}

// DOWNLOAD IMAGE
var downloadImg = (tis) => {
    tis.href = drawCan.toDataURL();
    tis.download = "pointilized.png";
}