import {Agl} from "./Agl.js";

export class Sprite {
    /**
     * constructor
     * @param imgKey
     * @param x
     * @param y
     * @param width
     * @param height
     * @param sourceX
     * @param sourceY
     */
    constructor(imgKey, x, y, width, height, sourceX, sourceY) {
        this.enable();
        this.pos = {x: x, y: y};
        this.size = {width: width, height: height};
        this.source = {x: sourceX, y: sourceY};
        this.image = Agl.getImage(imgKey);
        this.speed = {x: 0, y: 0};
        this.direction = {x: 0, y: 0};
    }

    /**
     * enable sprite for updating & rendering
     */
    enable() {
        this.active = true;
    }

    /**
     * disable sprite for updating & rendering
     */
    disable() {
        this.active = false;
    }

    /**
     * set position
     * @param x
     * @param y
     */
    setPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    /**
     * get position values for x & y
     * @returns {*[]}
     */
    getPos() {
        return [this.pos.x, this.pos.y];
    }

    /**
     * get x-position
     * @returns {*}
     */
    getX() {
        return this.pos.x;
    }

    /**
     * get y-position
     * @returns {*}
     */
    getY() {
        return this.pos.y;
    }

    /**
     * set size
     * @param width
     * @param height
     */
    setSize(width, height) {
        this.size.width = width;
        this.size.height = height;
    }

    /**
     * get width
     * @returns {*}
     */
    getWidth() {
        return this.size.width;
    }

    /**
     * get height
     * @returns {*}
     */
    getHeight() {
        return this.size.height;
    }

    /**
     * set source position within the spritesheet image
     * @param x
     * @param y
     */
    setSource(x, y) {
        this.source.x = x;
        this.source.y = y;
    }

    /**
     * set image key value
     * @param keyValue
     */
    setImageKey(keyValue) {
        if (typeof keyValue == "string") {
            this.imageKey = keyValue;
        } else {
            this.imageKey = "unset";
        }
    }

    /**
     * get image key value
     * @returns {string|*}
     */
    getImageKey() {
        return this.imageKey;
    }

    /**
     * set x value for direction
     * @param value
     */
    setDirectionX(value) {
        this.direction.x = value;
    }

    /**
     * set y value for direction
     * @param value
     */
    setDirectionY(value) {
        this.direction.y = value;
    }

    /**
     * set direction values for x & y
     */
    setDirection(x, y) {
        this.direction.x = x;
        this.direction.y = y;
    }

    /**
     * get direction values for x & y
     * @returns {number[]}
     */
    getDirection() {
        return [this.direction.x, this.direction.y];
    }

    /**
     * set speed for x & y values
     * @param x
     * @param y
     */
    setSpeed(x, y) {
        this.speed.x = x;
        this.speed.y = y;
    }

    /**
     * get speed values for x & y
     * @returns {number[]}
     */
    getSpeed() {
        return [this.speed.x, this.speed.y];
    }

    /**
     * update method
     * must be implemented, overwritten
     */
    update() {
    }

    /**
     * render method
     */
    render() {
        if (this.active) {
            Agl.drawSubImageRect(this.image, this.pos.x, this.pos.y, this.size.width, this.size.height, this.source.x, this.source.y);
        }
    }
}
