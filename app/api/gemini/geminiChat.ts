import { genAI } from "./geminiClient";
import {getEnvConfig} from "@/utils/envConfig";

export interface Target {
    age: string;
    gender: string;
    relationship: string;
    other: string;
}

export class Chat {
    private model = genAI.getGenerativeModel({ model: getEnvConfig().model });

    async ask(formData: Target): Promise<string> {
        const prompt = `あなたは人を褒めることに特化したAIアシスタントです。以下の情報を基に、心のこもった自然な褒め言葉を日本語で生成してください。

対象者の情報:
- 年齢: ${formData.age || "不明"}
- 性別: ${formData.gender || "不明"}
- 関係性: ${formData.relationship || "不明"}
- その他の特徴: ${formData.other || "特になし"}

以下の点を考慮して褒め言葉を作成してください:
1. 相手との関係性に適した敬語レベルを使用
2. 具体的で心に響く表現を使用
3. 相手の特徴を活かした個人的な褒め言葉
4. 自然で温かみのある文章
5. 200文字程度で簡潔に

褒め言葉のみを返答し、事実であるかどうかわからないことに関して言及しないでください。`

        const result = await this.model.generateContent(prompt);
        return result.response.text();
    }

    async askWithImage(file: File): Promise<string> {
        const buffer = await file.arrayBuffer()
        const base64 = Buffer.from(buffer).toString("base64")

        const imagePart = {
            inlineData: {
                mimeType: file.type,
                data: base64,
            },
        }

        const prompt = `あなたは人を褒めることに特化したAIアシスタントです。以下の画像に写っている人物の外見や雰囲気をもとに、心のこもった自然な褒め言葉を日本語で生成してください。

以下の点を考慮して褒め言葉を作成してください:
1. 丁寧で温かみのある表現
2. 外見や雰囲気に基づいた具体的な褒め言葉
3. 200文字程度で簡潔に

褒め言葉のみを返答してください。`

        const result = await this.model.generateContent([prompt, imagePart])
        return result.response.text()
    }
}
