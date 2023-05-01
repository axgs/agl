import {Agl} from "./Agl.js";

export class Tilemap {
    constructor(tilemapData, imageId) {
        this.pos = {x: 0, y: 0};
        this.tileSize = {width: 16, height: 16};
        this.tileSheetSize = {width: 320, height: 256};
        this.screenSize = {width: 320, height: 256};

        this.tilePosTable = null;
        this.maxTiles = 0;
        this.tilesColumn = (this.screenSize.width / this.tileSize.width);
        this.tilesRow = (this.screenSize.height / this.tileSize.height);
        this.maxTiles = this.tilesColumn * this.tilesRow;
        this.tileSheetImage = Agl.getImage(imageId);
        this.calcTilePosTable();

        this.tilemapData = tilemapData.data.slice();
        this.size = {width: tilemapData.width, height: tilemapData.height};
    }

    /**
     * set position of the tilemap
     * @param x
     * @param y
     */
    setPos(x, y) {
        this.pos = {x: x, y: y};
    }

    /**
     * get position of the tilemap
     * @returns {number[]}
     */
    getPos() {
        return [this.pos.x, this.pos.y];
    }

    /**
     * set tile size in pixel
     * @param width
     * @param height
     */
    setTileSize(width, height) {
        this.tileSize.width = width;
        this.tileSize.height = height;
    }

    /**
     * get tile size in pixel
     * @returns {*[]}
     */
    getTileSize() {
        return [this.tileSize.width, this.tileSize.height];
    }

    /**
     * set tilesheet size in pixel
     * @param width
     * @param height
     */
    setTileSheetSize(width, height) {
        this.tileSheetSize.width = width;
        this.tileSheetSize.height = height;
    }

    /**
     * get tilesheet size in pixel
     * @returns {(number)[]}
     */
    getTileSheetSize() {
        return [this.tileSheetSize.width, this.tileSheetSize.height];
    }

    /**
     * calculate each tile-position within the tilesheet image
     */
    calcTilePosTable() {
        this.tilePosTable = [];

        for (let y = 0; y < this.tileSheetSize.height / this.tileSize.height; y++) {
            for (let x = 0; x < this.tileSheetSize.width / this.tileSize.width; x++) {
                this.tilePosTable.push([{x: x * this.tileSize.width, y: y * this.tileSize.height}]);
            }
        }

    }

    /**
     * get the position (x/y) of a tile within the tilesheet
     * @param tileNr
     * @returns {*[]}
     */
    getTileSheetPos(tileNr) {
        if (tileNr >= 0 && tileNr < this.maxTiles) {
            return [this.tilePosTable[tileNr][0].x, this.tilePosTable[tileNr][0].y];
        } else {
            return [0, 0];
        }
    }

    /**
     * render tilemap
     */
    render() {
        const softScrollX = Math.floor(this.pos.x % this.tileSize.width);
        const softScrollY = Math.floor(this.pos.y % this.tileSize.height);

        for (let y = 0; y < this.tilesRow + 1; y++) {
            for (let x = 0; x < this.tilesColumn + 1; x++) {
                const xm = x + Math.floor(this.pos.x / this.tileSize.width);
                const ym = (y + Math.floor(this.pos.y / this.tileSize.height)) * this.size.width;
                const tileNr = this.tilemapData[xm + ym];
                if (tileNr > 0) {
                    const [tx, ty] = this.getTileSheetPos(tileNr - 1);
                    Agl.drawSubImageRect(this.tileSheetImage,
                        (x * this.tileSize.width) - softScrollX,
                        (y * this.tileSize.height) - softScrollY,
                        this.tileSize.width, this.tileSize.height, tx, ty);
                }
            }
        }
    }

    /**
     * get tile-nr. from x/y screen-position
     * @param x
     * @param y
     * @returns {number}
     */
    getTileAt(x, y) {
        let tileNr = -1;
        const xm = Math.floor(x / this.tileSize.width);
        const ym = (Math.floor(y / this.tileSize.height));
        if (xm >= 0 && xm < this.size.width && ym >= 0 && ym < this.size.height) {
            tileNr = this.tilemapData[xm + (ym * this.size.width)];
        }
        return tileNr;
    }

    /**
     * set tile-nr at x/y screen-position
     * @param tileNr
     * @param x
     * @param y
     */
    setTileAt(tileNr, x, y) {
        const xm = Math.floor(x / this.tileSize.width);
        const ym = (Math.floor(y / this.tileSize.height));
        if (xm >= 0 && xm < this.size.width && ym >= 0 && ym < this.size.height) {
            this.tilemapData[xm + (ym * this.size.width)] = tileNr;
        }
    }
}