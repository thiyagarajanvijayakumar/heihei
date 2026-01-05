export default function LoginGallery(){
  const Panel = ({children, caption}) => (
    <div>
      <div className="login-panel">
        {children}
      </div>
      {caption && <div className="panel-caption">{caption}</div>}
    </div>
  )

  const SampleCard = ({variant, withError=false, small=false}) => (
    <div className={`login-card ${variant==='white'?'white':''}`}> 
      <div className="login-logo">HeiHei</div>
      <div className="login-title">Sign in</div>

      <div className="login-form">
        <input className="login-input" placeholder="Email" defaultValue={small? 'user@example.com' : ''} />
        <input className="login-input" placeholder="Password" defaultValue={small? '••••••' : ''} style={withError?{border:'1px solid #ff6b6b'}:{}} />
        <button className="login-btn">{variant==='white'? 'Get Started' : 'Login'}</button>
      </div>

      <button className="login-link-btn">Forgot password?</button>
    </div>
  );

  return (
    <div className="login-bg">
      <div className="gallery-grid">
        <div className="gallery-item">
          <Panel caption="Default">
            <SampleCard />
          </Panel>
        </div>

        <div className="gallery-item">
          <Panel caption="Filled fields">
            <SampleCard small={true} />
          </Panel>
        </div>

        <div className="gallery-item">
          <Panel caption="Error state">
            <SampleCard withError={true} />
          </Panel>
        </div>

        <div className="gallery-item">
          <Panel caption="Alternative action">
            <SampleCard />
          </Panel>
        </div>

        <div className="gallery-item">
          <Panel caption="White card">
            <SampleCard variant="white" />
          </Panel>
        </div>

        <div className="gallery-item">
          <Panel caption="Compact">
            <SampleCard small={true} />
          </Panel>
        </div>
      </div>
    </div>
  )
}
