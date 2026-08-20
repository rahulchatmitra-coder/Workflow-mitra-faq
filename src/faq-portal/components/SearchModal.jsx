import React, { useState, useEffect, useRef, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Search,
  X,
  FileText,
  CornerDownLeft,
  Sparkles,
  KeyRound,
  Zap,
  ShieldCheck,
  Building2,
} from 'lucide-react'
import Fuse from 'fuse.js'
import { DOCS_SEARCH_INDEX } from '../data/docs-search-index'
import { DIRECT_SVG_MAP } from '@/components/ui/svgs/DirectSvgIcon'
import {
  Openai,
  Slack,
  WhatsappIcon,
  Shopify,
  Telegram,
  Discord,
  Google,
  Claude,
  HubSpotLogo,
  ZohoLogo,
  ZoomLogo,
  SmtpLogo,
  GroqLogo,
  GeminiLogo,
  GoogleSheetsLogo,
  MySqlLogo,
} from '@/components/ui/svgs'

const BRAND_ICON_MAP = {
  whatsapp: WhatsappIcon,
  openai: Openai,
  claude: Claude,
  anthropic: Claude,
  gemini: GeminiLogo,
  groq: GroqLogo,
  hubspot: HubSpotLogo,
  shopify: Shopify,
  slack: Slack,
  telegram: Telegram,
  discord: Discord,
  google: Google,
  googlesheets: GoogleSheetsLogo,
  zohocrm: ZohoLogo,
  zoho: ZohoLogo,
  zoom: ZoomLogo,
  mysql: MySqlLogo,
  smtp: SmtpLogo,
}

const POPULAR_SEARCH_TOPICS = [
  { name: 'WhatsApp', id: 'whatsapp' },
  { name: 'OpenAI', id: 'openai' },
  { name: 'Claude AI', id: 'claude' },
  { name: 'HubSpot', id: 'hubspot' },
  { name: 'Shopify', id: 'shopify' },
  { name: 'Slack', id: 'slack' },
]

function renderTopicIcon(providerId, size = 16) {
  if (!providerId) return null
  const id = providerId.toLowerCase()
  const directSvg = DIRECT_SVG_MAP[id]
  if (directSvg) {
    return (
      <img
        src={directSvg}
        alt={id}
        style={{ width: `${size}px`, height: `${size}px`, objectFit: 'contain', flexShrink: 0 }}
      />
    )
  }
  const BrandComp = BRAND_ICON_MAP[id]
  if (BrandComp) {
    return <BrandComp style={{ width: `${size}px`, height: `${size}px`, flexShrink: 0 }} />
  }
  return null
}

