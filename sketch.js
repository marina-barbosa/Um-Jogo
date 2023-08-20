
let night_sky;
let chao;



function preload() {
    night_sky = loadImage('imagens/night-sky.png');
    chao = loadImage('imagens/chao.png');
}

function setup() {
    createCanvas(929, 576);
    rectMode(CENTER);
    textAlign(CENTER);
    //imageMode(CENTER);
}

function draw() {
    background(2, 96, 188);
    image(night_sky, 0, 0, 929, 450); //541, 208
    image(chao, 0, 330, 929, 250);
    fill(0);
    rect(811, 520, 235, 150);


}