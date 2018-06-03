import React from 'react'
import { DatePicker as AntDatePicker } from 'antd'

const DatePicker = ({ label, onChange }) => (
  <div style={{ marginBottom: '27.5px' }}>
    <div style={{ marginBottom: '2.5px' }}>
      <label style={{ fontWeight: '500', display: 'block' }}>{label}</label>
    </div>
    <AntDatePicker
      format="DD.MM.YYYY."
      placeholder="Odaberite datum"
      onChange={value => {
        onChange(value.format('DD.MM.YYYY.'))
      }}
      style={{ width: '100%' }}
    />
  </div>
)

export default DatePicker
