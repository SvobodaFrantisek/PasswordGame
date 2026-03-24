import { useState } from 'react'

type CountryFlagValidatorProps = {
  password: string
}

const countries = ["AD", "AE", "AF", "AG", "AI", "AL", "AM", "AO", "AQ", "AR", "AS", "AT", "AU", "AW", "AX", "AZ", "BA", "BB", "BD", "BE", "BF", "BG", "BH", "BI", "BJ", "BL", "BM", "BN", "BO", "BQ", "BR", "BS", "BT", "BV", "BW", "BY", "BZ", "CA", "CC", "CD", "CF", "CG", "CH", "CI", "CK", "CL", "CM", "CN", "CO", "CR", "CU", "CV", "CW", "CX", "CY", "CZ", "DE", "DJ", "DK", "DM", "DO", "DZ", "EC", "EE", "EG", "EH", "ER", "ES", "ET", "FI", "FJ", "FK", "FM", "FO", "FR", "GA", "GB", "GD", "GE", "GF", "GG", "GH", "GI", "GL", "GM", "GN", "GP", "GQ", "GR", "GS", "GT", "GU", "GW", "GY", "HK", "HM", "HN", "HR", "HT", "HU", "ID", "IE", "IL", "IM", "IN", "IO", "IQ", "IR", "IS", "IT", "JE", "JM", "JO", "JP", "KE", "KG", "KH", "KI", "KM", "KN", "KP", "KR", "KW", "KY", "KZ", "LA", "LB", "LC", "LI", "LK", "LR", "LS", "LT", "LU", "LV", "LY", "MA", "MC", "MD", "ME", "MF", "MG", "MH", "MK", "ML", "MM", "MN", "MO", "MP", "MQ", "MR", "MS", "MT", "MU", "MV", "MW", "MX", "MY", "MZ", "NA", "NC", "NE", "NF", "NG", "NI", "NL", "NO", "NP", "NR", "NU", "NZ", "OM", "PA", "PE", "PF", "PG", "PH", "PK", "PL", "PM", "PN", "PR", "PS", "PT", "PW", "PY", "QA", "RE", "RO", "RS", "RU", "RW", "SA", "SB", "SC", "SD", "SE", "SG", "SH", "SI", "SJ", "SK", "SL", "SM", "SN", "SO", "SR", "SS", "ST", "SV", "SX", "SY", "SZ", "TC", "TD", "TF", "TG", "TH", "TJ", "TK", "TL", "TM", "TN", "TO", "TR", "TT", "TV", "TW", "TZ", "UA", "UG", "UM", "US", "UY", "UZ", "VA", "VC", "VE", "VG", "VI", "VN", "VU", "WF", "WS", "YE", "YT", "ZA", "ZM", "ZW"]

function CountryFlagValidator({ password }: CountryFlagValidatorProps) {
  const [selectedCountry] = useState(
    () => countries[Math.floor(Math.random() * countries.length)]
  )
  const flagUrl = `https://countryflagsapi.netlify.app/flag/${selectedCountry}.svg`
  const containsCountryCode = password.toUpperCase().includes(selectedCountry)

  return (
    <section className="strength-section validator-card p-4 rounded-4">
      <div className="d-flex flex-wrap justify-content-between align-items-start gap-3 mb-3">
        <h2 className="h5 mb-0">Validator vlajky</h2>

        <span
          className="status-text fw-semibold"
          style={{
            color: containsCountryCode
              ? 'var(--success-color)'
              : 'var(--danger-color)',
          }}
        >
          {containsCountryCode ? 'Validni' : 'Nevalidni'}
        </span>
      </div>

      <div className="row g-3 align-items-center">
        <div className="col-sm-4">
          <img
            src={flagUrl}
            alt="Vlajka vybrane zeme"
            width="80"
          />
        </div>

        <div className="col-sm-8">
          <div className="stat-box h-100">
            <div className="small text-uppercase stat-label">Ukol</div>
            <div className="stat-value">Pridat zkratku statu podle vlajky</div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <div className="small text-uppercase stat-label">Stav kontroly</div>
        <div className={containsCountryCode ? 'met fw-semibold' : 'unmet fw-semibold'}>
          {containsCountryCode
            ? 'Heslo obsahuje zkratku vybrane zeme'
            : 'Heslo zatim neobsahuje zkratku vybrane zeme'}
        </div>
      </div>
    </section>
  )
}

export default CountryFlagValidator
