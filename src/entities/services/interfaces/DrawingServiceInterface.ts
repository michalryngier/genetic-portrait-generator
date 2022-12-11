import JimpImageInterface from "../../graphics/interfaces/JimpImageInterface";
import AgentInterface from "../../genetics/interfaces/AgentInterface";

interface DrawingServiceInterface {
    image: JimpImageInterface;
    agents: Array<AgentInterface>;

    draw(): void;
}

export default DrawingServiceInterface;