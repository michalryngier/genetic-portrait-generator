import AgentInterface from "./interfaces/AgentInterface";
import MixerInterface from "./interfaces/MixerInterface";
import CrosserInterface from "./interfaces/CrosserInterface";
import MutatorInterface from "./interfaces/MutatorInterface";
import CauldronInterface from "./interfaces/CauldronInterface";
import EvaluatorInterface from "./interfaces/EvaluatorInterface";
import PopulationConfigType from "./types/PopulationConfigType";
import JimpImageInterface from "../graphics/interfaces/JimpImageInterface";
import PopulatorInterface from "./interfaces/PopulatorInterface";
import SavingServiceInterface from "../../services/interfaces/SavingServiceInterface";
import DrawingServiceInterface from "../../services/interfaces/DrawingServiceInterface";
import SavableInterface from "../../services/interfaces/SavableInterface";
import OutputImageConfigType from "../graphics/types/OutputImageConfigType";
declare class Cauldron implements CauldronInterface, SavableInterface {
    populationConfig: PopulationConfigType | undefined;
    populator: PopulatorInterface | undefined;
    referenceImage: JimpImageInterface | undefined;
    mixer: MixerInterface | undefined;
    evaluator: EvaluatorInterface | undefined;
    mutator: MutatorInterface | undefined;
    crosser: CrosserInterface | undefined;
    mutationChance: number | undefined;
    crossoverChance: number | undefined;
    nofMixes: number;
    drawingService: DrawingServiceInterface | undefined;
    savingService: SavingServiceInterface | undefined;
    agents: Array<AgentInterface>;
    constructor(populationConfig: PopulationConfigType, populator: PopulatorInterface, referenceImage: JimpImageInterface, mixer: MixerInterface, evaluator: EvaluatorInterface, mutator: MutatorInterface, crosser: CrosserInterface, mutationChance: number, crossoverChance: number, nofMixes: number, drawingService: DrawingServiceInterface, savingService: SavingServiceInterface);
    draw(outputImage: JimpImageInterface, outputImageConfig: OutputImageConfigType): void;
    loadProgress(): void;
    saveProgress(): void;
    getProgressToSave<AgentInterface>(): Array<AgentInterface>;
    startMixing(): void;
}
export default Cauldron;
//# sourceMappingURL=Cauldron.d.ts.map