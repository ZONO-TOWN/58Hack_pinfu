import { genAI } from "./geminiClient";

export class Chat {
    private chatSession: ReturnType<typeof this.model.startChat>;
    private model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    constructor() {
        this.chatSession = this.model.startChat();
    }

    async ask(userMessage: string): Promise<string> {
        const result = await this.chatSession.sendMessage(userMessage);
        return result.response.text();
    }

    resetSession() {
        this.chatSession = this.model.startChat();
    }
}
