import { ask } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const formData = await req.json();
    const result = await ask(formData);
    return NextResponse.json({ result });
}
