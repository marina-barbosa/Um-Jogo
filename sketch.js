
let modoDev = false; // liga e desliga modo dev
//personagem
let personagem;
let marioVoa = false;
let velocidade = 5;
let andarX = 100;
let andarY = 458;
// animação personagem
let imgPersona = [];
let imgIndice = 7;
let andando = false;
let direita = true;
let esquerda = false;
let parado = true;
let olhando = false;
let imgTempo = 0;
let imgContador = 0;

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

//flor
let flores = [];
let florImg;
let somFlor;

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
let somTemaOff = false; // liga e desliga musica tema



// pontos e vidas
let score = 0;
let vida = 3;

// tempo
let tempoTotal;
let tempoMenu;
let tempoGame;
let tempoLimite = 10; // TEMPO

//GRAVIDADE
let gravidade = 1;
let velocidadeG = 0.1;
let cair = 5; //deve ser igual velocidade
let caindo = false;

// pulo
let chaoH = 470;//426 dif 44
let tetoH = 55;
let somPulo;
let jumping = false;
let alturaPulo;
let pulando = false;

// inimigos
let somDamage;
let spikes = [];
let spikeImg;
let spikeVelo = 0.1;
let spikeDist = 10;
let spikeDirecao = 1;
let spikePos = 648;



//movimento inimigo




function preload() {
    somLevel01 = loadSound('sound/music-theme.mp3');
    somMoeda = loadSound('sound/coinsound.wav')
    //somFlor = loadSound('sound/florsound.mp3')
    somPena = loadSound('sound/penasound.mp3')
    somWin = loadSound('sound/you-win.wav')
    somLose = loadSound('sound/Damage-Sound.mp3')
    somPulo = loadSound('sound/pulo.mp3');
    somDamage = loadSound('sound/Damage-Sound.mp3')

    spikeImg = loadImage('imagens/spike_0.png');
    personagem = loadImage('imagens/persona_8.png');
    night_sky = loadImage('imagens/night-sky.png');
    chao = loadImage('imagens/chao.png');
    nuvens = loadImage('imagens/nuvens.png');
    blocoImg = loadImage('imagens/bloco.png');
    moedaImg = loadImage('imagens/moeda.png');
    florImg = loadImage('imagens/flor.png');
    penaImg = loadImage('imagens/pena.png');

    for (let i = 0; i <= 14; i++) {
        imgPersona[i] = loadImage(`imagens/persona_${i}.png`);
    }
}

function resetar() {
    personagem = loadImage('imagens/persona_8.png');
    marioVoa = false;
    andarX = 100;
    andarY = 427;
    score = 0;
    vida = 3;

    for (let moeda of moedas) {
        moeda.coletada = false;
    }

    // for (let flor of flores) {
    //     flor.coletada = false;
    // }

    // for (let pena of penas) {
    //     pena.coletada = false;
    // }

    for (let spike of spikes) {
        spike.vivo = true;
    }
}


