import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DarkAIIntegrationsSection from './DarkAIIntegrationsSection';

describe('DarkAIIntegrationsSection', () => {
  it('renders heading and description matching reference', () => {
    const { container } = render(
      <MemoryRouter>
        <DarkAIIntegrationsSection />
      </MemoryRouter>
    );

    expect(container.querySelector('.dark-ai-heading').textContent).toContain('Plug AI into your own data & connect your');
    expect(container.querySelector('.dark-ai-desc').textContent).toContain('Use pre-built nodes for common apps');
  });

  it('renders marquee rows with integration tiles', () => {
    const { container } = render(
      <MemoryRouter>
        <DarkAIIntegrationsSection />
      </MemoryRouter>
    );

    const tiles = container.querySelectorAll('.dark-ai-tile');
    expect(tiles.length).toBeGreaterThan(20);
    expect(container.querySelector('.dark-ai-track.scroll-left')).toBeInTheDocument();
    expect(container.querySelector('.dark-ai-track.scroll-right')).toBeInTheDocument();
  });

  it('renders black pill Browse all integrations button', () => {
    const { container } = render(
      <MemoryRouter>
        <DarkAIIntegrationsSection />
      </MemoryRouter>
    );

    const btn = container.querySelector('.dark-ai-btn');
    expect(btn).toBeInTheDocument();
    expect(btn.getAttribute('aria-label') || btn.textContent).toContain('Browse all integrations');
    expect(btn.getAttribute('href')).toBe('/integrations');
  });
});
