import './AIFeatures.css'

const aiModels = [
  { name: 'Claude', color: '#D97757', svg: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#D97757"><path d="M4.709 15.955l4.72-2.647.08-.23-.08-.128H9.2l-.79-.048-2.698-.073-2.339-.097-1.07-.072-.82-.097L1 12.33l.146-.314.224-.145.85.097 1.02.072 2.34.097h.37l2.318.073.79.048h.467c.34 0 .49-.073.49-.194 0-.097-.1-.17-.295-.243l-.76-.314L7.5 11.12l-2.144-.897-2.032-.945-1.166-.605-.776-.41-.47-.265-.398-.387.288-.41.42-.096.567.241.874.435.937.484 1.956.946 2.049.897.946.435.307.073.29-.217-.103-.338-.765-2.155-.832-2.44-.508-1.714-.314-1.256-.096-.702.313-.29.42.048.242.41.314 1.062.508 1.714.78 2.44.765 2.155.242.726.266.048.21-.193.003-.338-.29-.702-.618-1.834-.58-1.737-.25-.969.338-.29.41.048.266.265.765 2.085.83 2.44.508 1.737.048.096.339-.048.193-.217v-.726l.048-2.854V4.734l.024-1.087.072-.557.338-.34.42.025.267.41-.024.774-.072 1.52-.024 2.854v2.01c0 .5.024.968.048 1.4l.024.241.29.025.21-.194.532-1.014 1.336-2.47 1.287-2.26.753-1.21.58-.872.363-.41.34-.048.387.29-.049.435-.605.921-.82 1.38-1.142 2.01-1.384 2.54-.048.12.169.145.29-.048.242-.29.387-1.59 1.593-1.457 1.52-.87.92-.024.338.05.073.29-.074.75-.629.8-1.529 1.617-1.093 1.19-.67.702-.387.241-.339-.048-.338-.314.024-.314.29-.266.97-1.013 1.311-1.424.822-.944.532-.847.024-.266-.266-.169-.314.097-.387.724-1.03.219-.386.048-.29-.29-.097-.169.097-.29.17-.532.532-1.144 1.014-1.59 1.4-1.91 1.569-.241.169-.847.799-1.335 1.135-.339.218-.58.29-.87.145l-.435-.411.072-.508.363-.265.97-.8 1.26-1.062 1.93-1.593 1.59-1.4 1.094-1.013.532-.508.073-.29-.29-.145-.387.097-1.02.557-1.287.75-1.86 1.135-2.388 1.448-1.956 1.19-.25.097-.581.411-.532.338-.29.048-.41-.338-.073-.362.29-.266.966-.605 1.457-.897 2.364-1.448 2.364-1.4 1.287-.75.605-.315.484-.483-.024-.29-.314-.073-.411.122-1.263.605-1.81.847-2.85 1.375-2.727 1.327-1.022.484-.678.266-.508-.024-.339-.314.121-.435.363-.145.194.048.968-.46 2.582-1.232 2.752-1.32 1.84-.872.702-.29z"/></svg>
  )},
  { name: 'Gemini', color: '#4285F4', svg: (
    <svg viewBox="0 0 24 24" width="22" height="22"><defs><linearGradient id="gem-g" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#4285F4"/><stop offset="100%" stopColor="#9B72F8"/></linearGradient></defs><path fill="url(#gem-g)" d="M12 24A12 12 0 0 1 12 0a12 12 0 0 1 0 24zm0-3.265c.52-3.5 3.236-6.235 8.735-8.735C15.236 9.5 12.52 6.765 12 3.265 11.48 6.765 8.764 9.5 3.265 12 8.764 14.5 11.48 17.235 12 20.735z"/></svg>
  )},
  { name: 'OpenAI', color: '#000', svg: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#000"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"/></svg>
  )},
  { name: 'FlowMitra', center: true, svg: (
    <svg viewBox="0 0 24 24" width="28" height="28"><rect width="24" height="24" rx="6" fill="#6366f1"/><path d="M6 8h12v2H6zm0 4h8v2H6zm0 4h10v2H6z" fill="#fff"/></svg>
  )},
  { name: 'Meta', color: '#0082FB', svg: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#0082FB"><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 2.942 1.22 1.639 0 2.965-.901 3.814-2.777.13-.292.272-.63.404-1.019.022-.066.058-.147.08-.215.457-1.336.615-2.88.615-4.309 0-2.932-.658-5.602-2.029-7.538C21.048 3.816 19.387 2.87 17.5 2.87c-1.145 0-2.123.36-3.07 1.172-.86.748-1.63 1.893-2.382 3.205l-.174.302-.174-.302c-.752-1.312-1.522-2.457-2.381-3.205-.947-.812-1.925-1.172-3.07-1.172H6.914z"/></svg>
  )},
  { name: 'DeepSeek', color: '#4D6BFE', svg: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#4D6BFE"><circle cx="12" cy="12" r="10"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2"/></svg>
  )},
  { name: 'Mistral', color: '#FF7000', svg: (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="#FF7000"><path d="M0 0h3.6v3.6H0zm7.2 0h3.6v3.6H7.2zM0 7.2h3.6v3.6H0zm7.2 0h3.6v3.6H7.2zM0 14.4h3.6v3.6H0zm7.2 7.2h3.6V24H7.2zm0-7.2h3.6v3.6H7.2zm7.2-7.2h3.6v3.6h-3.6zm0 7.2h3.6v3.6h-3.6zm0 7.2h3.6V24h-3.6zm7.2-21.6H24v3.6h-3.6zm0 7.2H24v3.6h-3.6z"/></svg>
  )},
]

