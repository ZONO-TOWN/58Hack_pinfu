import { GoogleGenerativeAI } from "@google/generative-ai";
import {getEnvConfig} from "@/utils/envConfig";

export const genAI = new GoogleGenerativeAI(getEnvConfig().geminiApiKey);
