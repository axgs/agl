import {Agl} from "./Agl.js";

export class Tilemap {
    constructor() {
        this.tileSize = {width: 16, height: 16};
        this.tileSheetSize = {width: 320, height: 256};
        this.tilePosTable = null;
        this.maxTiles = 0;
        this.tilesColumn = (this.tileSheetSize.width / this.tileSize.width);
        this.tilesRow = (this.tileSheetSize.height / this.tileSize.height);
        this.maxTiles = this.tilesColumn * this.tilesRow;
        this.tileSheetImage = Agl.getImage("tiles1");
        this.calcTilePosTable();
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
        for (let y = 0; y < this.tilesRow; y++) {
            for (let x = 0; x < this.tilesColumn; x++) {
                const tileNr = 1;

                if (tileNr > 0) {
                    const [tx, ty] = this.getTileSheetPos(tileNr);
                    Agl.drawSubImageRect(this.tileSheetImage, x * this.tileSize.width, y * this.tileSize.height, this.tileSize.width, this.tileSize.height, tx, ty);
                }
            }
        }
    }
}