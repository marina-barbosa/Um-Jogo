
let personagem;
let marioVoa = false;
let velocidade = 8;
let andarX = 100;
let andarY = 427;

//background
let night_sky;
let chao;
let nuvens;


//bloco
let blocos = [];
let blocoImg;

//moedas
let moedas = [];
let moedaImg;
let somMoeda;

//pena
let penas = [];
let penaImg;
let somPena;

//setups
let stage = 0;
let tamanho = 64;
let somWin;
let somLose;
let somLevel01;
let somTemaOn = false; // liga e desliga musica tema



// pontos e vidas
let score = 0;
let vida = 1;

// tempo
let tempoTotal;
let tempoMenu;
let tempoGame;
let tempoLimite = 10; // TEMPO

//GRAVIDADE
let gravidade = 1;
let velocidadeG = 0.1;
let caindo = 5; //deve ser igual velocidade

// pulo
let chaoH = 426;//426
let tetoH = 5;
let somPulo;
let jumping = false;
let alturaPulo;




function preload() {
    somMoeda = loadSound('sound/coinsound.wav')
    somPena = loadSound('sound/penasound.mp3')
    somWin = loadSound('sound/you-win.wav')
    somLose = loadSound('sound/Damage-Sound.mp3')
    somLevel01 = loadSound('sound/music-theme.mp3');
    somPulo = loadSound('sound/pulo.mp3');

    personagem = loadImage('imagens/mariodir.png');
    night_sky = loadImage('imagens/night-sky.png');
    chao = loadImage('imagens/chao.png');
    nuvens = loadImage('imagens/nuvens.png');
    blocoImg = loadImage('imagens/bloco.png');
    moedaImg = loadImage('imagens/moeda.png');
    penaImg = loadImage('imagens/pena.png');
}

function reset() {
    personagem = loadImage('imagens/mariodir.png');
    marioVoa = false;
    andarX = 100;
    andarY = 427;
    score = 0;

    moedas = [
        { x: 120, y: 163, coletada: false },
        { x: 184, y: 163, coletada: false },
        { x: 248, y: 163, coletada: false },
        { x: 312, y: 163, coletada: false }
    ];

    penas = [
        { x: 768, y: 448, coletada: false }
    ]
}

function setup() {
    createCanvas(929, 576);
    rectMode(CENTER);
    textAlign(CENTER);
    //imageMode(CENTER);    


    blocos = [
        { x: 120, y: 232 },
        { x: 184, y: 232 },
        { x: 248, y: 232 },
        { x: 312, y: 232 },

        { x: 520, y: 332 },
        { x: 584, y: 332 },
        { x: 648, y: 332 },
        { x: 712, y: 332 }
    ]

    moedas = [
        { x: 120, y: 163, coletada: false },
        { x: 184, y: 163, coletada: false },
        { x: 248, y: 163, coletada: false },
        { x: 312, y: 163, coletada: false }
    ];

    penas = [
        { x: 768, y: 448, coletada: false }
    ]
}// fechamento SETUP

