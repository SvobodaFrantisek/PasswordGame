import { useEffect, useState } from 'react'
import './App.css'
import PasswordInput from './PasswordInput'
import PasswordStrength from './PasswordStrength'
import CharacterSequenceValidator from './CharacterSequenceValidator'
import PasswordTimeValidator from './PasswordTimeValidator'
import CountryFlagValidator from './CountryFlagValidator'
import type { PasswordData } from './types'



function evaluatePassword(password: string) {
  const hasMinLength = password.length >= 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*]/.test(password)

  const score = [
    hasMinLength,
    hasUppercase,
    hasNumber,
    hasSpecialChar,
  ].filter(Boolean).length

  if (score === 4) {
    return 'Silne'
  }

  if (hasMinLength && score >= 2) {
    return 'Stredni'
  }

  return 'Slabe'
}

function App() {
  const [passwordData, setPasswordData] = useState<PasswordData>({
    value: '',
    createdAt: null,
  })
  const [passwordStrength, setPasswordStrength] = useState('Slabe')
  const password = passwordData.value

  useEffect(() => {
    const strength = evaluatePassword(password)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPasswordStrength(strength)
  }, [password])

  useEffect(() => {
    document.title = `Sila hesla: ${passwordStrength}`
  }, [passwordStrength])

  useEffect(() => {
    const sabotageInterval = window.setInterval(() => {
      setPasswordData((prevPasswordData) => {
        const action = Math.random() < 0.5 ? 'add' : 'remove'

        if (action === 'add') {
          return {
            value: prevPasswordData.value + '😜',
            createdAt: prevPasswordData.createdAt ?? Date.now(),
          }
        }

        const characters = Array.from(prevPasswordData.value)

        if (characters.length === 0) {
          return prevPasswordData
        }

        const index = Math.floor(Math.random() * characters.length)
        characters.splice(index, 1)
        const nextValue = characters.join('')

        return {
          value: nextValue,
          createdAt: nextValue ? prevPasswordData.createdAt : null,
        }
      })
    }, 10000)

    return () => window.clearInterval(sabotageInterval)
  }, [])

  return (
    <main className="app">
      <section className="card shadow-lg">
        <div className="mb-4">
          <h1 className="display-6 fw-bold mb-0">Password Check</h1>
        </div>

        <PasswordInput
          passwordData={passwordData}
          setPasswordData={setPasswordData}
        />

        <div className="results-panel">
          <PasswordStrength
            password={password}
            passwordStrength={passwordStrength}
          />
          <CharacterSequenceValidator passwordData={passwordData} />
          <PasswordTimeValidator passwordData={passwordData} />
          <CountryFlagValidator password={password} />
        </div>
      </section>
    </main>
  )
}

export default App
