import Jimp from "jimp";
import PictureInterface from "./interfaces/PictureInterface";
import JimpImageInterface from "./interfaces/JimpImageInterface";
import JimpImage from "./JimpImage";

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

class Picture implements PictureInterface {
    _bi: JimpImageInterface | null = null;
    _em: JimpImageInterface | null = null;
    _oi: JimpImageInterface | null = null;
    imageUrl: string;
    useRawImage: boolean;

    constructor(imageUrl: string, useRawImage: boolean) {
        this.imageUrl = imageUrl;
        this.useRawImage = useRawImage;

        this.init();
    }

    init(): void {
        this.createEdgeMatrix();
        this.createBinary();
    }

    get binaryImage(): Promise<JimpImageInterface | null> {
        return this.getAsyncBinaryImage().catch(() => null);
    }

    get edgeMatrix(): Promise<JimpImageInterface | null> {
        return this.getAsyncEdgeMatrix().catch(() => null);
    }

    get originalImage(): Promise<JimpImageInterface | null> {
        return this.getAsyncOriginalImage().catch(() => null);
    }

    private createEdgeMatrix() {
        const jimp = Jimp.read(this.imageUrl);

        jimp.then((image) => {
            this._oi = new JimpImage(image);
            if (!this.useRawImage) {
                image.greyscale();
                image.contrast(1);
                for (let kernel of KERNELS) {
                    image.convolute(kernel.kernel);
                }
            }
            this._em = new JimpImage(image);
        });
    }

    private createBinary() {
        const jimp = Jimp.read(this.imageUrl);

        jimp.then((image) => {
            if (!this.useRawImage) {
                image.greyscale();
                image.contrast(1);
            }
            this._bi = new JimpImage(image);
        });
    }

    private getAsyncOriginalImage(
        tries: number = 0
    ): Promise<JimpImageInterface> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (tries >= 1000 / 50) {
                    reject("Rejected because of timeout.");
                } else if (!this._oi) {
                    resolve(this.getAsyncOriginalImage(++tries));
                } else {
                    resolve(this._oi);
                }
            }, 50);
        });
    }

    private getAsyncEdgeMatrix(tries: number = 0): Promise<JimpImageInterface> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (tries >= 1000 / 50) {
                    reject("Rejected because of timeout.");
                } else if (!this._em) {
                    resolve(this.getAsyncEdgeMatrix(++tries));
                } else {
                    resolve(this._em);
                }
            }, 50);
        });
    }

    private getAsyncBinaryImage(tries: number = 0): Promise<JimpImageInterface> {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (tries >= 1000 / 50) {
                    reject("Rejected because of timeout.");
                } else if (!this._bi) {
                    resolve(this.getAsyncBinaryImage(++tries));
                } else {
                    resolve(this._bi);
                }
            }, 50);
        });
    }
}

export default Picture;
