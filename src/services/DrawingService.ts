import DrawingServiceInterface from "./interfaces/DrawingServiceInterface";
import JimpImageInterface from "../entities/graphics/interfaces/JimpImageInterface";
import AgentInterface from "../entities/genetics/interfaces/AgentInterface";
import OutputImageConfigType from "../entities/graphics/types/OutputImageConfigType";
import ColorHelper from "../helpers/ColorHelper";

class DrawingService implements DrawingServiceInterface {
    draw(
        agents: Array<AgentInterface>,
        image: JimpImageInterface,
        config: OutputImageConfigType
    ): void {
        agents.forEach((agent: AgentInterface) => {
            image.drawBezier(
                agent.getUpdatedBezierCurve(),
                config.scale,
                this.getColor(config?.color ?? null),
                config?.lerpColor ?? false
            );
        });
    }

    private getColor(color: string | null) {
        if (color) {
            return ColorHelper.getColorFromHex(color);
        }

        return ColorHelper.white;
    }
}

export default DrawingService;
