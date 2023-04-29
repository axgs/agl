import { agl } from "./js/agl";

const images = [
    { id: "block", file: "block.png" },
    { id: "tiles1", file: "tiles.png" },
];

// TODO:
const sounds = [{ id: "snd1", file: "snd1.ogg" }];

const objPlayer = {
    pos: { x: 0, y: 100 },
    source: { x: 0, y: 0 },
    size: { width: 16, height: 16 },
    imageKey: "player",
};

agl.init("screen", 320, 256);
agl.addPreloadImages(images);

agl.preload(() => {
    const img = agl.getImage("tiles1");
    console.log(img);

    agl.addObject(objPlayer);
    agl.startGame(update, render);
});

function update() {}

function render() {}
