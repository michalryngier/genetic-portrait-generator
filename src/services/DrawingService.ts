import DrawingServiceInterface from "./interfaces/DrawingServiceInterface";
import JimpImageInterface from "../entities/graphics/interfaces/JimpImageInterface";
import AgentInterface from "../entities/genetics/interfaces/AgentInterface";
import OutputImageConfigType from "../entities/graphics/types/OutputImageConfigType";
import ColorHelper from "../helpers/ColorHelper";

class DrawingService implements DrawingServiceInterface {

    originalImage: JimpImageInterface;

    constructor(originalImage: JimpImageInterface) {
        this.originalImage = originalImage;
    }
    draw(
        agents: Array<AgentInterface>,
        image: JimpImageInterface,
        config: OutputImageConfigType
    ): void {
        agents.forEach((agent: AgentInterface) => {
            if (agent.fitnessScore > 0.1) {
                image.drawBezier(
                    agent.getUpdatedBezierCurve(),
                    this.originalImage,
                    this.getColor(config?.color ?? null),
                    config?.lerpColor ?? false,
                );
            }
        });
    }

    private getColor(color: string | null) : number | null {
        if (color) {
            return ColorHelper.getColorFromHex(color);
        }

        return null;
    }
}

export default DrawingService;
