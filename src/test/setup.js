import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

// jsdom ships no matchMedia, and framer-motion's useReducedMotion calls it on
// mount — so any test that renders a motion component dies on import without
// this. Reports "no preference", which is the default a real browser gives.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  })
}

// jsdom lacks IntersectionObserver for framer-motion's whileInView
if (!global.IntersectionObserver) {
  global.IntersectionObserver = class IntersectionObserver {
    constructor() {}
    disconnect() {}
    observe() {}
    unobserve() {}
    takeRecords() {
      return []
    }
  }
}

// @lobehub/icons (used by brandIcons.jsx for two icons this docs
// section never needs, OpenAI/DeepSeek) transitively imports
// @emoji-mart/data, whose JSON imports trip Node's native ESM loader
// under Vitest's module runner — a pre-existing issue unrelated to
// this project's own code, and one that doesn't occur in the real
// Vite dev/build. Stubbed here rather than fighting an unrelated
// dependency chain; brandIcons.jsx's own logic is untouched.
// AIAgentsFeatureSection and UnifiedSolutionTemplate reach for three more of
// these, some as bare components and some via a `.Color` sub-component, so the
// stub has to offer both shapes or rendering Home throws on the import.
// AIAgentsFeatureSection's model arc reaches for ten of these, some as bare
// components and some via a `.Color` sub-component, so every stub offers both
// shapes or rendering Home throws on the import.
//
// The stubs render nothing. That means a test counting <svg> inside the model
// arc passes at zero — assert against src/data/aiSectionData.jsx instead, which
// is the whole reason that data lives outside the component.
vi.mock('@lobehub/icons', () => {
  const stub = () => Object.assign(() => null, {
    Color: () => null,
    Mono: () => null,
    Avatar: () => null,
    colorPrimary: '#000000',
  })
  return {
    OpenAI: stub(), Anthropic: stub(), Google: stub(), Meta: stub(),
    DeepSeek: stub(), Gemini: stub(), Mistral: stub(), Qwen: stub(),
    Groq: stub(), Ollama: stub(), HuggingFace: stub(),
  }
})
