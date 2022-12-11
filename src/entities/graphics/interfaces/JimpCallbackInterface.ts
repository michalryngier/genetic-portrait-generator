import Jimp from "jimp";

interface JimpCallbackInterface {
    (x: any, y: any): void;

    (this: Jimp, x: number, y: number, idx: number): any;
}

export default JimpCallbackInterface;