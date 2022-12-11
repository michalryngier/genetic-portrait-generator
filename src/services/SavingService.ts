import SavingServiceInterface from "./interfaces/SavingServiceInterface";
import SavableInterface from "./interfaces/SavableInterface";

class SavingService implements SavingServiceInterface {
    load(object: SavableInterface): boolean {
        return true;
    }

    save(object: SavableInterface): boolean {
        return true;
    }
}

export default SavingService;
