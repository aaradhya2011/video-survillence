video=""
status=""
object=[];

function preload()
{
    video=createVideo("video.mp4");
    video.hide();
}

function setup()
{
    canvas=createCanvas(480,380);
    canvas.center();
}

function draw()
{
    image(video,0,0,480,380);
    if(status != "")
    {
      objectDetector.detect(video, gotResults);
      for(i=0; i<object.length; i++)
      {
        document.getElementById("status").innerHTML="Status: objects detected";
        document.getElementById("number_of_objects").innerHTML="Number of objects decected are: "+object.length;
        fill("red");
        percent=floor(object[i].confidence * 100);
        text(object[i].label +" " + percent + "%", object[i].x + 15, object[i].y + 15);
        noFill();
        stroke("red");
        rect(object[i].x, object[i].y, object[i].width, object[i].height);
      }  
    }
}

function gotResults(error,results)
{
    if(error)
    {
        console.log(error)
    }
    console.log(results)
    object=results;
}

function start()
{
    objectDetector=ml5.objectDetector('cocssd',modelLoaded);
    document.getElementById("status").innerHTML="status: Detecting objects";
}

function modelLoaded()
{
    console.log("modelLoaded!");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}