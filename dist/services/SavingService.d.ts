import SavingServiceInterface from "./interfaces/SavingServiceInterface";
import SavableInterface from "./interfaces/SavableInterface";
declare class SavingService implements SavingServiceInterface {
    load(object: SavableInterface): boolean;
    save(object: SavableInterface): boolean;
}
export default SavingService;
//# sourceMappingURL=SavingService.d.ts.map