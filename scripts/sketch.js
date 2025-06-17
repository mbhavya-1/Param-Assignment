let entities;
let newEntities;

let presets = [
    {
        food: 30,
        prey: 20,
        predator: 10
    },
    {}
];
let selectedPreset = 0;

let dispGraph = true;
let paused = false;
let selected = 'prey';

let hist;
let maxHist;
let maxPopulation = 0;

let eatMode = 0;

 let foodImage, preyImage, predatorImage;

    function preload() {
        foodImage = loadImage('./images/plant.png');
        preyImage = loadImage('./images/rabbit.png');
        predatorImage = loadImage('./images/wolf.webp');
    }



function setup() {

    frameRate(20);

    let sketch = document.getElementById('sketch');
    let canvas = createCanvas(sketch.offsetWidth, sketch.offsetHeight);
    canvas.parent(sketch);
    resizeCanvas(sketch.offsetWidth, sketch.offsetHeight, true);

    ellipseMode(RADIUS);

    reset();

    maxHist = ceil(width / 3);
}

function draw() {
    background(144, 238, 144);

    if (!paused) {

        updateHistory();

        if (!toLimitEntities() && random() < 0.5) {
            spawnEntity(random(width), random(height), 'food');
        }
    }

    for (let i = entities.length - 1; i >= 0; i--) {
        let e = entities[i];
        if (!e.dead) e.act(entities);

        if (e.dead) {
            entities.splice(i, 1);
            e.onDeath();
        }
    }

    if (!paused) {
        entities = entities.concat(newEntities);
        newEntities = [];
    }

    if (dispGraph) lineGraph();
}

function keyPressed() {

    let n = parseInt(key);
    if (n) {
        n--;
        if (n < presets.length) selectedPreset = n;
        reset();
    }

    if (key === ' ') paused = !paused;

    if (key === 'E') {
        eatMode++;
        if (eatMode > 2) eatMode = 0;

        document.getElementById('eatMode').innerHTML = 'Eat mode: ' + eatMode;
    }

    if (key === 'G') dispGraph = !dispGraph;

    if (key === 'R') reset();

    if (key === 'F') selected = 'food';
    if (key === 'B') selected = 'prey';
    if (key === 'P') selected = 'predator';
}

function mouseDragged() {
    spawnEntity(mouseX, mouseY, selected);
}

function mousePressed() {
    spawnEntity(mouseX, mouseY, selected);
}


function countTypes(arr) {
    let types = {};

    let keys = Object.keys(ENTITY);
    for (let i = 0; i < keys.length; i++) {
        types[keys[i]] = 0;
    }

    for (let i = 0; i < arr.length; i++) {
        types[arr[i].type]++;
    }

    if (entities.length > maxPopulation) maxPopulation = entities.length;

    return types;
}

function lineGraph() {

    fill(0, 127);
    noStroke();
    rect(0, 25, hist.length, 150);


    let types = Object.keys(hist[0]);
    noFill();
    strokeWeight(2);
    for (let i = 0; i < types.length; i++) {
        let type = types[i];

        stroke(ENTITY[type].color);
        beginShape();
        for (let x = 0; x < hist.length; x++) {
            let y = map(hist[x][type], 0, maxPopulation, 175, 25);
            vertex(x, y);
        }
        endShape();
    }
    strokeWeight(1);

    stroke(204);
    line(hist.length, 25, hist.length, 175);
}


function toLimitEntities() {
    return entities.length + newEntities.length >= 600;
}


function updateHistory() {
    hist.push(countTypes(entities));
    if (hist.length > maxHist) hist.shift();
}


function reset() {
    entities = [];
    newEntities = [];


    let preset = presets[selectedPreset];
    let keys = Object.keys(preset);
    for (let i = 0; i < keys.length; i++) {
        let template = keys[i];
        let count = preset[template];
        for (let j = 0; j < count; j++) {
            spawnEntity(random(width), random(height), template);
        }
    }

    hist = [];
}


function spawnEntity(x, y, type) {
    let e = new Entity(x, y);
    if (type === 'food') {
        e.image = foodImage;
        e.model = MODEL.food;
    } else if (type === 'prey') {
        e.image = preyImage;
        e.model = MODEL.prey; 
    } else if (type === 'predator') {
        e.image = predatorImage;
        e.model = MODEL.predator; 
    }
    applyTemplate(e, ENTITY[type]);
    e.init();
    newEntities.push(e);
}
