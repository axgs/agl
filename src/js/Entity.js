class Entity {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.size = { width: 0, height: 0 };
        this.source = { x: 0, y: 0 };
        this.imageKey = "";
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

export default Entity;
