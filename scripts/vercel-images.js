// scripts/vercel-images.js
import fs from 'node:fs'

const file = '.vercel/output/config.json'

const config = {
  ...JSON.parse(fs.readFileSync(file, 'utf-8')),
  images: {
    sizes: [16, 32, 48, 64, 96, 180, 256, 384, 475, 640, 768, 1024, 1280, 1536],
    domains: ['vercel-images-sveltekit.vercel.app'],
    minimumCacheTTL: 86400,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'pokedexkit.vercel.app'
      }
    ]
  }
}

fs.writeFileSync(file, JSON.stringify(config, null, 2))