export function SearchModal({ isOpen, onClose, initialQuery = '' }) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  const fuse = useMemo(() => {
    return new Fuse(DOCS_SEARCH_INDEX, {
      keys: [
        { name: 'title', weight: 0.5 },
        { name: 'providerId', weight: 0.3 },
        { name: 'category', weight: 0.2 },
        { name: 'description', weight: 0.15 },
        { name: 'snippet', weight: 0.1 },
      ],
      threshold: 0.35,
      distance: 100,
      ignoreLocation: true,
      includeMatches: true,
      minMatchCharLength: 1,
    })
  }, [])

  useEffect(() => {
    if (isOpen) {
      if (initialQuery) {
        setQuery(initialQuery)
      }
      setTimeout(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      }, 50)
    } else {
      setQuery('')
      setSelectedIndex(0)
    }
  }, [isOpen, initialQuery])

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setResults([])
      return
    }
    const searchResults = fuse.search(trimmed).map((res) => res.item)
    setResults(searchResults)
    setSelectedIndex(0)
  }, [query, fuse])

  const displayList = query.trim() ? results : DOCS_SEARCH_INDEX.slice(0, 10)

  const handleSelect = (slug) => {
    if (!slug) return
    if (slug.startsWith('http://') || slug.startsWith('https://')) {
      window.open(slug, '_blank', 'noopener,noreferrer')
    } else if (slug.includes('#')) {
      const [path, hash] = slug.split('#')
      navigate(path || '/docs')
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      navigate(slug)
    }
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, displayList.length))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex((prev) => (prev - 1 + displayList.length) % Math.max(1, displayList.length))
    } else if (e.key === 'Enter' && displayList[selectedIndex]) {
      e.preventDefault()
      handleSelect(displayList[selectedIndex].slug)
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="wm-modal-overlay" onClick={onClose}>
      <div
        className="wm-modal-card"
        style={{ maxWidth: '680px', padding: '0', overflow: 'hidden', borderRadius: '24px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* SEARCH INPUT BAR */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: '1px solid #e2e8f0', gap: '12px', background: '#ffffff' }}>
          <Search size={20} color="#64748b" style={{ flexShrink: 0 }} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search Workflow Mitra (e.g. WhatsApp, OpenAI, Shopify, HubSpot)..."
            style={{ width: '100%', border: 'none', outline: 'none', fontSize: '15px', fontWeight: 600, color: '#09090b', background: 'transparent' }}
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{ border: 'none', background: 'transparent', padding: '4px', cursor: 'pointer', color: '#94a3b8' }}
            >
              <X size={16} />
            </button>
          ) : (
            <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 6px', borderRadius: '6px', background: '#f1f5f9', color: '#64748b', border: '1px solid #cbd5e1' }}>
              ESC
            </span>
          )}
        </div>

        {/* QUICK POPULAR TOPICS WITH OFFICIAL BRAND LOGOS */}
        {!query.trim() && (
          <div style={{ background: '#f8fafc', padding: '14px 20px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.04em', color: '#64748b', marginBottom: '10px' }}>
              <Sparkles size={13} color="#f59e0b" />
              <span>Popular Search Topics:</span>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {POPULAR_SEARCH_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => setQuery(topic.name)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '7px',
                    border: '1.5px solid #e2e8f0',
                    background: '#ffffff',
                    padding: '6px 12px',
                    borderRadius: '9999px',
                    fontSize: '12px',
                    fontWeight: 700,
                    color: '#09090b',
                    cursor: 'pointer',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                    transition: 'all 0.15s ease',
                  }}
                  className="hover:border-zinc-400 hover:bg-zinc-50 active:scale-95"
                >
                  {renderTopicIcon(topic.id, 16)}
                  <span>{topic.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* RESULTS LIST */}
        <div style={{ maxHeight: '380px', overflowY: 'auto', padding: '12px' }}>
          {displayList.length === 0 ? (
            <div style={{ padding: '40px 20px', textAlign: 'center' }}>
              <p style={{ fontSize: '15px', fontWeight: 800, color: '#09090b', margin: 0 }}>
                No matching documentation found for &ldquo;{query}&rdquo;
              </p>
              <p style={{ fontSize: '12.5px', color: '#64748b', margin: '6px 0 0', fontWeight: 500 }}>
                Try searching for &ldquo;WhatsApp&rdquo;, &ldquo;OpenAI&rdquo;, &ldquo;Shopify&rdquo;, or &ldquo;HubSpot&rdquo;.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {displayList.map((item, index) => {
                const isSelected = index === selectedIndex
                const providerIcon = item.providerId ? renderTopicIcon(item.providerId, 20) : null

                return (
                  <div
                    key={item.slug + index}
                    onClick={() => handleSelect(item.slug)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 16px',
                      borderRadius: '16px',
                      cursor: 'pointer',
                      background: isSelected ? '#f1f5f9' : 'transparent',
                      border: isSelected ? '1.5px solid #cbd5e1' : '1.5px solid transparent',
                      transition: 'all 0.12s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                      <div
                        style={{
                          width: '38px',
                          height: '38px',
                          borderRadius: '12px',
                          background: isSelected ? '#ffffff' : '#f1f5f9',
                          border: '1px solid #e2e8f0',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          padding: '6px',
                          boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                        }}
                      >
                        {providerIcon ? (
                          providerIcon
                        ) : item.slug.includes('/credentials') ? (
                          <KeyRound size={18} color="#09090b" />
                        ) : item.slug.includes('webhook') ? (
                          <Zap size={18} color="#f59e0b" />
                        ) : item.category === 'Security' ? (
                          <ShieldCheck size={18} color="#10b981" />
                        ) : (
                          <FileText size={18} color="#64748b" />
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#09090b' }}>
                            {item.title}
                          </span>
                          <span style={{ fontSize: '10px', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px', background: '#e2e8f0', color: '#334155' }}>
                            {item.category}
                          </span>
                        </div>
                        <p style={{ fontSize: '12px', color: '#64748b', margin: '2px 0 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {isSelected && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#09090b', fontSize: '11.5px', fontWeight: 800, flexShrink: 0, marginLeft: '12px' }}>
                        <span>Open</span>
                        <CornerDownLeft size={14} />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* MODAL FOOTER */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px', background: '#f8fafc', borderTop: '1px solid #e2e8f0', fontSize: '11.5px', color: '#64748b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span><kbd style={{ padding: '2px 6px', borderRadius: '5px', background: '#fff', border: '1px solid #cbd5e1', fontWeight: 800 }}>↑↓</kbd> Navigate</span>
            <span><kbd style={{ padding: '2px 6px', borderRadius: '5px', background: '#fff', border: '1px solid #cbd5e1', fontWeight: 800 }}>↵</kbd> Select</span>
            <span><kbd style={{ padding: '2px 6px', borderRadius: '5px', background: '#fff', border: '1px solid #cbd5e1', fontWeight: 800 }}>ESC</kbd> Close</span>
          </div>
          <span style={{ fontWeight: 800, color: '#09090b' }}>
            {results.length > 0 ? `${results.length} results` : `${DOCS_SEARCH_INDEX.length}+ guides indexed`}
          </span>
        </div>
      </div>
    </div>
  )
}