const integrations = [
  { name: 'Salesforce', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M10.006 5.415a4.195 4.195 0 0 1 3.45-1.806 4.24 4.24 0 0 1 3.965 2.792 3.067 3.067 0 0 1 1.412-.347 3.08 3.08 0 0 1 3.08 3.08 3.08 3.08 0 0 1-.347 1.412 4.24 4.24 0 0 1 2.792 3.965 4.195 4.195 0 0 1-1.806 3.45 4.24 4.24 0 0 1-3.965 2.792 3.067 3.067 0 0 1-1.412.347 3.08 3.08 0 0 1-3.08-3.08 3.08 3.08 0 0 1 .347-1.412 4.24 4.24 0 0 1-2.792-3.965 4.195 4.195 0 0 1 1.806-3.45 4.24 4.24 0 0 1 3.965-2.792 3.067 3.067 0 0 1 1.412-.347 3.08 3.08 0 0 1 3.08 3.08 3.08 3.08 0 0 1-.347 1.412z" fill="#00A1E0"/></svg> },
  { name: 'Slack', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zm1.271 0a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zm0 1.271a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zm10.123 2.521a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zm-1.268 0a2.527 2.527 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zm-2.523 10.123a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zm0-1.268a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/></svg> },
  { name: 'GitHub', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" fill="#181717"/></svg> },
  { name: 'Gmail', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.366l8.073-5.873C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/></svg> },
  { name: 'Sheets', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M14.727 6.727H14V0H4.91C3.291 0 2 1.291 2 2.91v18.18C2 22.709 3.291 24 4.91 24h14.18C20.709 24 22 22.709 22 21.09V8h-6.545a.728.728 0 0 1-.728-.727zm-7.945 6.06h10.436v1.456H6.782zm0 2.91h10.436v1.455H6.782zm0 2.909h6.981v1.455H6.782zM14 7.454h7.274L14 0z" fill="#0F9D58"/></svg> },
  { name: 'Notion', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933z" fill="#000"/></svg> },
  { name: 'Drive', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M6.187 0L0 10.4l3.093 5.2L9.28 5.2zm11.625 0H6.187L9.281 5.2H21.28zm3.094 10.4L14.719 0l-3.094 5.2 6.188 10.4zM20.906 15.6L17.812 10.4H5.814L2.72 15.6zM8.907 15.6L6 20.8h12l-2.906-5.2z" fill="#4285F4"/></svg> },
  { name: 'Airtable', icon: <svg viewBox="0 0 24 24" width="22" height="22"><path d="M11.386 3.382L2.16 7.116c-.353.144-.35.646.004.785l9.256 3.633a2.5 2.5 0 0 0 1.83-.005l9.141-3.628c.352-.14.35-.64-.005-.778l-9.17-3.741a2.5 2.5 0 0 0-1.83 0z" fill="#FCB400"/></svg> },
  null, null, null, null,
]

const scheduledTasks = [
  { name: 'Social Presence', schedule: 'Mondays at 8 AM PST', icon: '📣', showMonitoring: true },
  { name: 'Lead Qualifier', schedule: 'Every form submission', icon: '🎯' },
  { name: 'Security Audit', schedule: 'Every 8 hours', icon: '🔒', showAlert: true },
]

function AIFeatures() {
  return (
    <section className="ai-features-section">
      <div className="container">
        <h2 className="ai-features-title">Everything you need to make AI work</h2>

        <div className="bento-grid">
          {/* Models */}
          <div className="bento-card bento-tl">
            <p className="bento-label">
              Every model out of the box<br />
              <span>no vendor lock-in</span>
            </p>
            <div className="bento-models-row">
              {aiModels.map((m) => (
                <div
                  key={m.name}
                  className={`model-circle ${m.center ? 'model-circle-center' : ''}`}
                  title={m.name}
                >
                  {m.svg}
                </div>
              ))}
            </div>
          </div>

          {/* Integrations */}
          <div className="bento-card bento-tr">
            <p className="bento-label">
              Connect to internal<br />
              <span>and external data</span>
            </p>
            <div className="bento-integrations">
              {integrations.map((app, i) =>
                app ? (
                  <div key={app.name} className="integration-tile" title={app.name}>
                    {app.icon}
                  </div>
                ) : (
                  <div key={`empty-${i}`} className="integration-tile integration-empty" />
                )
              )}
            </div>
          </div>

          {/* Recurring tasks */}
          <div className="bento-card bento-bl">
            <p className="bento-label">
              Recurring tasks to keep your agents<br />
              <span>running in the background</span>
            </p>
            <div className="bento-tasks-wrap">
              {scheduledTasks.map((task, i) => (
                <div key={i} className="task-row-gum">
                  <div className="task-row-left">
                    <span className="task-icon">{task.icon}</span>
                    <div>
                      <div className="task-name-gum">{task.name}</div>
                      <div className="task-schedule-gum">{task.schedule}</div>
                    </div>
                  </div>
                  <div className="task-timeline">
                    {task.showMonitoring && (
                      <span className="monitoring-pill">Monitoring…</span>
                    )}
                    {task.showAlert && (
                      <span className="alert-pill">New Risk Identified</span>
                    )}
                    <div className="timeline-track">
                      {[0, 2, 4, 6, 8].map((h) => (
                        <span key={h} className="timeline-dot">
                          <span className="timeline-label">{h}H</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Workflows canvas */}
          <div className="bento-card bento-br">
            <p className="bento-label">
              A canvas to orchestrate<br />
              <span>multi-agent workflows</span>
            </p>
            <div className="bento-workflow">
              <svg className="workflow-svg" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6" fill="#c4b5fd"/>
                  </marker>
                </defs>
                <path d="M80,100 C120,100 120,50 170,50" stroke="#c4b5fd" strokeWidth="1.5" fill="none" strokeDasharray="4 3" markerEnd="url(#arrow)"/>
                <path d="M80,100 C120,100 120,150 170,150" stroke="#f9a8d4" strokeWidth="1.5" fill="none" strokeDasharray="4 3" markerEnd="url(#arrow)"/>
                <path d="M280,50 C310,50 310,100 330,100" stroke="#93c5fd" strokeWidth="1.5" fill="none" strokeDasharray="4 3" markerEnd="url(#arrow)"/>
                <path d="M280,150 C310,150 310,100 330,100" stroke="#86efac" strokeWidth="1.5" fill="none" strokeDasharray="4 3" markerEnd="url(#arrow)"/>
                <text x="125" y="68" fontSize="9" fill="#9ca3af">Good Review?</text>
                <text x="125" y="138" fontSize="9" fill="#9ca3af">Needs Support?</text>
              </svg>
              <div className="wf-node" style={{ left: '4%', top: '38%' }}>
                <span className="wf-dot" style={{ background: '#8b5cf6' }} />
                Marketing Agent
              </div>
              <div className="wf-node" style={{ left: '38%', top: '18%' }}>
                <span className="wf-dot" style={{ background: '#6366f1' }} />
                Qualify Lead
              </div>
              <div className="wf-node" style={{ left: '38%', top: '62%' }}>
                <span className="wf-dot" style={{ background: '#ec4899' }} />
                Customer Support Agent
              </div>
              <div className="wf-node wf-node-active" style={{ left: '72%', top: '38%' }}>
                <span className="wf-dot" style={{ background: '#10b981' }} />
                Update CRM
                <span className="wf-cursor">↖</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AIFeatures
