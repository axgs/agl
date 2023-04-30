export class Agl {
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

    /**
     * init game
     * @param canvasId
     * @param width
     * @param height
     */
    static init(canvasId, width, height) {
        this.ctx = this.getContext2d(canvasId);
        this.setCanvasSize(canvasId, width, height);
        this.initKeyboardHandler();
        this.resetKeyboardButtons();
        this.initTiles();

        this.imageLoadList = [];
        this.imgList = [];
        this.updateCallback = null;
        this.renderCallback = null;
    }

    /**
     * simple gameloop
     */
    static gameLoop() {
        Agl.update();
        Agl.render();
        window.requestAnimationFrame(Agl.gameLoop);
    }

    /**
     * start´s the game and enter the gameloop
     * @param updateFuncCallback
     * @param renderFuncCallback
     */
    static startGame(updateFuncCallback, renderFuncCallback) {
        this.setUpdateCallback(updateFuncCallback);
        this.setRenderCallback(renderFuncCallback);
        window.requestAnimationFrame(this.gameLoop);
    }

    /**
     * method to call the user´s update function
     */
    static update() {
        if (typeof Agl.updateCallback == "function") {
            Agl.updateCallback();
        }
    }

    /**
     * method to call the user´s render function
     */
    static render() {
        if (typeof Agl.renderCallback == "function") {
            Agl.renderCallback();
        }
    }

    /**
     * get canvas 2d drawing context
     * @param canvasId
     * @returns {*}
     */
    static getContext2d(canvasId) {
        return document.getElementById(canvasId).getContext("2d");
    }

    /**
     * set the canvas size
     * @param canvasId
     * @param width
     * @param height
     */
    static setCanvasSize(canvasId, width, height) {
        this.width = width;
        this.height = height;
        const canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
    }

    /**
     * method to register all images to be preloaded
     * @param imageArray
     */
    static addPreloadImages(imageArray) {
        imageArray.forEach((e) => {
            this.imageLoadList.push({id: e.id, file: e.file});
        });
    }

    /**
     * simple image preloader
     * @param callback
     */
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

    /**
     * get an image from the given image id
     * @param id
     * @returns {image}
     */
    static getImage(id) {
        for (let item of this.imgList) {
            if (item.id === id) {
                return item.image;
            }
        }
    }

    /**
     * method to set the user`s update callback function
     * @param func
     */
    static setUpdateCallback(func) {
        if (typeof func == "function") {
            this.updateCallback = func;
        }
    }

    /**
     * method to set the user´s render callback function
     * @param func
     */
    static setRenderCallback(func) {
        if (typeof func == "function") {
            this.renderCallback = func;
        }
    }

    /**
     * clear full canvas with color
     * @param red
     * @param green
     * @param blue
     */
    static cls(red, green, blue) {
        this.ctx.fillStyle = `rgb(${red},${green},${blue})`;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    /**
     * draw sub region of an image to the canvas
     * @img   image
     * @param x
     * @param y
     * @param width
     * @param height
     * @param sourceX
     * @param sourceY
     */
    static drawSubImageRect(img, x, y, width, height, sourceX, sourceY) {
        this.ctx.drawImage(img, sourceX, sourceY, width, height, Math.floor(x), Math.floor(y), width, height);
    }

    /**
     * reset keyboard-state flags
     */
    static resetKeyboardButtons() {
        this.keyboardButtons.left = false;
        this.keyboardButtons.right = false;
        this.keyboardButtons.up = false;
        this.keyboardButtons.down = false;
        this.keyboardButtons.fire = false;
    }

    /**
     * init event listener for keyboard-input
     */
    static initKeyboardHandler() {
        document.addEventListener("keydown", (event) => {
            this.keyboardSetDirection(event, true);
        }, false);

        document.addEventListener("keyup", (event) => {
            this.keyboardSetDirection(event, false);
        }, false);
    }

    /**
     * set corresponding direction for keyboard input
     * @param event
     * @param flag
     */
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

    static getKeyboardLeft() {
        return this.keyboardButtons.left;
    }

    static getKeyboardRight() {
        return this.keyboardButtons.right;
    }

    static getKeyboardUp() {
        return this.keyboardButtons.up;
    }

    static getKeyboardDown() {
        return this.keyboardButtons.down;
    }

    static getKeyboardFire() {
        return this.keyboardButtons.fire;
    }

    /**
     * set default values for the tiles
     */
    static initTiles() {
        this.setTileSize(16, 16);
        this.setTileSheetSize(320, 256);
        this.calcTilePosTable();
    }

    /**
     * set tile size
     * @param width
     * @param height
     */
    static setTileSize(width, height) {
        this.tileWidth = width;
        this.tileHeight = height;
    }

    /**
     * get tile size
     * @returns {number[]}
     */
    static getTileSize() {
        return [this.tileWidth, this.tileHeight];
    }

    /**
     * set size of the tilesheet image
     * @param width
     * @param height
     */
    static setTileSheetSize(width, height) {
        this.setTileSheetWidt = width;
        this.setTileSheetHeight = height;
    }

    /**
     * get size of the tilesheet image
     * @returns {(number)[]}
     */
    static getTileSheetSize() {
        return [this.tileSheetWidth, this.tileSheetHeight];
    }

    /**
     * calculate each tile position in the tilesheet image
     * depending on tile size and tilesheet image size
     */
    static calcTilePosTable() {
        this.tilePosTable = [];
        for (let y = 0; y < this.tileSheetHeight / this.tileHeight; y++) {
            for (let x = 0; x < this.tileSheetWidth / this.tileWidth; x++) {
                this.tilePosTable.push(x * this.tileWidth, y * this.tileHeight);
            }
        }
    }
}