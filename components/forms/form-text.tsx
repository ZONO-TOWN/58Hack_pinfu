"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import {ask, Target} from "@/lib/gemini"

export function TextPraiseForm() {
  const [formData, setFormData] = useState<Target>({
      age: "",
      gender: "",
      relationship: "",
      motivation: "",
      hobby: "",
      distance: "",
      character: "",
      worksornot: "",
      position: "",
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
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      誰かを褒めたいけど語彙力がない？　もう大丈夫
                  </h1>
              </div>

              {/* Main Title */}
              <div className="text-center mb-8">
                  <Image
                      src="/homecharu.png"
                      alt="ほめちゃるロゴ"
                      width={200}
                      height={200}
                      className="mx-auto mb-4"
                  />
                  <p className="text-lg text-gray-600">褒め方がわからないですか？</p>
              </div>

              {/* Form */}
              <Card className="text-center mb-6">
                  {/*text-center mb-6に変えてます */}
                  <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-6">
                          褒めたい人の特徴を入力
                      </h3>

                      <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                      年齢
                                  </label>
                                  <Input
                                      value={formData.age}
                                      onChange={(e) =>
                                          setFormData({ ...formData, age: e.target.value })
                                      }
                                      placeholder="例: 25歳"
                                      className="bg-green-100 border-green-200 focus:border-green-400"
                                  />
                              </div>
                              <div>
                                  <label className="block text-sm font-medium text-gray-700 mb-1">
                                      性別
                                  </label>
                                  <Input
                                      value={formData.gender}
                                      onChange={(e) =>
                                          setFormData({ ...formData, gender: e.target.value })
                                      }
                                      placeholder="例: 男性"
                                      className="bg-green-100 border-green-200 focus:border-green-400"
                                  />
                              </div>
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  あなたとの関係性
                              </label>
                              <Input
                                  value={formData.relationship}
                                  onChange={(e) =>
                                      setFormData({ ...formData, relationship: e.target.value })
                                  }
                                  placeholder="例: 同僚、友人、家族など"
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                              />
                          </div>
                          {/*追加入力欄ここから*/}

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  褒めたい理由
                              </label>
                              <Input
                                  value={formData.motivation}
                                  onChange={(e) =>
                                      setFormData({ ...formData, motivation: e.target.value })
                                  }
                                  placeholder="例: 目に見えて頑張っているからなど"
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  趣味
                              </label>
                              <Input
                                  value={formData.hobby}
                                  onChange={(e) =>
                                      setFormData({ ...formData, hobby: e.target.value })
                                  }
                                  placeholder="例: ゲーム、絵を描くことなど"
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  その人との距離感
                              </label>
                              <Input
                                  value={formData.distance}
                                  onChange={(e) =>
                                      setFormData({ ...formData, distance: e.target.value })
                                  }
                                  placeholder="例: あだ名で呼び合う、軽口をたたきあう仲など"
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  性格
                              </label>
                              <Input
                                  value={formData.character}
                                  onChange={(e) =>
                                      setFormData({ ...formData, character: e.target.value })
                                  }
                                  placeholder="例: やさしい、気難しいなど"
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  得意なこと/苦手なこと
                              </label>
                              <Input
                                  value={formData.worksornot}
                                  onChange={(e) =>
                                      setFormData({ ...formData, worksornot: e.target.value })
                                  }
                                  placeholder="例: 絵を描くことが得意、計算が苦手など"
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                              />
                          </div>

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  職業/学年
                              </label>
                              <Input
                                  value={formData.position}
                                  onChange={(e) =>
                                      setFormData({
                                          ...formData,
                                          position: e.target.value,
                                      })
                                  }
                                  placeholder="例: サラリーマン、中学生など"
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400"
                              />
                          </div>

                          {/*その他欄に例はいらない*/}

                          <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                  その他
                              </label>
                              <Textarea
                                  value={formData.other}
                                  onChange={(e) =>
                                      setFormData({ ...formData, other: e.target.value })
                                  }
                                  className="bg-gray-100 border-gray-200 focus:border-gray-400 min-h-[100px]"
                              />
                          </div>
                          {/*ここまで */}

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
                          <h3 className="text-xl font-semibold text-gray-900 mb-4">
                              生成された褒め言葉
                          </h3>
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
                  </p>
              </div>
          </div>
      </div>
  )
}
