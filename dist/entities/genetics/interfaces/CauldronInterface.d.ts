import AgentInterface from "./AgentInterface";
import MixerInterface from "./MixerInterface";
import MutatorInterface from "./MutatorInterface";
import CrosserInterface from "./CrosserInterface";
import EvaluatorInterface from "./EvaluatorInterface";
import PopulationConfigType from "../types/PopulationConfigType";
import PopulatorInterface from "./PopulatorInterface";
import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import SavingServiceInterface from "../../../services/interfaces/SavingServiceInterface";
import DrawingServiceInterface from "../../../services/interfaces/DrawingServiceInterface";
import OutputImageConfigType from "../../graphics/types/OutputImageConfigType";
interface CauldronInterface {
    agents: Array<AgentInterface>;
    mutator: MutatorInterface | undefined;
    crosser: CrosserInterface | undefined;
    evaluator: EvaluatorInterface | undefined;
    mixer: MixerInterface | undefined;
    referenceImage: JimpImageInterface | undefined;
    populationConfig: PopulationConfigType | undefined;
    populator: PopulatorInterface | undefined;
    savingService: SavingServiceInterface | undefined;
    drawingService: DrawingServiceInterface | undefined;
    mutationChance: number | undefined;
    crossoverChance: number | undefined;
    nofMixes: number;
    startMixing(): void;
    draw(outputImage: JimpImageInterface, outputImageConfig: OutputImageConfigType): void;
}
export default CauldronInterface;
//# sourceMappingURL=CauldronInterface.d.ts.map