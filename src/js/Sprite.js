import {Agl} from "./Agl.js";

export class Entity {
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
        this.active = true;
        this.pos = {x: x, y: y};
        this.size = {width: width, height: height};
        this.source = {x: sourceX, y: sourceY};
        this.image = Agl.getImage(imgKey);
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
     * update method
     * must be implemented, overwritten
     */
    update() {
        console.log("default entity update method");
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
