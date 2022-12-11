import AgentInterface from "./AgentInterface";
import MixerInterface from "./MixerInterface";
import MutatorInterface from "./MutatorInterface";
import CrosserInterface from "./CrosserInterface";
import EvaluatorInterface from "./EvaluatorInterface";
import PopulationInterface from "./PopulationInterface";
import PopulatorServiceInterface from "./PopulatorServiceInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import SavingServiceInterface from "../../services/interfaces/SavingServiceInterface";
import DrawingServiceInterface from "../../services/interfaces/DrawingServiceInterface";

interface CauldronInterface {
    agents: Array<AgentInterface>;
    mutator: MutatorInterface | undefined;
    crosser: CrosserInterface | undefined;
    evaluator: EvaluatorInterface | undefined;
    mixer: MixerInterface | undefined;
    referenceImage: JimpImageInterface | undefined;
    populationConfig: PopulationInterface | undefined;
    populatorService: PopulatorServiceInterface | undefined;
    savingService: SavingServiceInterface | undefined;
    drawingService: DrawingServiceInterface | undefined;
    mutationChance: number | undefined;
    crossoverChance: number | undefined;

    startMixing(): void;

    draw(outputImage: JimpImageInterface): void;
}

export default CauldronInterface;