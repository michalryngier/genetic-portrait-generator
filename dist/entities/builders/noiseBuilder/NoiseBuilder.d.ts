import NoiseCauldron from "./NoiseCauldron";
import BuilderInterface from "../interfaces/BuilderInterface";
import PictureInterface from "../../graphics/interfaces/PictureInterface";
import PopulationConfigType from "../../genetics/types/PopulationConfigType";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import OutputImageConfigType from "../../graphics/types/OutputImageConfigType";
declare class NoiseBuilder implements BuilderInterface {
    picture: PictureInterface | undefined;
    outputImage: JimpImageInterface | undefined;
    cauldron: NoiseCauldron | undefined;
    populationConfig: PopulationConfigType | undefined;
    outputImageConfig: OutputImageConfigType | undefined;
    crossoverChance: number;
    mutationChance: number;
    nofMixes: number;
    createCauldron(): void;
    setChances(crossoverChance: number | null, mutationChance: number | null): void;
    setNumberOfMixes(numberOfMixes: number | null): void;
    setPopulationConfig(populationConfig: PopulationConfigType): void;
    getBase64Image(): string | Error;
    saveImage(path: string): void;
    saveProgress(): void;
    loadProgress(): void;
    startCauldron(): void;
    createPicture(imageUrl: string, useRawImage?: boolean): Promise<void>;
    setOutputImageConfig(outputImageConfig: OutputImageConfigType): void;
    createOutputImage(): void;
    setOutputImage(outputImage: JimpImageInterface): void;
}
export default NoiseBuilder;
//# sourceMappingURL=NoiseBuilder.d.ts.map