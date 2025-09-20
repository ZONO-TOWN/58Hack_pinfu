"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useDropzone } from "react-dropzone"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { askWithImage } from "@/lib/gemini"
import Image from "next/image";

export function ImagePraiseForm() {
    const [imageFiles, setImageFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [result, setResult] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const onDrop = (acceptedFiles: File[]) => {
        setImageFiles((prev) => [...prev, ...acceptedFiles])
        setResult("")
    }

    useEffect(() => {
        const urls = imageFiles.map((file) => URL.createObjectURL(file))
        setPreviewUrls(urls)
        return () => urls.forEach((url) => URL.revokeObjectURL(url))
    }, [imageFiles])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (imageFiles.length === 0) return

        setIsLoading(true)
        try {
            setResult(await askWithImage(imageFiles))
        } catch (error) {
            console.error("Error:", error)
            setResult("エラーが発生しました")
        } finally {
            setIsLoading(false)
        }
    }

    const handleReset = () => {
        setImageFiles([])
        setPreviewUrls([])
        setResult("")
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [] },
        multiple: true,
    })

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-2xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">写真から褒め言葉を生成？　おまかせください</h1>
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
                                    ここに画像をドラッグ＆ドロップ、またはクリックして選択（複数枚OK）
                                </p>
                                {imageFiles.length > 0 && (
                                    <p className="mt-2 text-sm text-green-600">
                                        現在の画像: {imageFiles.length}枚
                                    </p>
                                )}
                            </div>

                            {/* Image Previews */}
                            {previewUrls.length > 0 && (
                                <div className="mt-4 max-h-[400px] overflow-y-auto border border-gray-200 rounded-lg p-2">
                                    <div className="flex flex-col gap-y-4">
                                        {previewUrls.map((url, idx) => (
                                            <img
                                                key={idx}
                                                src={url}
                                                alt={`プレビュー ${idx + 1}`}
                                                className="w-full max-w-sm mx-auto rounded shadow"
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-4 mt-4">
                                <Button
                                    type="submit"
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 text-lg"
                                    disabled={isLoading || imageFiles.length === 0}
                                >
                                    {isLoading ? "褒め言葉を生成中..." : "褒め言葉を生成する"}
                                </Button>
                                <Button
                                    type="button"
                                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 text-lg"
                                    onClick={handleReset}
                                    disabled={isLoading}
                                >
                                    画像をリセット
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>

                {/* Result */}
                {result && (
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-xl font-semibold text-gray-900 mb-4">生成された褒め言葉</h3>
                            <div className="bg-green-50 p-4 rounded-lg border border-green-200 whitespace-pre-line">
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