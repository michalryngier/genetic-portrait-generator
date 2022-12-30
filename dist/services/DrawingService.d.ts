import DrawingServiceInterface from "./interfaces/DrawingServiceInterface";
import JimpImageInterface from "../entities/graphics/interfaces/JimpImageInterface";
import AgentInterface from "../entities/genetics/interfaces/AgentInterface";
import OutputImageConfigType from "../entities/graphics/types/OutputImageConfigType";
declare class DrawingService implements DrawingServiceInterface {
    originalImage: JimpImageInterface;
    constructor(originalImage: JimpImageInterface);
    draw(agents: Array<AgentInterface>, image: JimpImageInterface, config: OutputImageConfigType): void;
    private getColor;
}
export default DrawingService;
//# sourceMappingURL=DrawingService.d.ts.map