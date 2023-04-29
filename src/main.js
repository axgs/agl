import { agl } from "./js/agl";
import { Entity } from "./js/Entity";

const p = new Entity("block", 100, 50, 16, 16, 8, 4);

const images = [
    { id: "block", file: "block.png" },
    { id: "tiles1", file: "tiles.png" },
];

// TODO:
const sounds = [{ id: "snd1", file: "snd1.ogg" }];

agl.init("screen", 320, 256);
agl.addPreloadImages(images);

agl.preload(() => {
    const img = agl.getImage("tiles1");
    agl.startGame(update, render);
});

function update() {}

function render() {}
