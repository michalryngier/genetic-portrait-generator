interface SavableInterface {
    saveProgress(): void;

    loadProgress(): void;

    getProgressToSave<T>(): Array<T>;
}

export default SavableInterface;
