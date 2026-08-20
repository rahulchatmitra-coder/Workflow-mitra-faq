import React, { useState, useEffect } from 'react'
import { HeroSection } from './components/HeroSection'
import { PopularCategoryGrid } from './components/PopularCategoryGrid'
import { WorkflowDemoSection } from './workflow-builder'
import { OnboardingSection } from './components/OnboardingSection'
import { FaqSection } from './components/FaqSection'
import { SearchModal } from './components/SearchModal'
import './faq-portal.css'

export {
  HeroSection,
  PopularCategoryGrid,
  WorkflowDemoSection,
  OnboardingSection,
  FaqSection,
  SearchModal,
}

export default function FaqDocsHomePage() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [initialSearchQuery, setInitialSearchQuery] = useState('')

  useEffect(() => {
    // Global Ctrl+K / Cmd+K listener
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  const handleOpenSearch = (initialQuery = '') => {
    setInitialSearchQuery(initialQuery)
    setIsSearchOpen(true)
  }

  const handleCloseSearch = () => {
    setIsSearchOpen(false)
    setInitialSearchQuery('')
  }

  return (
    <div className="w-full bg-white text-zinc-900 min-h-screen">
      {/* 1. Hero & Search Bar Section */}
      <HeroSection onOpenSearch={handleOpenSearch} />

      {/* 2. Popular FAQ / Category Cards Grid */}
      <PopularCategoryGrid />

      {/* 3. Workflow Interactive Demo Section */}
      <WorkflowDemoSection />

      {/* 4. Onboarding / Quick Start Steps Section */}
      <OnboardingSection />

      {/* 5. FAQ Accordion Section */}
      <FaqSection />

      {/* 6. Global Search Modal (Ctrl+K) */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={handleCloseSearch}
        initialQuery={initialSearchQuery}
      />
    </div>
  )
}
