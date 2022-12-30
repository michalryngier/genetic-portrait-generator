import JimpImageInterface from "./JimpImageInterface";
interface PictureInterface {
    _oi: JimpImageInterface | null;
    _em: JimpImageInterface | null;
    imageUrl: string;
    useRawImage: boolean;
    init(): void;
    waitForInit(): Promise<void>;
    get edgeMatrix(): Promise<JimpImageInterface | null>;
    get originalImage(): Promise<JimpImageInterface | null>;
}
export default PictureInterface;
//# sourceMappingURL=PictureInterface.d.ts.map