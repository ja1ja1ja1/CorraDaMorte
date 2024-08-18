class Jogador{
    constructor(){
        let jogador
    }
    base = false;

    move(dirx,diry,vel){
        if(dirx != 0){
            this.jogador.style.left = parseInt(this.jogador.style.left) + (vel * dirx) + "px"
        }
        if(diry != 0){
            this.jogador.style.top = parseInt(this.jogador.style.top) + (vel * diry) + "px"
        }
    }

    gravidade(){
        if(this.base){
            move(jog,0,-1,1);
        }

        if(!this.base){
            move(jog,0,1,1);
        }
    }
}

var dirx, diry,posx,posy,vel,anima
var jog = document.querySelector("#jogador")
var jogador = new Jogador(jog)
var telaJogo = document.querySelector("#container-gamer")
var jogo = true
var bases
var loop
var dirAtual
var jogadorCaindo = true
var baseEmBaixo
var bordas = {
    left: telaJogo.offsetLeft,
    right: telaJogo.offsetLeft + telaJogo.offsetWidth,
    top: telaJogo.offsetTop,
    bottom: telaJogo.offsetTop + telaJogo.offsetHeight
}


const init = () => {
    dirx = 0;
    diry = 0;
    posx = document.body.clientWidth / 4;
    posy = (telaJogo.offsetTop - 50);
    vel = 1;
    jogo = true
    console.log(posx);
    
    jog.style.left = posx + "px";
    jog.style.top = posy + "px";


    
    criaBases(1)
    gameLoop()
}
function gameLoop(){
    let posY = jog.offsetTop + jog.clientHeight + 1;
    let posX = jog.offsetLeft;
    let baseEmBaixoLeft = document.elementFromPoint(posX,posY -1)
    let baseEmBaixoRight = document.elementFromPoint(posX + jog.clientWidth,posY -1)

    // for(let i = posY;i < posY + 4;i++){
    //     baseEmBaixo.push()
    // }
    
    if(jogo){        
        moveBases()
        //Quando ele tocar o bottom na base 
        if(!jogador.base && (baseEmBaixoLeft.classList.contains("base") || baseEmBaixoRight.classList.contains("base"))){
            console.log(baseEmBaixoRight);
            
            baseEmBaixo = baseEmBaixoLeft || baseEmBaixoRight
            jogador.base = true;
        }
        //tenho que pegar o intervalo dentro
        console.log(parseInt(jog.style.left));
        
        if(jogador.base){
            console.log(parseInt(baseEmBaixo.style.left) + " > " + (parseInt(jog.style.left) + jog.clientWidth));
            
            if(parseInt(baseEmBaixo.style.left) > parseInt(jog.style.left) + jog.clientWidth
                || parseInt(baseEmBaixo.style.left) + baseEmBaixo.clientWidth < parseInt(jog.style.left))
            jogador.base = false;
        }

        jogador.gravidade()
    }
    anima = requestAnimationFrame(gameLoop)
}
function tocandoBase(base){
    let posyBase = parseInt(jog.offsetTop) + jog.clientHeight
    let jogLeft = jog.offsetLeft

    if(base.offsetTop == posyBase 
        && (base.offsetLeft < jog.offsetLeft + jog.clientWidth && base.offsetTop == posyBase) 
        && (jog.offsetLeft < base.offsetLeft + base.clientWidth && base.offsetTop == posyBase))
    {
        return true
    }else{
        return false
    }
}
function tocouNasBordas(el){
    if(bordas.left == el.offsetLeft)return true 
    if(bordas.right == el.offsetLeft + el.clientWidth)return true 
    if(bordas.top == el.offsetTop)return true 
    // if(bordas.bottom == el.offsetTop + el.clientHeight)return true 

    return false;
}
function fimDaTela(){
    if(parseInt(jog.style.top) <= (telaJogo.offsetTop - 110 + telaJogo.clientHeight)){
        return false;
    }
    return true;
}
function move(el,dirx,diry,vel){
    if(tocouNasBordas(el)){
        el.remove()
        // jogo = false;
        return 
    }
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
    // if(i == 1){
    //     base.style.left = document.body.clientWidth / 3 + "px";
    //     base.style.top = (document.body.offsetTop + 100) + "px";
    //     // telaJogo.appendChild(base)
    //     criaBases()
    // }else{
    // }
    base.style.left = document.body.offsetLeft + Math.random() * (telaJogo.clientWidth - 100) + "px";
    base.style.top = (telaJogo.offsetTop + telaJogo.clientHeight) + "px";
    loop = setTimeout(criaBases,2000)
    telaJogo.appendChild(base) 

    bases = [...document.querySelectorAll(".base")]

}

function gravidadeJogador(){
    let base = bases.find(base => tocandoBase(base))
    if(base){
        jog.style.top = parseInt(base.style.top) + "px"
        return
    }

    if(bases.some(base => !fimDaTela(base)) && bases.some(base => !tocandoBase(base))){
        move(jog,0,1,1);
    }
}

function moveBases(){
    bases.forEach((base) => {
        move(base,0,-1,1)
        // base.style.top = (parseInt(base.style.top) - vel) + "px";
    })
}
document.addEventListener("keypress", (e) => {
    if(e.key == "a"){
        move(jog,-1,0,1)
        move(jog,-1,0,1)
    }
    if(e.key == "d"){
        move(jog,1,0,1)
        move(jog,1,0,1)
    }
    if(e.key == "w"){
        move(jog,0,-1,1)
        move(jog,0,-1,1)
    }
    if(e.key == "s"){
        move(jog,0,1,1)
        move(jog,0,1,1)
    }
})
window.onload = init

