import OutlineCauldron from "../outlineBuilder/OutlineCauldron";
import PopulationType from "../../genetics/types/PopulationType";
import PictureInterface from "../../graphics/interfaces/PictureInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import OutputImageConfigType from "../../graphics/types/OutputImageConfigType";

interface BuilderInterface {
    picture: PictureInterface | undefined;
    outputImage: JimpImageInterface | undefined;
    cauldron: OutlineCauldron | undefined;
    populationConfig: PopulationType | undefined;
    outputImageConfig: OutputImageConfigType | undefined;

    mutationChance: number;

    crossoverChance: number;

    nofMixes: number;

    setOutputImageConfig(outputImageConfig: OutputImageConfigType): void;

    setChances(crossoverChance: number, mutationChance: number): void;

    setNumberOfMixes(numberOfMixes: number): void;

    createPicture(imageUrl: string, useRawImage: boolean): void;

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
