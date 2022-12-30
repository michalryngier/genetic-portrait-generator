import NoiseCauldron from "../noiseBuilder/NoiseCauldron";
import PopulationType from "../../genetics/types/PopulationType";
import PictureInterface from "../../graphics/interfaces/PictureInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import OutputImageConfigType from "../../graphics/types/OutputImageConfigType";

interface BuilderInterface {
    picture: PictureInterface | undefined;
    outputImage: JimpImageInterface | undefined;
    cauldron: NoiseCauldron | undefined;
    populationConfig: PopulationType | undefined;
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

    setPopulationConfig(populationConfig: PopulationType): void;

    createCauldron(): void;

    startCauldron(): void;

    saveImage(path: string): void;

    getBase64Image(): string | Error;

    saveProgress(): void;

    loadProgress(): void;
}

export default BuilderInterface;
