var dirx, diry,posx,posy,vel,anima
var jog = document.querySelector("#jogador")
var telaJogo = document.querySelector("#container-gamer")
var jogo = true
var bases
var gravidade

const init = () => {
    dirx = 0;
    diry = 0;
    posx = telaJogo.offsetLeft / 2;
    posy = (telaJogo.offsetTop - 100);
    vel = 1;
    jogo = true
    
    jog.style.left = posx + "px";
    jog.style.top = posy + "px";
    
    
    criaBases(1)
    gameLoop()
    
}
function gameLoop(){
    if(jogo){        
        moveBases()
        if(!fimDaTela() && !tocandoBase()){
            gravidadeJogador()
        }
    }
    anima = setTimeout(gameLoop,20)
}
function tocandoBase(){
    let posyBase = parseInt(jog.offsetTop) + jog.clientHeight
    let jogLeft = jog.offsetLeft
    let base = document.querySelector(".base")

    if(base.offsetTop < posyBase && base.offsetLeft < jog.offsetLeft + jog.clientWidth){
        return true
    }else{
        return false

    }
    
    
}
function fimDaTela(){
    if(parseInt(jog.style.top) <= (telaJogo.offsetTop - 110 + telaJogo.clientHeight)){
        return false;
    }
    return true
}
function move(el,dirx,diry,vel){
    if(dirx != 0){
        el.style.left = parseInt(el.style.left) + (vel * dirx) + "px"
    }
    if(diry != 0){
        el.style.top = parseInt(el.style.top) + (vel * diry) + "px"
    }
}

function criaBases(i=0){
    let base = document.createElement("div")
    base.classList.add("base")
    if(i == 1){
        base.style.left = document.body.clientWidth / 4 + "px";
        base.style.top = (document.body.offsetTop + 100) + "px";
        telaJogo.appendChild(base)
    }else{
        base.style.left = window.offsetLeft / 2 + "px";
        base.style.top = (telaJogo.offsetTop + telaJogo.clientHeight) + "px";
        telaJogo.appendChild(base) 
    }

}

function gravidadeJogador(){
    
    posy += 2;
    
    jog.style.top = posy + "px" 
}

function moveBases(){
    bases = [...document.querySelectorAll(".base")]
    bases.forEach((base) => {
        base.style.top = (base.style.top - vel) + "px";
    })
    anima = requestAnimationFrame(moveBases)
}
document.addEventListener("keypress", (e) => {
    if(e.key == "a"){
        move(jog,-1,0,5)
    }
    if(e.key == "d"){
        move(jog,1,0,5)
    }
    if(e.key == "w"){
        move(jog,0,-1,5)
    }
    if(e.key == "s"){
        move(jog,0,1,5)
    }
})
window.onload = init