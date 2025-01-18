export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
};

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