function setup() {
    createCanvas(929, 576);
    rectMode(CENTER);
    textAlign(CENTER);
    imageMode(CENTER);
    angleMode(DEGREES);
    frameRate(60);


    blocos = [
        { x: 153, y: 264 },
        { x: 216, y: 264 },
        { x: 280, y: 264 },
        { x: 344, y: 264 },

        { x: 552, y: 364 },
        { x: 616, y: 364 },
        { x: 680, y: 364 },
        { x: 744, y: 364 }
    ]

    moedas = [
        { x: 152, y: 195, coletada: false },
        { x: 216, y: 195, coletada: false },
        { x: 280, y: 195, coletada: false },
        { x: 344, y: 195, coletada: false }
    ];

    flores = [
        { x: 800, y: 470, coletada: false }
    ]

    penas = [
        { x: 800, y: 470, coletada: false }
    ]

    spikes = [
        { x: 647, y: 300, vivo: true }
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

    // if (colisao(flores)) {
    //     marioGouF = true;
    //     //personagem = loadImage('imagens/marioalter.png');
    //     somFlor.play();
    // }

    // if (colisao(penas)) {
    //     marioVoa = true;
    //     //personagem = loadImage('imagens/mariovoadir.png');
    //     somPena.play();
    // }



    // movimentação
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
        moveDown();
    }

    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
        moveUp();
        olhando = true;
    }

    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
        andando = true;
        esquerda = true;
        moveLeft();
    } else {
        esquerda = false
    }

    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
        andando = true;
        direita = true;
        moveRight();
    } else {
        direita = false;
    }


    if (keyIsDown(32) && !pulando) {
        pulando = true;
        pular();
    }





    if (mouseIsPressed == true) {
        if (stage == 0) {
            mouseIsPressed = false
            somLevel01.play();
            somTemaOff = false;
            stage = 1; //click starta o jogo
        } else if (stage == 4) {
            mouseIsPressed = false
            stage = 0; //volta pro menu
        } else if (stage == 5) {
            mouseIsPressed = false
            stage = 0; // volta pro menu
        }
    }




    bordaTela();

    if (modoDev) {
        stage = 1;
        somLevel01.stop();
        tempoLimite = 999;

        //coordenada do mouse verde na tela 
        let mouseXCoord = mouseX;
        let mouseYCoord = mouseY;
        noStroke();
        fill(10, 255, 10);
        textSize(20);
        text(`X: ${mouseXCoord}, Y: ${mouseYCoord}`, 200, 400);


        // coordenada do personagem vermelha na tela
        noStroke();
        fill(255, 10, 10);
        textSize(20);
        text(`X: ${andarX}, Y: ${andarY}`, 600, 200);


        // distancia de coordenadas
        const dis = dist(blocos[7].x, blocos[7].y, andarX, andarY);
        noStroke();
        fill(255, 10, 10);
        textSize(20);
        text(`distancia: ${dis}`, 600, 150);




        if (stage = 1) {
            // teleporta personagem com click
            if (mouseIsPressed) {
                andarX = mouseX;
                andarY = mouseY
            }
        }

    }
} //fechamento DRAW


function bordaTela() {
    //borda tela
    stroke(10);
    strokeWeight(10);
    noFill();
    rect(width / 2, height / 2, width - 10, height - 10);
}

function menu() {
    background(86, 139, 255);

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






}//fechamendo do MENU


function level01() {

    background(2, 96, 188);
    //fundo ceu
    image(night_sky, width / 2, height / 2, width, height);

    //fundo nuvens e montanhas
    image(nuvens, width / 2, height / 2 - 43, width, height - 65);

    // desenha chao
    for (let i = 0; i < 15; i++) {
        image(chao, tamanho * i, 534, tamanho, tamanho);
    }

    // desenha blocos amarelos
    for (let i = 0; i < blocos.length; i++) {
        image(blocoImg, blocos[i].x, blocos[i].y, tamanho, tamanho);
    }
    //desenha moedas
    for (let i = 0; i < moedas.length; i++) {
        if (!moedas[i].coletada) {
            image(moedaImg, moedas[i].x, moedas[i].y, tamanho, tamanho);
        }
    }

    // desenha flores
    // for (let i = 0; i < flores.length; i++) {
    //     if (!flores[i].coletada) {
    //         image(florImg, flores[i].x, flores[i].y, tamanho, tamanho);
    //     }
    // }

    // desenha penas
    // for (let i = 0; i < penas.length; i++) {
    //     if (!penas[i].coletada) {
    //         image(penaImg, penas[i].x, penas[i].y, tamanho, tamanho);
    //     }
    // }


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
        somTemaOff = true;
        somWin.play();
        stage = 4;
    }

    if (vida <= 0 || tempoGame >= tempoLimite) { // lose
        somLevel01.stop();
        somTemaOff = true;
        somLose.play();
        stage = 5;
    }
    animaPersona();
    image(imgPersona[imgIndice], andarX, andarY, 57, 90);
    //image(personagem, andarX, andarY, 57, 90);

    liveSpike();

    keyReleased();








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



    resetar()



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



    resetar()

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
    } return false
}
//364 y bloco // 76 vert //60 horiz


// COLISOES COM BLOCOS VERTICAL
function colisaoComBlocos() {
    for (let i = 0; i < blocos.length; i++) {
        if (
            andarX + 76 > blocos[i].x &&
            andarX < blocos[i].x + 76 &&
            andarY + 76 > blocos[i].y &&
            andarY < blocos[i].y + 76
        ) {
            if (andarY + 76 > blocos[i].y && andarY < blocos[i].y) {
                andarY = blocos[i].y - 76;
            } else {
                andarY = blocos[i].y + 76;
            }
        }
    }
}

