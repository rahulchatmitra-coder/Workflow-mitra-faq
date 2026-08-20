/**
 * Real Production-Grade Cookie Consent Manager for WorkflowMitra
 * Handles reading & writing document.cookie, localStorage persistence,
 * purging rejected cookie categories, and dispatching consent lifecycle events.
 */

export const STORAGE_KEY = 'wm_cookie_consent_v1'
export const COOKIE_NAME = 'wm_cookie_consent'

/**
 * Write a standard browser cookie
 */
export function setCookie(name, value, days = 365) {
  try {
    const d = new Date()
    d.setTime(d.getTime() + days * 24 * 60 * 60 * 1000)
    const expires = 'expires=' + d.toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/;SameSite=Lax`
  } catch (err) {
    console.warn('[CookieManager] Could not write cookie:', err)
  }
}

/**
 * Read a cookie by name
 */
export function getCookie(name) {
  try {
    const cname = name + '='
    const decodedCookie = decodeURIComponent(document.cookie)
    const ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) === ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(cname) === 0) {
        return c.substring(cname.length, c.length)
      }
    }
  } catch (err) {
    console.warn('[CookieManager] Could not read cookie:', err)
  }
  return null
}

/**
 * Delete a specific cookie across common domains
 */
export function deleteCookie(name) {
  try {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`
    const hostParts = window.location.hostname.split('.')
    if (hostParts.length > 1) {
      const rootDomain = '.' + hostParts.slice(-2).join('.')
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${rootDomain};`
    }
  } catch (err) {
    console.warn('[CookieManager] Error deleting cookie:', name, err)
  }
}

/**
 * Purge optional cookies if rejected by the user
 */
export function purgeRejectedCookies(preferences) {
  if (!preferences.analytics) {
    // Purge standard analytics identifiers
    deleteCookie('_ga')
    deleteCookie('_gid')
    deleteCookie('_gat')
    deleteCookie('_ga_' + window.location.hostname.replace(/[^a-zA-Z0-9]/g, ''))
  }

  if (!preferences.marketing) {
    // Purge common ad/marketing trackers
    deleteCookie('_fbp')
    deleteCookie('_fbc')
    deleteCookie('fr')
  }
}

/**
 * Save user cookie preferences
 */
export function saveConsent(preferences) {
  const payload = {
    hasConsented: true,
    timestamp: new Date().toISOString(),
    acceptedAll: Boolean(preferences.analytics && preferences.marketing),
    preferences: {
      necessary: true,
      analytics: Boolean(preferences.analytics),
      marketing: Boolean(preferences.marketing),
    },
  }

  // 1. Write to document.cookie (accessible to backend and server headers)
  setCookie(COOKIE_NAME, 'true', 365)
  setCookie('wm_cookie_analytics', String(payload.preferences.analytics), 365)
  setCookie('wm_cookie_marketing', String(payload.preferences.marketing), 365)

  // 2. Write to localStorage
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
  } catch (err) {
    console.warn('[CookieManager] localStorage unavailable:', err)
  }

  // 3. Purge rejected cookies immediately
  purgeRejectedCookies(payload.preferences)

  // 4. Dispatch browser event
  window.dispatchEvent(
    new CustomEvent('cookie-consent-updated', {
      detail: payload,
    }),
  )

  return payload
}

/**
 * Get current saved consent preferences
 */
export function getSavedConsent() {
  // Check localStorage first
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (parsed && parsed.preferences) {
        return parsed
      }
    }
  } catch {
    // ignore
  }

  // Fallback check document.cookie
  const cookieVal = getCookie(COOKIE_NAME)
  if (cookieVal === 'true') {
    const analytics = getCookie('wm_cookie_analytics') === 'true'
    const marketing = getCookie('wm_cookie_marketing') === 'true'
    return {
      hasConsented: true,
      preferences: {
        necessary: true,
        analytics,
        marketing,
      },
    }
  }

  return null
}

/**
 * Reset all consent data (useful for testing or user request)
 */
export function resetConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
    // ignore
  }
  deleteCookie(COOKIE_NAME)
  deleteCookie('wm_cookie_analytics')
  deleteCookie('wm_cookie_marketing')
  purgeRejectedCookies({ analytics: false, marketing: false })
  window.dispatchEvent(new CustomEvent('cookie-consent-reset'))
}