function draw() {



    if (stage == 0) {
        menu();
    }
    if (stage == 1) {
        level01();
    }
    if (stage == 2) {
        level02();
    }
    if (stage == 3) {
        boss01();
    }
    if (stage == 4) {
        telaWin();
    }
    if (stage == 5) {
        telaLose();
    }


    if (!marioVoa) {
        gravitacao();
    }

    tempoTotal = millis(); //tempo começa

    if (colisao(moedas)) {
        somMoeda.play();
        score++
    }

    if (colisao(penas)) {
        marioVoa = true;
        personagem = loadImage('imagens/mariovoadir.png');
        somPena.play();
    }

    // movimentação
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        moveDown();
    }

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        moveUp();
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        moveLeft();
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        moveRight();
    }
    // PULO
    // if (keyIsDown(32)) {
    //     jump = true;
    //     //jumpContador++;
    // } else {
    //     jump = false;
    // }

    if (keyIsDown(32) && !jumping) {
        jumping = true;
        pular();
    }
    //jumpContador++;




    if (mouseIsPressed == true) {
        if (stage == 0) {
            mouseIsPressed = false
            stage = 1; //click starta o jogo
        } else if (stage == 4) {
            mouseIsPressed = false
            stage = 0; //volta pro menu
        } else if (stage == 5) {
            mouseIsPressed = false
            stage = 0; // volta pro menu
        }
    }
    // coordenada verde na tela
    // let mouseXCoord = mouseX;
    // let mouseYCoord = mouseY;
    // noStroke();
    // fill(0, 255, 0);
    // textSize(20);
    // text(`X: ${mouseXCoord}, Y: ${mouseYCoord}`, 100, 200);



    bordaTela();
} //fechamento DRAW


function bordaTela() {
    //borda tela
    stroke(10);
    strokeWeight(10);
    noFill();
    rect(width / 2, height / 2, width - 10, height - 10);
}

function menu() {
    //background(0, 150, 255);
    background(86, 139, 255);
    // image(landscape, width/2, height/2, width, height);

    //tempo
    tempoMenu = tempoTotal;

    //title
    // textFont(marioFont);
    fill(255);
    stroke(0);
    strokeWeight(10);
    textSize(100);
    text('Super Mario', width / 2, 150);
    textSize(40);
    text('Desenvolvido por Marina 2023', width / 2, 210);

    //instrucoes
    text('Como jogar:', width / 2, 330);
    text(`Use A S D W para mover`, width / 2, 380);
    //text('SPACE para pular', width / 2, 430);

    text('CLICK to START', width / 2, 530);

    if (!somTemaOn) {
        somLevel01.play();
        somTemaOn = true;
    }




}//fechamendo do MENU


function level01() {
    if (mouseIsPressed) {
        andarX = mouseX;
        andarY = mouseY
    }
    background(2, 96, 188);
    //fundo ceu
    image(night_sky, 0, 0, width, height); //541, 208 

    //fundo nuvens e montanhas
    image(nuvens, 0, 0, width, height - 65);

    // chao
    for (let i = 0; i < 15; i++) {
        image(chao, tamanho * i, tamanho * 8, tamanho, tamanho);
    }

    // blocos amarelos
    for (let i = 0; i < blocos.length; i++) {
        image(blocoImg, blocos[i].x, blocos[i].y, tamanho, tamanho);
    }
    //moedas
    for (let i = 0; i < moedas.length; i++) {
        if (!moedas[i].coletada) {
            image(moedaImg, moedas[i].x, moedas[i].y, tamanho, tamanho);
        }
    }

    //pena
    for (let i = 0; i < penas.length; i++) {
        if (!penas[i].coletada) {
            image(penaImg, penas[i].x, penas[i].y, tamanho, tamanho);
        }
    }


    //score
    fill(255);
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text(`Pontos: ${score}`, 100, 50);

    //vida
    fill(255);
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text(`Vida: ${vida}`, 250, 50);

    //tempo
    tempoMenu = tempoMenu;
    tempoGame = int((tempoTotal - tempoMenu) / 1000); //converte o tempo
    fill(255);
    stroke(0);
    strokeWeight(10);
    textSize(30);
    text(`Tempo: ${tempoLimite - tempoGame}`, (width - 150), 50);


    if (score >= 4) { // win
        somLevel01.stop();
        somTemaOn = false;
        somWin.play();
        stage = 4;
    }

    if (vida <= 0 || tempoGame >= tempoLimite) { // lose
        somLevel01.stop();
        somTemaOn = false;
        somLose.play();
        stage = 5;
    }

    image(personagem, andarX, andarY, 90, 90);






} //fechamento LEVEL 01


function level02() { }
function boss01() { }

