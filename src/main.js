import {Entity} from "./js/Entity.js";
import Agl from "./js/Agl.js";

const p = new Entity("block", 100, 50, 16, 16, 8, 4);

const images = [
    {id: "block", file: "block.png"},
    {id: "tiles1", file: "tiles.png"},
];

// TODO:
const sounds = [{id: "snd1", file: "snd1.ogg"}];

Agl.init("screen", 320, 256);
Agl.addPreloadImages(images);
Agl.preload(() => {
    const img = Agl.getImage("tiles1");
    console.log(img);
    Agl.startGame(update, render);
});

function update() {
}

function render() {
}
