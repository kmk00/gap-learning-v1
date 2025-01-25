import { create } from "zustand";

export type Answer = {
    readonly index: number;
    readonly answerWord: string;
    selected: boolean;
    answerNumber: number | null;
};

export enum TextGapSteps {
    PREPARE_TEXT = 1,
    SELECT_WORDS = 2,
    SAVE_EXERCISE = 3,
}

type ExerciseStore = {
    exerciseTextArray: Answer[];
    setExerciseTextArray: (text: Answer[]) => void;
    step: TextGapSteps;
    setStep: (step: TextGapSteps) => void;
    answerNumberToRemove: number | null;
    setAnswerNumberToRemove: (answerNumber: number | null) => void;
};

export const useExerciseStore = create<ExerciseStore>((set) => ({
    step: TextGapSteps.PREPARE_TEXT,
    setStep: (step) => set(() => ({ step })),
    exerciseTextArray: [],
    setExerciseTextArray: (text) => set(() => ({ exerciseTextArray: text })),
    answerNumberToRemove: null,
    setAnswerNumberToRemove: (answerNumber) =>
        set(() => ({ answerNumberToRemove: answerNumber })),
}));
