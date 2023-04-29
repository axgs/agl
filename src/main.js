import g from "./js/core";
import Player from "./js/GameObjects/Player";

const images = [
    { id: "block", file: "block.png" },
    { id: "tiles1", file: "tiles.png" },
];

const sounds = [{ id: "snd1", file: "snd1.ogg" }];

const objPlayer = {
    pos: { x: 0, y: 100 },
    source: { x: 0, y: 0 },
    size: { width: 16, height: 16 },
    imageKey: "player",
};

const p = new Player();
p.update();

g.init("screen", 320, 256);

g.addPreloadImages(images);

g.preload(() => {
    g.addObject(objPlayer);
    g.startGame(update, render);
});

function update() {}

function render() {}
