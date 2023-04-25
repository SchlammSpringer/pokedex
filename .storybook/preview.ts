import type { Preview } from '@storybook/svelte'
import '@skeletonlabs/skeleton/themes/theme-modern.css'
// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
import '@skeletonlabs/skeleton/styles/all.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    }
  }
}

export default preview
