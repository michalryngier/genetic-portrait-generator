"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LoggerService_1 = __importDefault(require("../../services/logger/LoggerService"));
class Cauldron {
    constructor(populationConfig, populator, referenceImage, mixer, evaluator, mutator, crosser, mutationChance, crossoverChance, nofMixes, drawingService, savingService) {
        this.nofMixes = 100;
        this.populationConfig = populationConfig;
        this.populator = populator;
        this.referenceImage = referenceImage;
        this.mixer = mixer;
        this.evaluator = evaluator;
        this.mutator = mutator;
        this.crosser = crosser;
        this.mutationChance = mutationChance;
        this.crossoverChance = crossoverChance;
        this.nofMixes = nofMixes;
        this.drawingService = drawingService;
        this.savingService = savingService;
        this.agents = this.populator.createPopulation(this.populationConfig);
    }
    draw(outputImage, outputImageConfig) {
        if (this.drawingService) {
            this.drawingService.draw(this.agents, outputImage, outputImageConfig);
        }
        else {
            LoggerService_1.default.error("Drawing service is not defined.");
        }
    }
    loadProgress() {
        if (this.savingService) {
            if (this.savingService.load(this)) {
                LoggerService_1.default.error("Saving service is not defined.");
            }
        }
        else {
            LoggerService_1.default.error("Saving service is not defined.");
        }
    }
    saveProgress() {
        if (this.savingService) {
            this.savingService.save(this);
        }
        else {
            LoggerService_1.default.error("Saving service is not defined.");
        }
    }
    getProgressToSave() {
        return this.agents;
    }
    startMixing() {
        if (!this.mutator ||
            !this.crosser ||
            !this.evaluator ||
            !this.referenceImage ||
            !this.mutationChance ||
            !this.crossoverChance) {
            LoggerService_1.default.error("Cauldron is not ready yet. Initialize mutator, crosser, evaluator, referenceImage, mutationChance and crossoverChance");
            return;
        }
        if (this.mixer) {
            this.agents = this.mixer.mix(this.agents, this.mutator, this.crosser, this.evaluator, this.referenceImage, this.mutationChance, this.crossoverChance, this.nofMixes);
        }
        else {
            LoggerService_1.default.error("Mixer is not defined.");
        }
    }
}
exports.default = Cauldron;
//# sourceMappingURL=Cauldron.js.map