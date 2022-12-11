import JimpImageInterface from "../../entities/graphics/interfaces/JimpImageInterface";
import AgentInterface from "../../entities/genetics/interfaces/AgentInterface";
import OutputImageConfigType from "../../entities/graphics/types/OutputImageConfigType";

interface DrawingServiceInterface {
  draw(
    agents: Array<AgentInterface>,
    image: JimpImageInterface,
    config: OutputImageConfigType
  ): void;
}

export default DrawingServiceInterface;
