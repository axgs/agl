const core = {
    score: 0,
    lives: 0,
    level: 0,

    width: 0,
    height: 0,

    currentState: null,

    /* ####################################################################
       ### OBJECTS                                                      ###
       ####################################################################*/

    objectList: [],

    addObject: function (obj) {
        obj.active = true;
        this.objectList.push(obj);
    },

    updateObjects: function () {
        this.objectList.forEach((obj) => {
            const updateFunc = obj.update;

            if (typeof updateFunc === "function") {
                updateFunc();
            }
        });
    },

    drawObjects: function () {
        this.objectList.forEach((obj) => {
            this.drawSubImageRect(
                obj.pos.x,
                obj.pos.y,
                obj.size.width,
                obj.size.height,
                16,
                0
            );
        });
    },

    resetObjectList: function () {
        this.objectList = [];
    },

    getObjectList: function () {
        return this.objectList;
    },

    /* ####################################################################
       ### UPDATE / RENDER USER CALLBACKS                               ###
       ####################################################################*/
    updateCallback: null,
    renderCallback: null,

    setUpdateCallback(func) {
        if (typeof func == "function") {
            this.updateCallback = func;
        }
    },

    setRenderCallback(func) {
        if (typeof func == "function") {
            this.renderCallback = func;
        }
    },

    init: function (canvasId, width, height) {
        this.ctx = this.getContext2d(canvasId);
        this.setCanvasSize(canvasId, width, height);

        this.imageLoadList = [];
        this.imgList = [];

        this.resetKeyboardButtons();
        this.initKeyboardHandler();
        this.initTiles();
        this.resetObjectList();
        this.updateCallback = null;
        this.renderCallback = null;
    },

    getGameWidth: function () {
        return this.width;
    },

    getGameHeight: function () {
        return this.height;
    },

    getGameSize: function () {
        return [this.width, this.height];
    },

    getScore: function () {
        return this.score;
    },

    getLives: function () {
        return this.lives;
    },

    getLevel: function () {
        return this.level;
    },

    /* ####################################################################
       ### CANVAS FUNCTIONS                                             ###
       ####################################################################*/

    ctx: null,

    cls: function (red, green, blue) {
        this.ctx.fillStyle = `rgb(${red},${green},${blue})`;
        this.ctx.fillRect(0, 0, this.width, this.height);
    },

    drawSubImageRect: function (x, y, width, height, sourceX, sourceY) {
        this.ctx.drawImage(
            this.imgList[1].image,
            sourceX,
            sourceY,
            width,
            height,
            x,
            y,
            width,
            height
        );
    },

    getContext2d(canvasId) {
        return document.getElementById(canvasId).getContext("2d");
    },

    setCanvasSize(canvasId, width, height) {
        this.width = width;
        this.height = height;
        const canvas = document.getElementById(canvasId);
        canvas.width = width;
        canvas.height = height;
    },

    /* ####################################################################
       ### GAMELOOP                                                     ###
       ####################################################################*/
    gameLoop: function () {
        core.update();
        core.render();
        window.requestAnimationFrame(core.gameLoop);
    },

    update: function () {
        core.updateObjects();

        if (typeof core.updateCallback == "function") {
            core.updateCallback();
        }
    },

    render: function () {
        core.cls(0, 0, 50);
        core.drawObjects();

        if (typeof core.renderCallback == "function") {
            core.renderCallback();
        }
    },

    startGame: function (updateFuncCallback, renderFuncCallback) {
        this.setUpdateCallback(updateFuncCallback);
        this.setRenderCallback(renderFuncCallback);
        window.requestAnimationFrame(this.gameLoop);
    },

    /* ####################################################################
       ### PRELOAD: IMAGE & SOUND                                       ###
       ####################################################################*/

    imagePath: "data/img/",
    soundPath: "data/snd/",
    imageLoadList: [],
    soundLoadList: [],

    imgList: [],
    sfxList: [],

    addPreloadImages(imageArray) {
        imageArray.forEach((e) => {
            this.imageLoadList.push({ id: e.id, file: e.file });
        });
    },

    preload(callback) {
        let loadCount = this.imageLoadList.length;

        this.imageLoadList.forEach((e) => {
            const img = new Image();
            this.imgList.push({ id: e.id, image: img });
            img.onload = function () {
                loadCount--;
                if (loadCount < 1) {
                    callback();
                }
            };
            img.src = this.imagePath + e.file;
        });
    },

    /* ####################################################################
       ### INPUT: KEYBORD                                               ###
       ####################################################################*/

    keyboardButtons: {
        left: true,
        right: true,
        up: true,
        down: true,
        fire: true,
    },

    resetKeyboardButtons: function () {
        this.keyboardButtons.left = false;
        this.keyboardButtons.right = false;
        this.keyboardButtons.up = false;
        this.keyboardButtons.down = false;
        this.keyboardButtons.fire = false;
    },

    initKeyboardHandler: function () {
        document.addEventListener(
            "keydown",
            (event) => {
                this.keyboardSetDirection(event, true);
            },
            false
        );

        document.addEventListener(
            "keyup",
            (event) => {
                this.keyboardSetDirection(event, false);
            },
            false
        );
    },

    keyboardSetDirection: function (event, flag) {
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
    },

    getKeyboardLeft: function () {
        return this.keyboardButtons.left;
    },

    getKeyboardRight: function () {
        return this.keyboardButtons.right;
    },

    getKeyboardUp: function () {
        return this.keyboardButtons.up;
    },

    getKeyboardDown: function () {
        return this.keyboardButtons.down;
    },

    getKeyboardFire: function () {
        return this.keyboardButtons.fire;
    },

    /* ####################################################################
       ### GAME-TILES                                                   ###
       ####################################################################*/

    tileWidth: 16,
    tileHeight: 16,
    tileSheetWidth: 320,
    tileSheetHeight: 256,
    tilePosTable: [],

    initTiles: function () {
        this.setTileSize(16, 16);
        this.setTileSheetSize(320, 256);
        this.calcTilePosTable();
    },

    setTileSize: function (width, height) {
        this.tileWidth = width;
        this.tileHeight = height;
    },

    getTileSize: function () {
        return [this.tileWidth, this.tileHeight];
    },

    setTileSheetSize: function (width, height) {
        this.setTileSheetWidt = width;
        this.setTileSheetHeight = height;
    },

    getTileSheetSize: function () {
        return [this.tileSheetWidth, this.tileSheetHeight];
    },

    calcTilePosTable: function () {
        this.tilePosTable = [];
        for (let y = 0; y < this.tileSheetHeight / this.tileHeight; y++) {
            for (let x = 0; x < this.tileSheetWidth / this.tileWidth; x++) {
                this.tilePosTable.push(x * this.tileWidth, y * this.tileHeight);
            }
        }
    },
};

export default core;
