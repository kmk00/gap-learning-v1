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
