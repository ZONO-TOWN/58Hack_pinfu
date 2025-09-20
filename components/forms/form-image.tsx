"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Chat } from "@/app/api/gemini/geminiChat"

async function askWithImage(file: File) {
    const chat = new Chat()
    return await chat.askWithImage(file)
}

export function ImagePraiseForm() {
    const [imageFile, setImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string | null>(null)
    const [result, setResult] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onDrop = (acceptedFiles: File[]) => {
        const file = acceptedFiles[0]
        setImageFile(file)
        setResult("")
    }

    useEffect(() => {
        if (imageFile) {
            const url = URL.createObjectURL(imageFile)
            setPreviewUrl(url)
            return () => URL.revokeObjectURL(url)
        }
    }, [imageFile])

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: false,
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!imageFile) return

        setIsLoading(true)
        try {
            const compliment = await askWithImage(imageFile)
            setResult(compliment || "褒め言葉を生成できませんでした")
        } catch (error) {
            console.error("Error:", error)
            setResult("エラーが発生しました")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">写真から褒め言葉を生成？　おまかせください</h1>
                </div>

                {/* Main Title */}
                <div className="text-center mb-8">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4">ほめちゃる（画像版）</h2>
                    <p className="text-lg text-gray-600">画像に写った人物に対して、心のこもった褒め言葉を生成します</p>
                </div>

                {/* Form */}
                <Card className="mb-6">
                    <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-6">画像をアップロードしてください</h3>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div
                                {...getRootProps()}
                                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer ${
                                    isDragActive ? "border-green-400 bg-green-50" : "border-gray-300 bg-white"
                                }`}
                            >
                                <input {...getInputProps()} />
                                <p className="text-gray-700">
                                    ここに画像をドラッグ＆ドロップ、またはクリックして選択
                                </p>
                                {imageFile && (
                                    <p className="mt-2 text-sm text-green-600">選択された画像: {imageFile.name}</p>
                                )}
                            </div>

                            {/* Image Preview */}
                            {previewUrl && (
                                <div className="mt-4 text-center">
                                    <img
                                        src={previewUrl}
                                        alt="プレビュー"
                                        className="max-w-full max-h-[300px] mx-auto rounded shadow"
                                    />
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                                disabled={isLoading || !imageFile}
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
                        ほめちゃる（画像版）は、写真に写った人物の雰囲気や特徴をもとに、自然で温かみのある褒め言葉を生成します。
                        <br />
                        顔がはっきり写っている画像を使うと、より具体的な褒め言葉になります。
                    </p>
                </div>
            </div>
        </div>
    )
}