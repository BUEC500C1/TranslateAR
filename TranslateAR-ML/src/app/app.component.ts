import { Component, OnInit } from '@angular/core';

//import COCO-SSD model as cocoSSD
import * as cocoSSD from '@tensorflow-models/coco-ssd';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit 
{
  title = 'TF-ObjectDetection';
  private video: HTMLVideoElement;
  

  ngOnInit()
  { 
    this.webcam_init();
    this.predictWithCocoModel();
  }

public async predictWithCocoModel(){
  const model = await cocoSSD.load('lite_mobilenet_v2');
  this.detectFrame(this.video,model);
  console.log('model loaded');
}

translate_text(text){
  // "translate" the text

  return "translated " + text
}

webcam_init()
  {  
  this.video = <HTMLVideoElement> document.getElementById("vid");
  
     navigator.mediaDevices
    .getUserMedia({
    audio: false,
    video: {
      facingMode: "user",
    }
     })
    .then(stream => {
    this.video.srcObject = stream;
    this.video.onloadedmetadata = () => {
      this.video.play();
    };
    });
  }
  
  detectFrame = (video, model) => {
    model.detect(video).then(predictions => {
      this.renderPredictions(predictions);
      requestAnimationFrame(() => {
        this.detectFrame(video, model);
      });
    });
  }

  renderPredictions = predictions => {
    const canvas = <HTMLCanvasElement> document.getElementById("canvas");
    
    const ctx = canvas.getContext("2d");
    
    canvas.width  = 840;
    canvas.height = 650;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // Font options.
    const font = "16px sans-serif";
    const transFont = "22px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";
    ctx.drawImage(this.video,0, 0,840,650);

    // Draws bounding boxes for each item first
    predictions.forEach(prediction => {
      // adds translated field to object
      prediction.translated = this.translate_text(prediction.class)

      // Draws the Bounding Box
      // Gets coordinates
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draws the box
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x, y, width, height);


      // Draw the Label Background.
      ctx.fillStyle = "#00FFFF";

      // determines width of label background by checking width of both texts
      var originalTextWidth = ctx.measureText(prediction.class).width;
      ctx.font = transFont;
      var translatedTextWidth = ctx.measureText(prediction.translated).width;
      const textWidth = Math.max(originalTextWidth, translatedTextWidth);

      // determines height of label by adding heights of both texts
      var translatedTextHeight = parseInt(font, 10); // base 10
      ctx.font = font;
      var originalTextHeight = parseInt(font, 10);
      const textHeight = originalTextHeight + translatedTextHeight;

      ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    });

    // then it fills in text for each box
    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";

      // Draws original text in small font
      const textHeight = parseInt(font, 10);
      ctx.fillText(prediction.class, x, y);

      // Draws translated text in larger font
      ctx.font = transFont;
      ctx.fillText(prediction.translated, x, y + textHeight);
    });
  };


}
