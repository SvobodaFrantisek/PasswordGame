import { useEffect, useState } from 'react'
import type { PasswordData } from './types'

type PasswordTimeValidatorProps = {
  passwordData: PasswordData
}

const MIN_TYPING_TIME_MS = 5000

function formatTime(ms: number) {
  return (ms / 1000).toFixed(1)
}

function PasswordTimeValidator({
  passwordData,
}: PasswordTimeValidatorProps) {
  const [currentTime, setCurrentTime] = useState<number | null>(null)
  const createdAt = passwordData.createdAt
  const hasStarted = createdAt !== null && passwordData.value.length > 0

  useEffect(() => {
    if (!hasStarted || createdAt === null) {
      return
    }

    const timer = window.setInterval(() => {
      const now = Date.now()
      setCurrentTime(now)

      if (now - createdAt >= MIN_TYPING_TIME_MS) {
        window.clearInterval(timer)
      }
    }, 100)

    return () => window.clearInterval(timer)
  }, [createdAt, hasStarted])

  const effectiveCurrentTime = hasStarted
    ? currentTime !== null && currentTime >= createdAt
      ? currentTime
      : createdAt
    : 0

  const elapsedTime = hasStarted
    ? effectiveCurrentTime - createdAt
    : 0

  const timeResult = {
    isValid: hasStarted && elapsedTime >= MIN_TYPING_TIME_MS,
    elapsedMs: Math.min(elapsedTime, MIN_TYPING_TIME_MS),
  }

  return (
    <section className="strength-section validator-card p-4 rounded-4">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <h2 className="h5 mb-0">Validator rychlosti</h2>

        <span
          className="status-text fw-semibold"
          style={{
            color: !hasStarted
              ? 'var(--muted-text-color)'
              : timeResult.isValid
                ? 'var(--success-color)'
                : 'var(--danger-color)',
          }}
        >
          {!hasStarted ? 'Ceka' : timeResult.isValid ? 'Validni' : 'Nevalidni'}
        </span>
      </div>

      <p className={!hasStarted ? '' : timeResult.isValid ? 'met' : 'unmet'}>
        {!hasStarted
          ? 'Casova kontrola jeste nezacala'
          : timeResult.isValid
            ? 'Casova validace splnena'
            : 'Heslo je zatim zadane prilis rychle'}
      </p>

      <p>Cas: {formatTime(timeResult.elapsedMs)} s</p>
    </section>
  )
}

export default PasswordTimeValidator
