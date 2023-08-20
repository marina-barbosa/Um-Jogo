
let night_sky;
let chao;
let nuvens;
let tamanho = 64;
let blocos = [];
let blocoImg;



function preload() {
    night_sky = loadImage('imagens/night-sky.png');
    chao = loadImage('imagens/chao.png');
    nuvens = loadImage('imagens/nuvens.png');
    blocoImg = loadImage('imagens/bloco.png');
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
}

function draw() {
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



    //borda tela
    stroke(10);
    strokeWeight(10);
    noFill();
    rect(width / 2, height / 2, width - 10, height - 10);



}

