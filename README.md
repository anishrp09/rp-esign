Intro
=======
This module provides an easy and simple way to esignature.
Example
=======

HTML
```html
<!DOCTYPE html>
<html>
    <head>
        <mate charest="utf-8" />
        <title>RP Sign</title>
    </head>
    <body>
        <div id="signature_dIv"></div>
		<button id="saveBtn">Save</button>
		<button id="clearbtn">Clear</button>
    </body>
</html>
```

	Script
	'let objSign = new rpSignature({
		signaturePad 	 : 'signature_dIv', //div name
		penColor	 	 :  '#000',         //Sign color
		pointSize		 :  2,				//Sign Size
		canvasbordercolor: 	'#c3c3c3',		//canvas border color
		canvasbordersize : 	'1',			//canvas border size
		canvaswidth 	 : 	'400',			//canvas  width
		canvasheight	 : 	'200',			//canvas  size
		imageformat      :	'image/png'		//image format
	});

	document.getElementById('saveBtn').onclick = function(){
		getresp = objSign.getSign();
		console.log(getresp);
	}
	document.getElementById('clearbtn').onclick = function(){
		objSign.clearSign();
	}'
