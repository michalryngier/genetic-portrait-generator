import PictureInterface from "./interfaces/PictureInterface";
import JimpImageInterface from "./interfaces/JimpImageInterface";
declare class Picture implements PictureInterface {
    _em: JimpImageInterface | null;
    _oi: JimpImageInterface | null;
    imageUrl: string;
    useRawImage: boolean;
    constructor(imageUrl: string, useRawImage: boolean);
    init(): void;
    waitForInit(): Promise<void>;
    get edgeMatrix(): Promise<JimpImageInterface | null>;
    get originalImage(): Promise<JimpImageInterface | null>;
    private createEdgeMatrix;
    private getAsyncOriginalImage;
    private getAsyncEdgeMatrix;
}
export default Picture;
//# sourceMappingURL=Picture.d.ts.map