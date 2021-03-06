import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';

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

  object_dict = {"" : ""};

  constructor(private http: HttpClient) {}

  ngOnInit()
  { 
    // clears object dictionary on startup
    this.object_dict = {"" : ""};
    this.webcam_init();
    this.predictWithCocoModel();
  }

  add_translation(text, data, language) {
    var temp = Object();
    temp[language] = data.translation;
    this.object_dict[text] = temp;
  }

  selectedLanguage: string = '';

  //event handler for the select element's change event
  selectChangeHandler (event: any) {
    //update the ui
    this.selectedLanguage = event.target.value;
  }

  public async predictWithCocoModel(){
    const model = await cocoSSD.load('lite_mobilenet_v2');
    this.detectFrame(this.video,model);
    console.log('model loaded');
  }

  translate_text(text, language){
    // proxy url is used to avoid CORS issues
    const proxy_url = "https://cors-anywhere.herokuapp.com/";
    const base_url = "https://translate-ar.herokuapp.com/translate?";
    const language_param = "translateTo=" + language + "&textToTranslate=";

    this.http.get(proxy_url + base_url + language_param + text).
      subscribe(
        (data) => this.add_translation(text, data, language),
        (err) => console.log(err)
      )

    return "";
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

    var language = (this.selectedLanguage).trim();

    // Draws bounding boxes for each item first
    predictions.forEach(prediction => {
      prediction.translated = "";

      // checks first for a cached translation if available
      if (prediction.class in this.object_dict) {
        if (language in this.object_dict[prediction.class]) {
          prediction.translated = this.object_dict[prediction.class][language];
        }
      }
      
      // otherwise translates new phrase and adds to cache
      if (prediction.translated == "") {
        prediction.translated = this.translate_text(prediction.class, language);
      }

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
