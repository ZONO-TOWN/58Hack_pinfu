export type AppConfig = {
    geminiApiKey: string;
    model: string;
};

export function getEnvConfig(): AppConfig {
    const geminiApiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    const model = process.env.NEXT_PUBLIC_GEMINI_MODEL;

    if (!geminiApiKey || !model) {
        throw new Error("環境変数が正しく設定されていません");
    }

    return { geminiApiKey, model };
}
