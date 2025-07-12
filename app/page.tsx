"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Download, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

const animals = [
  { value: "cat", label: "Cat" },
  { value: "dog", label: "Dog" },
  { value: "rabbit", label: "Rabbit" },
  { value: "bear", label: "Bear" },
  { value: "lion", label: "Lion" },
  { value: "tiger", label: "Tiger" },
  { value: "elephant", label: "Elephant" },
  { value: "panda", label: "Panda" },
  { value: "fox", label: "Fox" },
  { value: "wolf", label: "Wolf" },
];

interface GeneratedImage {
  id: string;
  url: string;
  phrase: string;
  animal: string;
  timestamp: Date;
}

export default function Home() {
  const [phrase, setPhrase] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);

  const handleGenerate = async () => {
    if (!phrase.trim() || !selectedAnimal) {
      toast.error("Please enter a phrase and select an animal.");
      return;
    }

    setIsGenerating(true);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phrase: phrase.trim(),
          animal: selectedAnimal,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate image");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImage(data.imageUrl);

      // Add to history
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: data.imageUrl,
        phrase: phrase.trim(),
        animal: selectedAnimal,
        timestamp: new Date(),
      };
      setHistory((prev) => [newImage, ...prev.slice(0, 9)]); // Keep last 10 images

      toast.success("Your image has been generated successfully.");
    } catch (error) {
      toast.error("Error generating image:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to generate image. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadImage = async (url: string, filename: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      toast.error("Failed to download the image.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            Animal T-Shirt Generator
          </h1>
          <p className="text-gray-600">
            Create AI-generated images of animals wearing custom t-shirts
          </p>
        </div>

        {/* Main Form */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Generate Your Image</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="phrase"
                  className="text-sm font-medium text-gray-700"
                >
                  T-Shirt Slogan
                </label>
                <Input
                  id="phrase"
                  placeholder="Enter your phrase (e.g., YOLO, Hello World)"
                  value={phrase}
                  onChange={(e) => setPhrase(e.target.value)}
                  maxLength={50}
                  className="w-full"
                />
                <p className="text-xs text-gray-500">
                  {phrase.length}/50 characters
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="animal"
                  className="text-sm font-medium text-gray-700"
                >
                  Select Animal
                </label>
                <Select
                  value={selectedAnimal}
                  onValueChange={setSelectedAnimal}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose an animal" />
                  </SelectTrigger>
                  <SelectContent>
                    {animals.map((animal) => (
                      <SelectItem key={animal.value} value={animal.value}>
                        {animal.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !phrase.trim() || !selectedAnimal}
              className="w-full md:w-auto"
              size="lg"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Image"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Image */}
        {generatedImage && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Generated Image</CardTitle>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  downloadImage(
                    generatedImage,
                    `${selectedAnimal}-${phrase.replace(/\s+/g, "-")}.png`
                  )
                }
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardHeader>
            <CardContent>
              <div className="relative w-full max-w-md mx-auto">
                <Image
                  src={generatedImage || "/placeholder.svg"}
                  alt={`${selectedAnimal} wearing t-shirt with "${phrase}"`}
                  width={512}
                  height={512}
                  className="w-full h-auto rounded-lg shadow-lg"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        )}

        {/* History */}
        {history.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <RefreshCw className="h-5 w-5" />
                Recent Generations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {history.map((item) => (
                  <div key={item.id} className="space-y-2">
                    <div className="relative aspect-square">
                      <Image
                        src={item.url || "/placeholder.svg"}
                        alt={`${item.animal} with "${item.phrase}"`}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setGeneratedImage(item.url)}
                      />
                    </div>
                    <div className="text-xs text-center">
                      <p className="font-medium truncate">{item.phrase}</p>
                      <p className="text-gray-500 capitalize">{item.animal}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
