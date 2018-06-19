import React from 'react'
import { Select as AntSelect } from 'antd'

const MultiSelect = ({ label, options, onChange, value }) => (
  <div style={{ marginBottom: '27.5px' }}>
    <div style={{ marginBottom: '2.5px' }}>
      <label style={{ fontWeight: '500', display: 'block' }}>{label}</label>
    </div>
    <AntSelect
      mode="multiple"
      style={{ width: '100%' }}
      onChange={onChange}
      notFoundContent="Nema rezultata."
      tokenSeparators={[',']}
      defaultValue={value}
    >
      {options.map(option => (
        <AntSelect.Option key={option.value}>{option.label}</AntSelect.Option>
      ))}
    </AntSelect>
  </div>
)

export default MultiSelect
