interface SavableInterface {
    saveProgress(): boolean;

    loadProgress(): boolean;

    getProgressToSave<T>(): Array<T>;
}

export default SavableInterface;
