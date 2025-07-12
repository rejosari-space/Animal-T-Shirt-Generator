# Animal T-Shirt Generator

A web application that generates AI-powered images of animals wearing custom t-shirts using Replicate.

## Features

- 🎨 Generate images of animals wearing custom t-shirts
- 🐾 Choose from 10 different animals (cat, dog, rabbit, bear, etc.)
- 📝 Custom text input for t-shirt slogans
- 📱 Responsive design for desktop and mobile
- 📸 Download generated images
- 🕒 History of recent generations
- ⚡ Loading states and error handling

## Quick Setup (< 2 minutes)

### Prerequisites

- Node.js 18+ installed
- Replicate token

### Installation Steps

1. **Clone and install dependencies:**

   ```bash
   git clone https://github.com/rejosari-space/Animal-T-Shirt-Generator.git
   cd Animal-T-Shirt-Generator
   npm install
   ```

2. **Set up environment variables:**

   ```bash
   export REPLICATE_API_TOKEN=<paste-your-token-here>
   ```

3. **Run the development server:**

   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to \`http://localhost:3000\`

## Prompt Strategy

The application uses a carefully crafted prompt strategy to ensure high-quality, consistent results:

**Core Prompt Structure:**
\`"A high-quality, professional photograph of a cute {animal} wearing a clean white t-shirt. The t-shirt has the text "{phrase}" printed clearly and prominently on the front in bold, readable letters. The {animal} is sitting upright, facing the camera, with good lighting and a neutral background. The text on the shirt should be perfectly legible and well-centered. Photorealistic, studio lighting, high resolution."\`

**Key Elements:**

- **Specificity**: Detailed description ensures consistent animal positioning and t-shirt appearance
- **Text Clarity**: Emphasizes "clearly and prominently" and "perfectly legible" to ensure readable text
- **Professional Quality**: Uses terms like "professional photograph" and "studio lighting" for better image quality
- **Negative Prompts**: Explicitly excludes blurry images, distorted text, and inappropriate content
- **Technical Parameters**: Uses optimal settings (50 inference steps, 7.5 guidance scale) for quality vs. speed balance

This approach results in consistent, high-quality images where the text is clearly readable and the animals are properly positioned.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI Generation**: Replicate
- **Language**: TypeScript
- **Deployment**: Vercel-ready

## Improvements for More Time

Given additional development time, I would implement:

1. **Advanced Features:**

   - Multiple t-shirt colors and styles
   - Different font options for text
   - Batch generation capabilities
   - User accounts and persistent history

2. **UX Improvements:**

   - Real-time preview of text on t-shirt mockup
   - Drag-and-drop image uploads for custom backgrounds
   - Social sharing capabilities
   - Advanced filtering and search in history

3. **Performance:**
   - Image optimization and compression
   - Lazy loading for history gallery
   - Request queuing for high traffic
   - Edge caching strategies

## Deployment

This project is configured for one-click deployment on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rejosari-space/Animal-T-Shirt-Generator.git&env=REPLICATE_API_TOKEN)

Remember to add your \`REPLICATE_API_TOKEN\` in the Vercel environment variables.