function telaWin() {
    background(255, 215, 0);
    // textFont(marioFont);
    fill(255);
    stroke(0);
    strokeWeight(10);
    textSize(100);
    text('YOU WIN', width / 2, height / 2);
    textSize(40);
    text('CLICK para voltar ao MENU', width / 2, 530);

    //borda tela
    stroke(10);
    strokeWeight(10);
    noFill();
    rect(width / 2, height / 2, width - 10, height - 10);



    reset()



}
function telaLose() {
    background(246, 89, 89);
    // textFont(marioFont);
    fill(255);
    stroke(0);
    strokeWeight(10);
    textSize(100);
    text('GAME OVER', width / 2, height / 2);
    textSize(40);
    text('CLICK para voltar ao MENU', width / 2, 530);

    //borda tela
    stroke(10);
    strokeWeight(10);
    noFill();
    rect(width / 2, height / 2, width - 10, height - 10);



    reset()

}

// COLISAO COLETA
function colisao(objeto) {
    for (let i = 0; i < objeto.length; i++) {
        if (!objeto[i].coletada) {
            const distancia = dist(objeto[i].x, objeto[i].y, andarX, andarY);
            if (distancia < 70) {
                objeto[i].coletada = true;
                return true;
            }
        }
    }
}




// COLISOES COM BLOCOS VERTICAL
function colisaoComBlocos() {
    for (let i = 0; i < blocos.length; i++) {
        if (
            andarX + 90 > blocos[i].x &&
            andarX < blocos[i].x + tamanho &&
            andarY + 90 > blocos[i].y &&
            andarY < blocos[i].y + tamanho
        ) {
            if (andarY + 90 > blocos[i].y && andarY < blocos[i].y) {
                andarY = blocos[i].y - 90;
            } else {
                andarY = blocos[i].y + tamanho;
            }
        }
    }
}

// COLISAO COM BLOCOS HORIZONTAL
function colisaoComBlocos2() {
    for (let i = 0; i < blocos.length; i++) {
        if (
            andarX + 90 > blocos[i].x &&
            andarX < blocos[i].x + tamanho &&
            andarY + 90 > blocos[i].y &&
            andarY < blocos[i].y + tamanho
        ) {
            if (andarX + 90 > blocos[i].x && andarX < blocos[i].x) {
                andarX = blocos[i].x - 90;
            } else {
                andarX = blocos[i].x + tamanho;
            }
        }
    }
}


function gravitacao() {
    if (!jumping) {
        if (andarY <= chaoH) {
            andarY += 5;
            colisaoComBlocos()
        }
    }
}

function pular() {
    if (jumping) {
        alturaPulo = 0;
        while (alturaPulo <= 10 && andarY > tetoH) {
            andarY -= 2;
            alturaPulo += 2;
            console.log(alturaPulo)
            console.log(jumping)
            console.log(andarY)
        }
        jumping = false;
        alturaPulo = 0;

    }
}




// FUNÇÕES MOVER
function moveUp() {
    if (marioVoa) {
        andarY -= velocidade;
    }
    colisaoComBlocos();
    if (andarY < 0) {
        andarY = 0
    }
}

function moveDown() {
    andarY += velocidade;
    colisaoComBlocos();
    if (andarY > 424) {
        andarY = 424
    }
}

function moveLeft() {
    if (marioVoa) {
        personagem = loadImage('imagens/mariovoaesq.png');
    } else {
        personagem = loadImage('imagens/marioesq.png');
    }
    andarX -= velocidade;
    colisaoComBlocos2();
    if (andarX < 0) {
        andarX = 0
    }
}

function moveRight() {
    if (marioVoa) {
        personagem = loadImage('imagens/mariovoadir.png');
    } else {
        personagem = loadImage('imagens/mariodir.png');
    }
    andarX += velocidade;
    colisaoComBlocos2();
    if (andarX > 840) {
        andarX = 840
    }



}



