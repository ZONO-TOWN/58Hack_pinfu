// import * as fs from "fs";
// import * as path from "path";
//
// const configPath = path.resolve(__dirname, "../config.json");
//
// const defaultConfig = {
//     geminiApiKey: "YOUR_GOOGLE_GEMINI_API_KEY",
//     model: "gemini-1.5-pro"
// };
//
// if (!fs.existsSync(configPath)) {
//     fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), "utf-8");
//     console.log("✅ config.json を新規作成しました。APIキーを設定してください。");
// } else {
//     console.log("✅ config.json が存在することを確認しました。");
// }
//
// export const config = JSON.parse(fs.readFileSync(configPath, "utf-8")) as {
//     geminiApiKey: string;
//     model: string;
// };
