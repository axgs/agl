import {Sprite} from "../Sprite.js";
import {Agl} from "./../Agl.js";

export class Player extends Sprite {
    constructor() {
        super("block", 120, 100, 32, 32, 0, 0);
        this.setSpeed(1, 1);
    }

    update() {
        this.setDirection(0, 0);

        if (Agl.getKeyboardLeft()) {
            this.setDirectionX(-1);
        }

        if (Agl.getKeyboardRight()) {
            this.setDirectionX(1);
        }

        if (Agl.getKeyboardUp()) {
            this.setDirectionY(-1);
        }

        if (Agl.getKeyboardDown()) {
            this.setDirectionY(1);
        }

        let [sx, sy] = this.getSpeed();
        let [dx, dy] = this.getDirection();
        let [px, py] = this.getPos();
        px += sx * dx;
        py += sy * dy;
        this.setPos(px, py);
    }
}