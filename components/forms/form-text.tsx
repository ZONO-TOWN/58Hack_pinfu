"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {Chat, Target} from "@/app/api/gemini/geminiChat"

async function ask(formData: Target) {
    const chat = new Chat();
    return await chat.ask(formData);
}

export function TextPraiseForm() {
  const [formData, setFormData] = useState<Target>({
      age: "",
      gender: "",
      relationship: "",
      other: ""
  });
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      setResult(await ask(formData) || "褒め言葉を生成できませんでした");
    } catch (error) {
      console.error("Error:", error);
      setResult("エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">誰かを褒めたいけど語彙力がない？　もう大丈夫</h1>
        </div>

        {/* Main Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">ほめちゃる（仮）</h2>
          <p className="text-lg text-gray-600">褒め方がわからないですか？</p>
        </div>

        {/* Form */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">褒めたい人の特徴を入力</h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">年齢</label>
                  <Input
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    placeholder="例: 25歳"
                    className="bg-green-100 border-green-200 focus:border-green-400"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">性別</label>
                  <Input
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    placeholder="例: 男性"
                    className="bg-green-100 border-green-200 focus:border-green-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">あなたとの関係性</label>
                <Input
                  value={formData.relationship}
                  onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                  placeholder="例: 同僚、友人、家族など"
                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">その他、趣味など</label>
                <Textarea
                  value={formData.other}
                  onChange={(e) => setFormData({ ...formData, other: e.target.value })}
                  placeholder="例: 読書が好き、料理が上手、優しい性格など"
                  className="bg-gray-100 border-gray-200 focus:border-gray-400 min-h-[100px]"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                disabled={isLoading}
              >
                {isLoading ? "褒め言葉を生成中..." : "褒め言葉を生成する"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Result */}
        {result && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">生成された褒め言葉</h3>
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <p className="text-gray-800 leading-relaxed">{result}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 leading-relaxed">
          <p>
            ほめちゃる（仮）は人を褒めること、褒め方を学ぶことに特化したAIです。その人の特徴、趣味、自分との関係を入力してください。
            <br />
            いちいちAIに聞く必要がないよう褒め方を学びたい？語彙を増やしたい？もちろん協力します。
          </p>
        </div>
      </div>
    </div>
  )
}
