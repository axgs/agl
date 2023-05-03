// library files
import {Agl} from "./js/Agl.js";
import {Tilemap} from "./js/Tilemap.js";

// game objects
import {Player} from "./js/Sprites/Player.js";

// tilemap data
import {tileMapDataLevel1} from "./js/tilemaps/level1.js";

// game objects
let player;

// game background, fonts etc.
let tilemap;
let font6x7;

// images for preloading
const images = [
    {id: "block", file: "block.png"},
    {id: "tiles1", file: "tiles.png"},
    {id: "font6x7", file: "font6x7.png"}
];

/**
 * TODO: sounds to be preloaded
 */
const sounds = [{id: "snd1", file: "snd1.ogg"}];

Agl.init("screen", 320, 256);

Agl.addPreloadImages(images);

Agl.preloadImages(() => {
    tilemap = new Tilemap(tileMapDataLevel1, "tiles1");
    font6x7 = Agl.getImage("font6x7");
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
    Agl.drawText(font6x7,100,100,8,7,"12345 TEST 6789");

}

function renderSprites() {
    player.render();
}
