
//To start game
document.addEventListener('click',start);
let scr=0
let move=150

//initializing speed and score of eah player
let player={
    speed:5,
    score:0,
    highscore:0
}
//state of keys pressed
let keys={

    ArrowLeft:false,
    ArrowRight:false
}
//listening to the arrow pressed
document.addEventListener('keydown',keyDown)
document.addEventListener('keyup',keyUp)

///changeing state of the arrowkey when pressed
function keyDown(e){
    e.preventDefault();
    keys[e.key]=true;
    console.log(e.key)

}
function keyUp(e){
    e.preventDefault();
    keys[e.key]=false;
}

function randomColor(){
    function hex(){
        let hex=Math.floor(Math.random()*256).toString(16);//c.toString(16)converts the number into hexadecimal
        return(String(hex))
    }
    return('#'+hex()+hex()+hex());
}

function moveLines(){
    let lines=document.querySelectorAll('.lines')
    lines.forEach(function(item){
    if(item.y >=650){
    item.y-=740;
    }
    item.y+=player.speed;
    item.style.top=item.y+"px";
    })

}

function moveLines1(){
    let lines1=document.querySelectorAll('.lines1')
    lines1.forEach(function(item){
    if(item.y >=650){
    item.y-=740;
    }
    item.y+=player.speed;
    item.style.top=item.y+"px";
    })

}



function moveEnemy(car){
    let enemy=document.querySelectorAll('.enemy')
    enemy.forEach(function(item){
        if(isCollide(car,item)){
            endGame()
        }
        console.log(item.y)
        if(item.y>=750){
            item.y=-300
            item.style.left=Math.floor(Math.random()*600)+'px';
        }
        item.y+=player.speed;
        item.style.top=item.y+'px';
    })

}

function gamePlay(){
    let car=document.querySelector('.car');
    let road=gameArea.getBoundingClientRect();
    if(player.start){
        moveLines();
        moveLines1();
        moveEnemy(car);

        
       
        if(keys.ArrowLeft && player.x>0 ){
            // console.log("left",player.x)
            // console.log(player.speed)

            if (player.x<30){
                player.x=40;
            }
            player.x-=30;
        }
        if(keys.ArrowRight && player.x<(road.width-50)){

            // console.log("right",player.x)
            // console.log(player.speed)

            if (player.x>520){
                player.x=520;
            }
            player.x+=30

        }
        car.style.top=player.y+"px";
        car.style.left=player.x+"px";
        window.requestAnimationFrame(gamePlay);
        // setInterval(gamePlay,1000);
        
        scr+=0.013;
        player.score=Math.floor(scr)
        
        console.log(player.score)
        
        let ps=Math.floor(player.score)-1;
        score.innerText="Score: "+ps;
    }

}
function start(){
    startScreen.classList.add('hide');
    gameArea.innerHTML="";
    player.start=true
    player.score=0;
    window.requestAnimationFrame(gamePlay)
    for(let x=0;x<5;x++){
        let roadLine=document.createElement('div');
        roadLine.setAttribute('class','lines');
        roadLine.y=(x*150);
        roadLine.style.top=roadLine.y+'px';
        gameArea.appendChild(roadLine)

        let roadLine1=document.createElement('div');
        roadLine1.setAttribute('class','lines1');
        roadLine1.y=(x*150);
        roadLine1.style.top=roadLine1.y+'px';
        gameArea.appendChild(roadLine1)
    }
    let car=document.createElement('div');
car.setAttribute('class','car')
gameArea.appendChild(car);

//position of the player
player.x=car.offsetLeft;


for(x=0;x<3;x++){
    let enemyCar= document.createElement('div');
    enemyCar.setAttribute('class','enemy');
    enemyCar.y=((x+1)*350)*-1; //-350,-700,-1050
    enemyCar.style.top=enemyCar.y+'px';
    enemyCar.style.backgroundColor=randomColor();
    enemyCar.style.left=Math.floor(Math.random()*350)+'px';
    gameArea.appendChild(enemyCar)
    // console.log('here')
}
}
function isCollide(a,b){
    aclientRect=a.getBoundingClientRect();
    bclientRect=b.getBoundingClientRect();
    return !((aclientRect.bottom<bclientRect.top)||(aclientRect.top>bclientRect.bottom)||(aclientRect.right<bclientRect.left)||(aclientRect.left>bclientRect.right))
    
}
function endGame(){
    highscore=scr
    scr=0
    player.start=false;
    startScreen.classList.remove('hide');
    startScreen.innerHTML="Game Over <br> Final score:"+player.score+" "+"<br>Click on the screen to restart";
}