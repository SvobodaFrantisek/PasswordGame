import { useState } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import type { PasswordData } from './types'

type PasswordInputProps = {
  passwordData: PasswordData
  setPasswordData: Dispatch<SetStateAction<PasswordData>>
}

function PasswordInput({
  passwordData,
  setPasswordData,
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section className="mb-4">
      <label htmlFor="password" className="visually-hidden">
        Zadej heslo
      </label>

      <div className="password-input-row input-group input-group-lg">
        <input
          id="password"
          className="form-control"
          type={showPassword ? 'text' : 'password'}
          value={passwordData.value}
          onChange={(event) => {
            const nextValue = event.target.value

            setPasswordData((prev) => ({
              value: nextValue,
              createdAt: nextValue ? prev.createdAt ?? Date.now() : null,
            }))
          }}
          placeholder="Zadej heslo..."
        />

        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? 'Skryt' : 'Zobrazit'}
        </button>
      </div>
    </section>
  )
}

export default PasswordInput
