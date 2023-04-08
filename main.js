peter_pan_song="";
harry_potter_theme_song="";

leftwrist_x=0;
leftwrist_y=0;

rightwrist_x=0;
rightwrist_y=0;

scorerightWrist = 0;
scoreleftWrist = 0;

song_Peter_pan = "";
song_harry_potter_theme = "";


function setup()
{
    canvas=createCanvas(600,530);
    canvas.center();

    video=createCapture(VIDEO);
    video.hide();

    poseNet=ml5.poseNet(video,modalLoaded);
    poseNet.on('pose',gotposes);
}

function draw()
{
    image(video,0,0,600,530);

    
    fill("#00ff00");
    stroke("#ff0000");

    song_Peter_pan = peter_pan_song.isPlaying();
    console.log("song_Peter_pan");

    song_harry_potter_theme = harry_potter_theme_song.isPlaying();
    console.log("song_harry_potter_theme");

    if(scoreleftWrist > 0.2){
        circle(leftWrist_x,leftWrist_y,20);
        harry_potter_theme_song.stop();
        if(song_name == false){
            peter_pan_song.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_id").innerHTML = "Song Name: Peter Pan Song";
        }
    }

}

if(scorerightWrist > 0.2){
    circle(rightWrist_x,rightWrist_y,20);
    peter_pan_song.stop();
    if(song_harry_potter_theme == false){
        harry_potter_theme_song.play();
    }
    else{
        console.log("Song Name: Harry Potter Theme Song");
        document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
    }
}

function preload()
{
   peter_pan_song=loadSound("music.mp3");
   harry_potter_theme_song=loadSound("music2.mp3")
}

function modalLoaded()
{
    console.log('PoseNet Is Initialized');
}

function gotposes(resuts)
{
    if(resuts.lenth>0)
    {
        console.log(resuts);

        scoreleftWrist = results[0].pose.keypoints[9].score;
        console.log(scoreleftWrist);

        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log(scorerightWrist);

        leftwrist_x=resuts[0].pose.leftwrist.x;
        leftwrist_y=resuts[0].pose.leftwrist.y;
        console.log("leftwrist_x="+leftwrist_x+"leftwrist_y="+leftwrist_y);

        rightwrist_x=resuts[0].pose.rightwrist.x;
        rightwrist_y=resuts[0].pose.rightwrist.y;
        console.log("rightwrist_x="+rightwrist_x+"rightwrist_y="+rightwrist_y);
    }
}