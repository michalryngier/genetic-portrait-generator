import JimpImageInterface from "./JimpImageInterface";

interface PictureInterface {
    _oi: JimpImageInterface | null;
    _em: JimpImageInterface | null;
    _bi: JimpImageInterface | null;
    imageUrl: string;

    useRawImage: boolean;

    init(): void;

    get binaryImage(): Promise<JimpImageInterface | null>;

    get edgeMatrix(): Promise<JimpImageInterface | null>;

    get originalImage(): Promise<JimpImageInterface | null>;
}

export default PictureInterface;
