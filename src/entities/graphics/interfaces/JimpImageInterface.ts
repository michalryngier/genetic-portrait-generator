import Jimp from "jimp";
import PointInterface from "./PointInterface";

interface JimpImageInterface {
    width: number;
    height: number;
    scale: number;

    get image(): Jimp

    writeImage(fileName: string): Jimp | Error

    toBase64(): string | Error

    getColorOnPosition(point: PointInterface, threshold: number | null): number
}

export default JimpImageInterface;