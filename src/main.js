import {Agl} from "./js/Agl.js";
import {Player} from "./js/Sprites/Player.js";

let player;

/**
 * images to be preloaded
 */
const images = [
    {id: "block", file: "block.png"},
    {id: "tiles1", file: "tiles.png"},
];

/**
 * TODO: sounds to be preloaded
 */
const sounds = [{id: "snd1", file: "snd1.ogg"}];

/**
 * init game and preload all data
 */
Agl.init("screen", 320, 256);
Agl.addPreloadImages(images);
Agl.preload(() => {
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
    renderSprites();
}

function renderSprites() {
    player.render();
}
