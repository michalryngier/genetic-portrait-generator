"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const NoiseMixer_1 = __importDefault(require("./NoiseMixer"));
const NoiseMutator_1 = __importDefault(require("./NoiseMutator"));
const NoiseCrosser_1 = __importDefault(require("./NoiseCrosser"));
const NoiseCauldron_1 = __importDefault(require("./NoiseCauldron"));
const Picture_1 = __importDefault(require("../../graphics/Picture"));
const NoisePopulator_1 = __importDefault(require("./NoisePopulator"));
const NoiseEvaluator_1 = __importDefault(require("./NoiseEvaluator"));
const JimpImage_1 = __importDefault(require("../../graphics/JimpImage"));
const NoiseFitnessFunction_1 = __importDefault(require("./NoiseFitnessFunction"));
const SavingService_1 = __importDefault(require("../../../services/SavingService"));
const DrawingService_1 = __importDefault(require("../../../services/DrawingService"));
const LoggerService_1 = __importDefault(require("../../../services/logger/LoggerService"));
class NoiseBuilder {
    constructor() {
        this.crossoverChance = 0.8;
        this.mutationChance = 0.0001;
        this.nofMixes = 100;
    }
    createCauldron() {
        if (!this.picture || !this.picture._em || !this.picture._oi) {
            LoggerService_1.default.error("Picture has not been initialized yet or picture does not exists.");
            return;
        }
        if (!this.populationConfig) {
            LoggerService_1.default.error("Population config has not been created yet.");
            return;
        }
        this.cauldron = new NoiseCauldron_1.default(this.populationConfig, new NoisePopulator_1.default(), this.picture._em, new NoiseMixer_1.default(), new NoiseEvaluator_1.default([{ weight: 1, fn: NoiseFitnessFunction_1.default }]), new NoiseMutator_1.default(), new NoiseCrosser_1.default(), this.mutationChance, this.crossoverChance, this.nofMixes, new DrawingService_1.default(this.picture._oi), new SavingService_1.default());
    }
    setChances(crossoverChance, mutationChance) {
        if (crossoverChance !== null) {
            this.crossoverChance = crossoverChance;
        }
        if (mutationChance !== null) {
            this.mutationChance = mutationChance;
        }
    }
    setNumberOfMixes(numberOfMixes) {
        if (numberOfMixes) {
            this.nofMixes = numberOfMixes;
        }
    }
    setPopulationConfig(populationConfig) {
        if (populationConfig.maxPoint.x === 0 && populationConfig.maxPoint.y === 0) {
            if (this.picture && this.picture._oi) {
                populationConfig.maxPoint.x = this.picture._oi.width;
                populationConfig.maxPoint.y = this.picture._oi.height;
            }
            else {
                LoggerService_1.default.error("Population max point is (0, 0)!");
            }
        }
        this.populationConfig = populationConfig;
    }
    getBase64Image() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return "";
        }
        if (!this.outputImage) {
            LoggerService_1.default.error("Output image has not been initialized yet.");
            return "";
        }
        if (!this.outputImageConfig) {
            LoggerService_1.default.error("Output image config has not been initialized yet.");
            return "";
        }
        this.cauldron.draw(this.outputImage, this.outputImageConfig);
        return this.outputImage.toBase64();
    }
    saveImage(path) {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return;
        }
        if (!this.outputImage) {
            LoggerService_1.default.error("Output image has not been initialized yet.");
            return;
        }
        if (!this.outputImageConfig) {
            LoggerService_1.default.error("Output image config has not been initialized yet.");
            return;
        }
        this.cauldron.draw(this.outputImage, this.outputImageConfig);
        this.outputImage.writeImage(path);
    }
    saveProgress() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return false;
        }
        return this.cauldron.saveProgress();
    }
    loadProgress() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return false;
        }
        return this.cauldron.loadProgress();
    }
    startCauldron() {
        if (!this.cauldron) {
            LoggerService_1.default.error("Cauldron has not been initialized yet.");
            return;
        }
        this.cauldron.startMixing();
    }
    createPicture(imageUrl, useRawImage = false) {
        return __awaiter(this, void 0, void 0, function* () {
            this.picture = new Picture_1.default(imageUrl, useRawImage);
            yield this.picture.waitForInit();
        });
    }
    setOutputImageConfig(outputImageConfig) {
        this.outputImageConfig = outputImageConfig;
    }
    createOutputImage() {
        if (!this.picture || !this.picture._em) {
            LoggerService_1.default.error("Picture has not been initialized yet or picture does not exists.");
            return;
        }
        if (!this.outputImageConfig) {
            LoggerService_1.default.error("There is no config for output image provided.");
            return;
        }
        this.outputImage = JimpImage_1.default.createFromMatrix(this.picture._em, this.outputImageConfig);
    }
    setOutputImage(outputImage) {
        this.outputImage = outputImage;
    }
}
exports.default = NoiseBuilder;
//# sourceMappingURL=NoiseBuilder.js.map