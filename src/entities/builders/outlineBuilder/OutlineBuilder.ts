import BuilderInterface from "../interfaces/BuilderInterface";
import PictureInterface from "../../graphics/interfaces/PictureInterface";
import OutlineCauldron from "./OutlineCauldron";
import PopulationType from "../../genetics/types/PopulationType";
import OutlinePopulator from "./OutlinePopulator";
import LoggerService from "../../../services/logger/LoggerService";
import OutlineMixer from "./OutlineMixer";
import OutlineEvaluator from "./OutlineEvaluator";
import OutlineMutator from "./OutlineMutator";
import OutlineCrosser from "./OutlineCrosser";
import DrawingService from "../../../services/DrawingService";
import SavingService from "../../../services/SavingService";
import OutlineFitnessFunction from "./OutlineFitnessFunction";
import Picture from "../../graphics/Picture";
import JimpImage from "../../graphics/JimpImage";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import OutputImageConfigType from "../../graphics/types/OutputImageConfigType";

class OutlineBuilder implements BuilderInterface {
  picture: PictureInterface | undefined;
  outputImage: JimpImageInterface | undefined;
  cauldron: OutlineCauldron | undefined;
  populationConfig: PopulationType | undefined;
  outputImageConfig: OutputImageConfigType | undefined;

  crossoverChance: number = 0.8;
  mutationChance: number = 0.001;

  createCauldron(): void {
    if (!this.picture || !this.picture._em) {
      LoggerService.error(
        "Picture has not been initialized yet or picture does not exists."
      );
      return;
    }

    if (!this.populationConfig) {
      LoggerService.error("Population config has not been created yet.");
      return;
    }

    this.cauldron = new OutlineCauldron(
      this.populationConfig,
      new OutlinePopulator(),
      this.picture._em,
      new OutlineMixer(),
      new OutlineEvaluator([{ weight: 1, fn: OutlineFitnessFunction }]),
      new OutlineMutator(),
      new OutlineCrosser(),
      this.mutationChance,
      this.crossoverChance,
      new DrawingService(),
      new SavingService()
    );
  }

  setChances(crossoverChance: number, mutationChance: number) {
    this.crossoverChance = crossoverChance;
    this.mutationChance = mutationChance;
  }

  setPopulationConfig(populationConfig: PopulationType): void {
    this.populationConfig = populationConfig;
  }

  getBase64Image(): string | Error {
    if (!this.cauldron) {
      LoggerService.error("Cauldron has not been initialized yet.");
      return "";
    }
    if (!this.outputImage) {
      LoggerService.error("Output image has not been initialized yet.");
      return "";
    }
    if (!this.outputImageConfig) {
      LoggerService.error("Output image config has not been initialized yet.");
      return "";
    }

    this.cauldron.draw(this.outputImage, this.outputImageConfig);

    return this.outputImage.toBase64();
  }

  saveImage(path: string): void {
    if (!this.cauldron) {
      LoggerService.error("Cauldron has not been initialized yet.");
      return;
    }
    if (!this.outputImage) {
      LoggerService.error("Output image has not been initialized yet.");
      return;
    }
    if (!this.outputImageConfig) {
      LoggerService.error("Output image config has not been initialized yet.");
      return;
    }

    this.cauldron.draw(this.outputImage, this.outputImageConfig);
    this.outputImage.writeImage(path);
  }

  saveProgress(): void {
    if (!this.cauldron) {
      LoggerService.error("Cauldron has not been initialized yet.");
      return;
    }

    this.cauldron.saveProgress();
  }

  loadProgress(): void {
    if (!this.cauldron) {
      LoggerService.error("Cauldron has not been initialized yet.");
      return;
    }

    this.cauldron.loadProgress();
  }

  startCauldron(): void {
    if (!this.cauldron) {
      LoggerService.error("Cauldron has not been initialized yet.");
      return;
    }

    this.cauldron.startMixing();
  }

  createPicture(imageUrl: string, useRawImage: boolean = false): void {
    this.picture = new Picture(imageUrl, useRawImage);
  }

  setOutputImageConfig(outputImageConfig: OutputImageConfigType): void {
    this.outputImageConfig = outputImageConfig;
  }

  createOutputImage(): void {
    if (!this.picture || !this.picture._em) {
      LoggerService.error(
        "Picture has not been initialized yet or picture does not exists."
      );
      return;
    }

    this.outputImage = JimpImage.createFromMatrix(
      this.picture._em,
      this.outputImageConfig?.scale ?? 1
    );
  }

  setOutputImage(outputImage: JimpImageInterface): void {
    this.outputImage = outputImage;
  }
}

export default OutlineBuilder;
