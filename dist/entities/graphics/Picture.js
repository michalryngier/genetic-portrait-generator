"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jimp_1 = __importDefault(require("jimp"));
const JimpImage_1 = __importDefault(require("./JimpImage"));
const KERNELS = [
    {
        name: "emboss",
        kernel: [
            [-2, -1, 0],
            [-1, 1, 1],
            [0, 1, 2],
        ],
    },
    {
        name: "edgedetect",
        kernel: [
            [0, 1, 0],
            [1, -4, 1],
            [0, 1, 0],
        ],
    },
    {
        name: "edgeenhance",
        kernel: [
            [0, 0, 0],
            [-1, 1, 0],
            [0, 0, 0],
        ],
    },
    {
        name: "blur",
        kernel: [
            [0.0625, 0.125, 0.0625],
            [0.125, 0.25, 0.125],
            [0.0625, 0.125, 0.0625],
        ],
    },
    {
        name: "sharpen",
        kernel: [
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0],
        ],
    },
];
class Picture {
    constructor(imageUrl, useRawImage) {
        this._em = null;
        this._oi = null;
        this.imageUrl = imageUrl;
        this.useRawImage = useRawImage;
        this.init();
    }
    init() {
        this.createEdgeMatrix();
    }
    waitForInit() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([this.edgeMatrix, this.originalImage]);
        });
    }
    get edgeMatrix() {
        return this.getAsyncEdgeMatrix().catch(() => null);
    }
    get originalImage() {
        return this.getAsyncOriginalImage().catch(() => null);
    }
    createEdgeMatrix() {
        const jimp = jimp_1.default.read(this.imageUrl);
        jimp.then((image) => {
            this._oi = new JimpImage_1.default(image.clone());
            if (!this.useRawImage) {
                image.greyscale();
                image.contrast(1);
                for (let kernel of KERNELS) {
                    image.convolute(kernel.kernel);
                }
            }
            this._em = new JimpImage_1.default(image);
        });
    }
    getAsyncOriginalImage(tries = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (tries >= 1000 / 50) {
                    reject("Rejected because of timeout.");
                }
                else if (!this._oi) {
                    resolve(this.getAsyncOriginalImage(++tries));
                }
                else {
                    resolve(this._oi);
                }
            }, 50);
        });
    }
    getAsyncEdgeMatrix(tries = 0) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (tries >= 1000 / 50) {
                    reject("Rejected because of timeout.");
                }
                else if (!this._em) {
                    resolve(this.getAsyncEdgeMatrix(++tries));
                }
                else {
                    resolve(this._em);
                }
            }, 50);
        });
    }
}
exports.default = Picture;
//# sourceMappingURL=Picture.js.map