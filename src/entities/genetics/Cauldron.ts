import AgentInterface from "./interfaces/AgentInterface";
import MixerInterface from "./interfaces/MixerInterface";
import CrosserInterface from "./interfaces/CrosserInterface";
import MutatorInterface from "./interfaces/MutatorInterface";
import LoggerService from "../../services/logger/LoggerService";
import CauldronInterface from "./interfaces/CauldronInterface";
import EvaluatorInterface from "./interfaces/EvaluatorInterface";
import PopulationConfigType from "./types/PopulationConfigType";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";
import PopulatorInterface from "./interfaces/PopulatorInterface";
import SavingServiceInterface from "../../services/interfaces/SavingServiceInterface";
import DrawingServiceInterface from "../../services/interfaces/DrawingServiceInterface";
import SavableInterface from "../../services/interfaces/SavableInterface";
import OutputImageConfigType from "../graphics/types/OutputImageConfigType";

class Cauldron implements CauldronInterface, SavableInterface {
    populationConfig: PopulationConfigType | undefined;
    populator: PopulatorInterface | undefined;
    referenceImage: JimpImageInterface | undefined;
    mixer: MixerInterface | undefined;
    evaluator: EvaluatorInterface | undefined;
    mutator: MutatorInterface | undefined;
    crosser: CrosserInterface | undefined;
    mutationChance: number | undefined;
    crossoverChance: number | undefined;

    nofMixes: number = 100;
    drawingService: DrawingServiceInterface | undefined;
    savingService: SavingServiceInterface | undefined;
    agents: Array<AgentInterface>;

    constructor(
        populationConfig: PopulationConfigType,
        populator: PopulatorInterface,
        referenceImage: JimpImageInterface,
        mixer: MixerInterface,
        evaluator: EvaluatorInterface,
        mutator: MutatorInterface,
        crosser: CrosserInterface,
        mutationChance: number,
        crossoverChance: number,
        nofMixes: number,
        drawingService: DrawingServiceInterface,
        savingService: SavingServiceInterface
    ) {
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

    draw(
        outputImage: JimpImageInterface,
        outputImageConfig: OutputImageConfigType
    ): void {
        if (this.drawingService) {
            this.drawingService.draw(this.agents, outputImage, outputImageConfig);
        } else {
            LoggerService.error("Drawing service is not defined.");
        }
    }

    loadProgress(): void {
        if (this.savingService) {
            if (this.savingService.load(this)) {
                LoggerService.error("Saving service is not defined.");
            }
        } else {
            LoggerService.error("Saving service is not defined.");
        }
    }

    saveProgress(): void {
        if (this.savingService) {
            this.savingService.save(this);
        } else {
            LoggerService.error("Saving service is not defined.");
        }
    }

    getProgressToSave<AgentInterface>(): Array<AgentInterface> {
        return <Array<AgentInterface>>this.agents;
    }

    startMixing(): void {
        if (
            !this.mutator ||
            !this.crosser ||
            !this.evaluator ||
            !this.referenceImage ||
            !this.mutationChance ||
            !this.crossoverChance
        ) {
            LoggerService.error(
                "Cauldron is not ready yet. Initialize mutator, crosser, evaluator, referenceImage, mutationChance and crossoverChance"
            );
            return;
        }

        if (this.mixer) {
            this.mixer.mix(
                this.agents,
                this.mutator,
                this.crosser,
                this.evaluator,
                this.referenceImage,
                this.mutationChance,
                this.crossoverChance,
                this.nofMixes
            );
        } else {
            LoggerService.error("Mixer is not defined.");
        }
    }
}

export default Cauldron;