// COLISAO COM BLOCOS HORIZONTAL
function colisaoComBlocos2() {
    for (let i = 0; i < blocos.length; i++) {
        if (
            andarX + 60 > blocos[i].x &&
            andarX < blocos[i].x + 60 &&
            andarY + 60 > blocos[i].y &&
            andarY < blocos[i].y + 60
        ) {
            if (andarX + 60 > blocos[i].x && andarX < blocos[i].x) {
                andarX = blocos[i].x - 60;
            } else {
                andarX = blocos[i].x + 60;
            }
        }
    }
}

function colisaoInimiga(inimigo) {
    for (let i = 0; i < inimigo.length; i++) {
        if (inimigo[i].vivo) {
            const distancia = dist(inimigo[i].x, inimigo[i].y, andarX, andarY);
            if (distancia < 70) {
                return true;
            }
        }
    } return false
}


function gravitacao() {
    if (!pulando) {
        if (andarY <= 455) {
            caindo = true
            andarY += 5;
            colisaoComBlocos()
        }
    } else {
        caindo = false;
    }
}

function pular() {
    if (pulando) {
        alturaPulo = 0;
        while (alturaPulo <= 10 && andarY > 55) {
            andarY -= 2;
            alturaPulo += 2;
            console.log(alturaPulo)
            console.log(pulando)
            console.log(andarY)
        }
        alturaPulo = 0;

    }
}



// FUNÇÕES MOVER
function moveUp() {
    if (marioVoa) {
        andarY -= velocidade;
    }
    colisaoComBlocos();
    if (andarY < 55) {
        andarY = 55
    }
}

function moveDown() {
    andarY += velocidade;
    colisaoComBlocos();
    if (andarY > 458) {
        andarY = 458
    }
}

function moveLeft() {
    if (marioVoa) {
        //personagem = loadImage('imagens/mariovoaesq.png');
    } else {
        personagem = loadImage('imagens/persona_1.png');
    }
    andarX -= velocidade;
    colisaoComBlocos2();
    if (andarX < 32) {
        andarX = 32
    }
}

function moveRight() {
    if (marioVoa) {
        //personagem = loadImage('imagens/mariovoadir.png');
    } else {
        personagem = loadImage('imagens/persona_8.png');
    }
    andarX += velocidade;
    colisaoComBlocos2();
    if (andarX > 893) {
        andarX = 893
    }



}

function animaPersona() {


    if (parado && !pulando) {
        if (direita) {
            imgIndice = 7;
        } else if (esquerda) {
            imgIndice = 0;
        }
    }
    if (andando && !pulando) {
        imgTempo += 3;
        if (imgTempo > 15) {
            imgContador++
            imgTempo = 0;
        } else {

        }
        if (direita) {
            imgIndice = (imgContador % 3) + 8; // 8, 9, 10
        }
        if (esquerda) {
            imgIndice = (imgContador % 3) + 1; //1, 2, 3
        }
    }
    if (pulando) {

        if (direita) {
            imgIndice = 11;
        } else if (esquerda) {
            imgIndice = 4;
        }
    }
    // if (caindo) {
    //     if (direita) {
    //         imgIndice = 12;
    //     } else if (esquerda) {
    //         imgIndice = 5;
    //     }
    // }
    if (olhando && !andando && !pulando) {
        if (direita) {
            imgIndice = 13;
        } else if (esquerda) {
            imgIndice = 6;
        }
    }
}
function keyReleased() {
    //68 e 65 e 32
    if (keyCode === 68 || keyCode === 65) {
        andando = false;
    }

    if (keyCode === 32) {
        pulando = false;
    }

    if (keyCode === 87) {
        olhando = false;
    }

}
function damage() {
    vida -= 1;
    andarX = 100;
    andarY = 458;
    somDamage.play();
}
//560 -- 647 -- 730
//spikes[i].x = spikes[i].x + (spikeVelo * spikeDist);

function liveSpike() {
    //desenha spike
    for (let i = 0; i < spikes.length; i++) {
        if (spikes[i].vivo) {
            image(spikeImg, spikes[i].x, spikes[i].y, tamanho, tamanho);


        }
        // movimenta spike
        if (spikes[i].x == 730) {
            spikeDirecao = -1;
        } else if (spikes[i].x == 560) {
            spikeDirecao = 1;
        }
        if (spikeDirecao == 1) {
            spikes[i].x = spikes[i].x + (spikeVelo * spikeDist);
        } else {
            spikes[i].x = spikes[i].x - (spikeVelo * spikeDist);
        }

    }
    // verifica colisao com spike
    if (colisaoInimiga(spikes)) {
        damage();
    }


}




