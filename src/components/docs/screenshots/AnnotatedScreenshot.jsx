import './AnnotatedScreenshot.css'

export function AnnotatedScreenshot({ variant, addressBarText, children }) {
  return (
    <div className={`ds-frame ds-frame--${variant}`}>
      {variant === 'browser-chrome' && (
        <div className="ds-frame__chrome" data-testid="fake-address-bar">
          <span className="ds-frame__dots"><i /><i /><i /></span>
          <span className="ds-frame__url">{addressBarText}</span>
        </div>
      )}
      <div className="ds-frame__body">{children}</div>
    </div>
  )
}
