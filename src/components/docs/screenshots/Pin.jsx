export function Pin({ number, anchor = 'top-right', tone = 'cred' }) {
  return (
    <span className={`ds-pin ds-pin--${anchor} ds-pin--${tone}`} aria-hidden="true">
      {number}
    </span>
  )
}
