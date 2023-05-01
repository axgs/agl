import {Agl} from "./js/Agl.js";
import {Player} from "./js/Sprites/Player.js";
import {Tilemap} from "./js/Tilemap.js";

// tilemap data
import {tileMapDataLevel1} from "./js/tilemaps/level1.js";


// game size
const gameWidth = 320;
const gameHeight = 256;

// game objects
let player;

// game background
let tilemap;

// images for preloading
const images = [
    {id: "block", file: "block.png"},
    {id: "tiles1", file: "tiles.png"},
    {id:"font6x7", file: "font6x7.png"}
];

/**
 * TODO: sounds to be preloaded
 */
const sounds = [{id: "snd1", file: "snd1.ogg"}];

/**
 * init game and preload all data
 */
Agl.init("screen", gameWidth, gameHeight);
Agl.addPreloadImages(images);
Agl.preload(() => {
    tilemap = new Tilemap(tileMapDataLevel1, "tiles1");
    initSprites();
    Agl.startGame(update, render);
});

function initSprites() {
    player = new Player();
}

/**
 * user update callback
 */
function update() {
    updateSprites();
}

function updateSprites() {
    player.update();
}

/**
 * user render callback
 */
function render() {
    Agl.cls(0, 0, 100);
    tilemap.render();
    renderSprites();
}

function renderSprites() {
    player.render();
}
