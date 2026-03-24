type PasswordStrengthProps = {
  password: string
  passwordStrength: string
}

function PasswordStrength({ password, passwordStrength }: PasswordStrengthProps) {
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*]/.test(password)

  let progressValue = 25
  let accentColor = 'var(--danger-color)'

  if (passwordStrength === 'Stredni') {
    progressValue = 60
    accentColor = 'var(--warning-color)'
  }

  if (passwordStrength === 'Silne') {
    progressValue = 100
    accentColor = 'var(--success-color)'
  }

  return (
    <section className="strength-section validator-card p-4 rounded-4">
      <div className="d-flex justify-content-between align-items-center gap-3 mb-3">
        <h2 className="h5 mb-0">Sila hesla</h2>
        <span className="status-text fw-semibold" style={{ color: accentColor }}>
          {passwordStrength}
        </span>
      </div>

      <div
        className="progress strength-progress mb-3"
        role="progressbar"
        aria-label="Sila hesla"
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <div
          className="progress-bar"
          style={{
            width: `${progressValue}%`,
            backgroundColor: accentColor,
          }}
        />
      </div>

      <ul className="criteria-list list-unstyled mb-0">
        <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <span>Alespon 8 znaku</span>
          <span className={hasMinLength ? 'met fw-semibold' : 'unmet fw-semibold'}>
            {hasMinLength ? 'Splneno' : 'Nesplneno'}
          </span>
        </li>
        <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <span>Alespon jedno velke pismeno</span>
          <span className={hasUppercase ? 'met fw-semibold' : 'unmet fw-semibold'}>
            {hasUppercase ? 'Splneno' : 'Nesplneno'}
          </span>
        </li>
        <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <span>Alespon jedno cislo</span>
          <span className={hasNumber ? 'met fw-semibold' : 'unmet fw-semibold'}>
            {hasNumber ? 'Splneno' : 'Nesplneno'}
          </span>
        </li>
        <li className="d-flex justify-content-between align-items-center py-2 border-bottom">
          <span>Alespon jeden specialni znak (!@#$%^&*)</span>
          <span className={hasSpecialChar ? 'met fw-semibold' : 'unmet fw-semibold'}>
            {hasSpecialChar ? 'Splneno' : 'Nesplneno'}
          </span>
        </li>
      </ul>
    </section>
  )
}

export default PasswordStrength
