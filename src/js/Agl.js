class Agl {
    static ctx;

    static width;
    static height;

    static score;
    static lives;
    static level;

    static currentState;
    static updateCallback;
    static renderCallback;
    static imagePath = "data/img/";
    static soundPath = "data/snd/";
    static imageLoadList = [];
    static soundLoadList = [];

    static imgList = [];
    static sfxList = [];

    static keyboardButtons = {
        left: true, right: true, up: true, down: true, fire: true,
    };

    static tileWidth = 16;
    static tileHeight = 16;
    static tileSheetWidth = 320;
    static tileSheetHeight = 256;
    static tilePosTable = [];

    static init(canvasId, width, height) {
        this.resetKeyboardButtons();
        this.ctx = this.getContext2d(canvasId);
        this.setCanvasSize(canvasId, width, height);
        this.imageLoadList = [];
        this.imgList = [];
        this.initKeyboardHandler();
        this.updateCallback = null;
        this.renderCallback = null;
        /*
            this.initTiles();
            */
    }

    static gameLoop() {
        Agl.update();
        Agl.render();
        window.requestAnimationFrame(Agl.gameLoop);
    }

    static update() {
     //   Aglc.updateObjects();

        if (typeof Agl.updateCallback == "function") {
            Agl.updateCallback();
        }
    }

    static startGame(updateFuncCallback, renderFuncCallback) {
        this.setUpdateCallback(updateFuncCallback);
        this.setRenderCallback(renderFuncCallback);
        window.requestAnimationFrame(this.gameLoop);
    }

    static render() {
        if (typeof Agl.renderCallback == "function") {
            Agl.renderCallback();
        }
    }

    static getContext2d(canvasId) {
        return document.getElementById(canvasId).getContext("2d");
    }

    static setCanvasSize(canvasId, width, height) {
        this.width = width;
        this.height = height;
        const canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
    }

    static addPreloadImages(imageArray) {
        imageArray.forEach((e) => {
            this.imageLoadList.push({id: e.id, file: e.file});
        });
    }

    static preload(callback) {
        let loadCount = this.imageLoadList.length;

        this.imageLoadList.forEach((e) => {
            const img = new Image();
            this.imgList.push({id: e.id, image: img});
            img.onload = function () {
                loadCount--;
                if (loadCount < 1) {
                    callback();
                }
            };

            img.src = this.imagePath + e.file;
        });
    }

    static getImage(id) {
        for (let item of this.imgList) {
            if (item.id == id) {
                return item;
            }
        }
    }

    static setUpdateCallback(func) {
        if (typeof func == "function") {
            this.updateCallback = func;
        }
    }

    static setRenderCallback(func) {
        if (typeof func == "function") {
            this.renderCallback = func;
        }
    }

    static resetKeyboardButtons() {
        this.keyboardButtons.left = false;
        this.keyboardButtons.right = false;
        this.keyboardButtons.up = false;
        this.keyboardButtons.down = false;
        this.keyboardButtons.fire = false;
    }

    static initKeyboardHandler() {
        document.addEventListener("keydown", (event) => {
            this.keyboardSetDirection(event, true);
        }, false);

        document.addEventListener("keyup", (event) => {
            this.keyboardSetDirection(event, false);
        }, false);
    }

    static keyboardSetDirection(event, flag) {
        switch (event.key) {
            case "ArrowLeft":
                this.keyboardButtons.left = flag;
                break;
            case "ArrowRight":
                this.keyboardButtons.right = flag;
                break;
            case "ArrowUp":
                this.keyboardButtons.up = flag;
                break;
            case "ArrowDown":
                this.keyboardButtons.down = flag;
                break;
            case "Control":
                this.keyboardButtons.fire = flag;
                break;
        }
    }

    static initTiles() {
        this.setTileSize(16, 16);
        this.setTileSheetSize(320, 256);
        this.calcTilePosTable();
    }

    static setTileSize(width, height) {
        this.tileWidth = width;
        this.tileHeight = height;
    }

    static getTileSize() {
        return [this.tileWidth, this.tileHeight];
    }

    static setTileSheetSize(width, height) {
        this.setTileSheetWidt = width;
        this.setTileSheetHeight = height;
    }

    static getTileSheetSize() {
        return [this.tileSheetWidth, this.tileSheetHeight];
    }

    static calcTilePosTable() {
        this.tilePosTable = [];
        for (let y = 0; y < this.tileSheetHeight / this.tileHeight; y++) {
            for (let x = 0; x < this.tileSheetWidth / this.tileWidth; x++) {
                this.tilePosTable.push(x * this.tileWidth, y * this.tileHeight);
            }
        }
    }
}

export default Agl;