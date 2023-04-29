export class Entity {
    constructor(imgKey, x, y, width, height, sourceX, sourceY) {
        this.pos = { x: x, y: y };
        this.size = { width: width, height: height };
        this.source = { x: sourceX, y: sourceY };
        this.imageKey = imgKey;
    }

    setPos(x, y) {
        this.pos.x = x;
        this.pos.y = y;
    }

    getX() {
        return this.pos.x;
    }

    getY() {
        return this.pos.y;
    }

    setSize(width, height) {
        this.size.width = width;
        this.size.height = height;
    }

    getWidth() {
        return this.size.width;
    }

    getHeight() {
        return this.size.height;
    }

    setSource(x, y) {
        this.source.x = x;
        this.source.y = y;
    }

    setImageKey(keyValue) {
        if (typeof keyValue == "string") {
            this.imageKey = keyValue;
        } else {
            this.imageKey = "unset";
        }
    }

    getImageKey() {
        return this.imageKey;
    }

    // update method must be implemented
    update() {}
}
