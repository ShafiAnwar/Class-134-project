
status="";
song=""
objects=[];
function preload(){
    song=loadSound("red_alert.mp3");
}
function setup(){
    canvas=createCanvas(300,300);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    objectDetector=ml5.objectDetector('cocossd',ModelLoaded);
    document.getElementById("status").innerHTML="Status:Detecting Objects:";
}

function ModelLoaded(){
    console.log("Model Loaded");
    status=true;
    
}
function gotResult(error,result){
    if(error){
        console.error(error);

    }
        else{
            console.log(result);
            objects=result;
        }
}

function draw(){
    image(video,0,0,300,300);
    if(status!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video,gotResult);
     for(i=0;i<objects.length;i++){
         document.getElementById("status").innerHTML="Status:Object Detected";
         document.getElementById("number_objects_count").innerHTML="Objects Count are:"+objects.length;
         percent=floor(objects[i].confidence*100);
         if(objects[i].label=="person"){
             document.getElementById("found_not").innerHTML="Baby Found";
             song.stop();
            }
         else{
            document.getElementById("found_not").innerHTML="Baby Not Found";
            song.play();
         }
         fill(r,g,b);
         text(objects[i].label+" "+percent+"%",objects[i].x+15,objects[i].y+15);
         noFill();
         stroke(r,g,b);
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
     }  
     
     if(objects.length==0){
        document.getElementById("found_not").innerHTML="Baby Not Found";
        song.play();
     }
    }
}
//ends here
