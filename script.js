var dirx, diry,posx,posy,vel,anima
var jog = document.querySelector("#jogador")
var telaJogo = document.querySelector("#container-gamer")
var jogo = true
var bases
var gravidade

document.addEventListener("keypress",(e) =>{
        
});

const init = () => {
    dirx = 0;
    diry = 0;
    posx = window.offsetLeft / 2;
    posy = (telaJogo.offsetTop - 100);
    vel = 1;
    jogo = true
    
    jog.style.left = posx + "px";
    jog.style.top = posy + "px";
    
    gameLoop()
    gravidadeJogador()
    criaBases(1)
}
function gameLoop(){
    if(jogo){        
        moveBases()
    }
    anima = requestAnimationFrame(gameLoop)
}

function criaBases(i=0){
    let base = document.createElement("div")
    base.classList.add("base")
    if(i == 1){
        base.style.left = document.body.clientWidth / 3 + "px";
        base.style.top = (document.body.clientHeight / 2) + "px";
        telaJogo.appendChild(base)
    }else{
        base.style.left = window.offsetLeft / 2 + "px";
        base.style.top = (telaJogo.offsetTop + telaJogo.clientHeight) + "px";
        telaJogo.appendChild(base) 
    }

}

function gravidadeJogador(){
    if(posy >= (telaJogo.offsetTop - 110 + telaJogo.clientHeight) || bases.some(base => posy + 15 != base.offsetTop)){
        clearTimeout(gravidade)
        return 
    }
    posy += 2;
    
    jog.style.top = posy + "px"
    gravidade = setTimeout(gravidadeJogador,.1) 
}

function moveBases(){
    bases = [...document.querySelectorAll(".bases")]
    bases.forEach((base) => {
        base.style.top = (base.style.top - vel) + "px";
    })
    anima = requestAnimationFrame(moveBases)
}

window.onload = init