import SavableInterface from "./SavableInterface";

interface SavingServiceInterface {
    save(object: SavableInterface): boolean;

    load(object: SavableInterface): boolean;
}

export default SavingServiceInterface;
