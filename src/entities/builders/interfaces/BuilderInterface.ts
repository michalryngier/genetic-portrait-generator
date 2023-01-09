import PopulationConfigType from "../../genetics/types/PopulationConfigType";
import PictureInterface from "../../graphics/interfaces/PictureInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import OutputImageConfigType from "../../graphics/types/OutputImageConfigType";
import {CauldronInterface} from "../../genetics";

interface BuilderInterface {
    picture: PictureInterface | undefined;
    outputImage: JimpImageInterface | undefined;
    cauldron: CauldronInterface | undefined;
    populationConfig: PopulationConfigType | undefined;
    outputImageConfig: OutputImageConfigType | undefined;

    mutationChance: number;

    crossoverChance: number;

    nofMixes: number;

    setOutputImageConfig(outputImageConfig: OutputImageConfigType): void;

    setChances(crossoverChance: number | null, mutationChance: number | null): void;

    setNumberOfMixes(numberOfMixes: number | null): void;

    createPicture(imageUrl: string, useRawImage: boolean): Promise<void>;

    setOutputImage(outputImage: JimpImageInterface): void;

    createOutputImage(): void;

    setPopulationConfig(populationConfig: PopulationConfigType): void;

    createCauldron(): void;

    startCauldron(): void;

    saveImage(path: string): void;

    getBase64Image(): string | Error;

    saveProgress(): void;

    loadProgress(): void;
}

export default BuilderInterface;
