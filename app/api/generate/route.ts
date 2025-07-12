import { type NextRequest, NextResponse } from "next/server";
import Replicate from "replicate";

export async function POST(request: NextRequest) {
  try {
    const { phrase, animal } = await request.json();

    if (!phrase || !animal) {
      return NextResponse.json(
        { error: "Phrase and animal are required" },
        { status: 400 }
      );
    }

    const model =
      "prunaai/hidream-l1-fast:91752cc0b07ccd5976f1db2b6b7f10296ac12d6cb2ba87056f79b17ffacca5f5";
    const prompt = `A high-quality, professional photograph of a cute ${animal} wearing a clean white t-shirt. The t-shirt has the text "${phrase}" printed clearly and prominently on the front in bold, readable letters. The ${animal} is sitting upright, facing the camera, with good lighting and a neutral background. The text on the shirt should be perfectly legible and well-centered. Photorealistic, studio lighting, high resolution.`;

    const replicate = new Replicate({
      auth: process.env.REPLICATE_API_TOKEN,
    });

    const output = await replicate.run(model, {
      input: {
        negative_prompt:
          "blurry, low quality, distorted text, unreadable text, multiple animals, no shirt, naked, inappropriate, nsfw",
        seed: 10,
        prompt: prompt,
        model_type: "fast",
        resolution: "1024 × 1024 (Square)",
        speed_mode: "Extra Juiced 🚀 (even more speed)",
        output_format: "jpg",
        output_quality: 80,
      },
    });

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const imageUrl = (output as any).url();

    if (!imageUrl) {
      return NextResponse.json(
        { error: "Failed to generate image" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      imageUrl: imageUrl,
    });
  } catch (error) {
    console.error("Error in generate API:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Internal server error",
      },
      { status: 500 }
    );
  }
}
