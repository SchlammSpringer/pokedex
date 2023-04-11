// scripts/vercel-images.js
import fs from 'node:fs'

const file = '.vercel/output/config.json'

const config = {
  ...JSON.parse(fs.readFileSync(file, 'utf-8')),
  images: {
    sizes: [16, 32, 48, 64, 96, 128, 256, 384],
    domains: ['vercel-images-sveltekit.vercel.app'],
    minimumCacheTTL: 60,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        hostname: 'pokedexkit.vercel.app'
      }
    ]
  }
}

fs.writeFileSync(file, JSON.stringify(config, null, 2))
