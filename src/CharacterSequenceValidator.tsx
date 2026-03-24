import type { PasswordData } from './types'

type CharacterSequenceValidatorProps = {
  passwordData: PasswordData
}

type CharacterType = 'lowercase' | 'uppercase' | 'number' | 'special' | 'other'

function getCharacterType(char: string): CharacterType {
  if (/[a-z]/.test(char)) return 'lowercase'
  if (/[A-Z]/.test(char)) return 'uppercase'
  if (/\d/.test(char)) return 'number'
  if (/[!@#$%^&*]/.test(char)) return 'special'

  return 'other'
}

function CharacterSequenceValidator({
  passwordData,
}: CharacterSequenceValidatorProps) {
  const password = passwordData.value
  let validSequenceCount = 0

  for (let index = 0; index <= password.length - 4; index += 1) {
    const sequence = password.slice(index, index + 4)
    const sequenceTypes = new Set(
      sequence.split('').map((char) => getCharacterType(char))
    )

    const hasAllRequiredTypes =
      sequenceTypes.has('lowercase') &&
      sequenceTypes.has('uppercase') &&
      sequenceTypes.has('number') &&
      sequenceTypes.has('special')

    if (hasAllRequiredTypes) {
      validSequenceCount += 1
    }
  }

  const sequenceResult = {
    isValid: validSequenceCount > 0,
    validSequenceCount,
  }

  return (
    <section className="strength-section validator-card p-4 rounded-4">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <h2 className="h5 mb-0">Validator sekvenci</h2>

        <span
          className="status-text fw-semibold"
          style={{
            color: sequenceResult.isValid
              ? 'var(--success-color)'
              : 'var(--danger-color)',
          }}
        >
          {sequenceResult.isValid ? 'Validni' : 'Nevalidni'}
        </span>
      </div>

      <div className="row g-3">
        <div className="col-sm-6">
          <div className="stat-box h-100">
            <div className="small text-uppercase stat-label">Nalezene sekvence</div>
            <div className="stat-value">{sequenceResult.validSequenceCount}</div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="stat-box h-100">
            <div className="small text-uppercase stat-label">Stav kontroly</div>
            <div className={sequenceResult.isValid ? 'met fw-semibold' : 'unmet fw-semibold'}>
              {sequenceResult.isValid
                ? 'Alespon jedna validni sekvence nalezena'
                : 'Zatim zadna validni sekvence'}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CharacterSequenceValidator
