import AgentInterface from "./interfaces/AgentInterface";
import MixerInterface from "./interfaces/MixerInterface";
import CrosserInterface from "./interfaces/CrosserInterface";
import MutatorInterface from "./interfaces/MutatorInterface";
import LoggerService from "../services/logger/LoggerService";
import CauldronInterface from "./interfaces/CauldronInterface";
import EvaluatorInterface from "./interfaces/EvaluatorInterface";
import PopulationType from "./types/PopulationType";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";
import PopulatorServiceInterface from "./interfaces/PopulatorServiceInterface";
import SavingServiceInterface from "../services/interfaces/SavingServiceInterface";
import DrawingServiceInterface from "../services/interfaces/DrawingServiceInterface";
import SavableInterface from "../services/interfaces/SavableInterface";

class Cauldron implements CauldronInterface, SavableInterface {
    populationConfig: PopulationType | undefined;
    populatorService: PopulatorServiceInterface | undefined;
    referenceImage: JimpImageInterface | undefined;
    mixer: MixerInterface | undefined;
    evaluator: EvaluatorInterface | undefined;
    mutator: MutatorInterface | undefined;
    crosser: CrosserInterface | undefined;
    mutationChance: number | undefined;
    crossoverChance: number | undefined;
    drawingService: DrawingServiceInterface | undefined;
    savingService: SavingServiceInterface | undefined;
    agents: Array<AgentInterface>;

    constructor(
        populationConfig: PopulationType,
        populatorService: PopulatorServiceInterface,
        referenceImage: JimpImageInterface,
        mixer: MixerInterface,
        evaluator: EvaluatorInterface,
        mutator: MutatorInterface,
        crosser: CrosserInterface,
        mutationChance: number,
        crossoverChance: number,
        drawingService: DrawingServiceInterface,
        savingService: SavingServiceInterface
    ) {
        this.populationConfig = populationConfig;
        this.populatorService = populatorService
        this.referenceImage = referenceImage;
        this.mixer = mixer;
        this.evaluator = evaluator;
        this.mutator = mutator;
        this.crosser = crosser;
        this.mutationChance = mutationChance;
        this.crossoverChance = crossoverChance;
        this.drawingService = drawingService;
        this.savingService = savingService;
        this.agents = this.populatorService.createPopulation(this.populationConfig);
    }

    draw(outputImage: JimpImageInterface): void {
        if (this.drawingService) {
            this.drawingService.agents = this.agents;
            this.drawingService.image = outputImage;
            this.drawingService.draw();
        } else {
            LoggerService.error('Drawing service is not defined.')
        }
    }

    loadProgress(): void {
        if (this.savingService) {
            if (this.savingService.load(this)) {
                LoggerService.error('Saving service is not defined.')
            }
        } else {
            LoggerService.error('Saving service is not defined.')
        }
    }

    saveProgress(): void {
        if (this.savingService) {
            this.savingService.save(this);
        } else {
            LoggerService.error('Saving service is not defined.')
        }
    }

    getProgressToSave<AgentInterface>(): Array<AgentInterface> {
        return <Array<AgentInterface>>this.agents;
    }

    startMixing(): void {
        if (this.mixer) {
            this.mixer.mix(
                this.agents,
                this.mutator,
                this.crosser,
                this.evaluator,
                this.referenceImage,
                this.mutationChance,
                this.crossoverChance
            );
        } else {
            LoggerService.error('Mixer is not defined.')
        }
    }
}

export default Cauldron;