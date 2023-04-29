import Entity from "./../../js/Entity";

class Player extends Entity {
    constructor() {
        super();
        this.setPos(200, 100);
        this.setImageKey("player");
    }

    update() {}
}

export default Player;
