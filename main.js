let bird = document.querySelector("#birdy");
let display = document.querySelector("#display");
let pipes = document.querySelector("#pipes");
let playBtn = document.querySelector("#playBtn");
let birdY = bird.offsetTop;
let speed  = 0;
let birdDeg = 0;
let flip = 0
let id = 1;
let score = 0;
let gravity = setInterval(fall,20,0);
let going = setInterval(forward,20);
let spawnPipe = setInterval(()=>{createPipe(Random(20,130),40,id)},3000);
clearInterval(gravity)
clearInterval(going)
clearInterval(spawnPipe)


display.addEventListener("click",()=>{fly(flip)})
playBtn.addEventListener("click",gameStart)
document.addEventListener("keydown",(e)=>{e.repeat?null:e.keyCode===32 ? fly(flip):null;;})


function gameStart(){
    score=0;
    bird.style.top="115px";
    birdY=115;
    gravity = setInterval(fall,45,3);
    going = setInterval(forward,20);
    spawnPipe = setInterval(()=>{createPipe(Random(20,130),40,id)},Random(1500,3000));
    display.style.animationPlayState="running";
    bird.style.animationPlayState="running";
    id=1;
    flip=20;
    speed = 1;
    playBtn.style.display="none";
    pipes.innerHTML = "";
    document.querySelector('#score').innerHTML = score;
}


function gameOver(){
    clearInterval(gravity)
    clearInterval(going)
    clearInterval(spawnPipe)
    display.style.animationPlayState="paused"
    bird.style.animationPlayState="paused"
    flip=0
    playBtn.style.display="block"
}


function isCollision(){
    if (birdY >= 185) {
        gameOver()
    }
    document.querySelectorAll(".pipe").forEach((item) =>{
        let gap =item.querySelector("#gap");
        let downPipe = item.querySelector("#downPipe");
        // console.log((downPipe.offsetTop+Number(item.style.top.split("p")[0]) + gap.offsetHeight ));
        if(item.offsetLeft + (item.offsetWidth/2) <= bird.offsetLeft + (bird.offsetWidth/2) && item.offsetLeft + (item.offsetWidth/2) >= bird.offsetLeft + (bird.offsetWidth/2 - 2) ){
            incScore()
        }
        if((item.offsetLeft<=bird.offsetLeft + bird.offsetWidth && item.offsetLeft + item.offsetWidth >= bird.offsetLeft )
            && (bird.offsetTop <= (downPipe.offsetTop+Number(item.style.top.split("p")[0]) - gap.offsetHeight ) 
        || bird.offsetTop + bird.offsetHeight  >= downPipe.offsetTop+Number(item.style.top.split("p")[0]))){
             gameOver()
        }
    })
}


function createPipe(y,gap,pid){
    let code=`
    <div class="pipe" id="pipe-${pid}">
        <div id="upPipe"></div>
        <div id="gap"></div>
        <div id="downPipe"></div>
    </div>
    `;
    pipes.innerHTML += code;
    let pipe = document.querySelector(`#pipe-${pid}`);
    pipe.style.right = "-26px"
    pipe.querySelector('#gap').style.height = `${gap}px`
    pipe.style.top = `${y*-1}px`;
    id++
}


function forward(){
    document.querySelectorAll(".pipe").forEach((item) =>{
        let right = Number(item.style.right.split("p")[0]);
        if(right<160){
            item.style.right = `${right+speed}px` 
        }else{
            item.remove()
        }
    })
}


function fly(x) {
    if (flip != 0){
        if (birdY > 0) {
            if (birdDeg >= -45 ){
                birdDeg= -45
                bird.style.transform = ` rotate(${birdDeg}deg) `
            }
            if(x<birdY){
                bird.style.top= `${birdY-x}px`;
                birdY -= x
            }
        }
    }
}


function fall(x) {
    if(x!=0){
        if (birdY < 185) {
            if (birdDeg <45 ){
                bird.style.transform = ` rotate(${birdDeg+=3}deg) `
            }
            bird.style.top= `${birdY+x}px`;
            birdY += x
        }
        isCollision()
    }
}


function incScore(){
    score++
    document.querySelector('#score').innerHTML = score;
}


function Random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }