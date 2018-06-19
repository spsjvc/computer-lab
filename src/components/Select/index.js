import React from 'react'
import { Select as AntSelect } from 'antd'

const Select = ({ label, options, onChange, value }) => (
  <div style={{ marginBottom: '27.5px' }}>
    <div style={{ marginBottom: '2.5px' }}>
      <label style={{ fontWeight: '500', display: 'block' }}>{label}</label>
    </div>
    <AntSelect
      defaultValue={value ? value : options[0].value}
      style={{ width: '100%' }}
      onChange={onChange}
    >
      {options.map(option => (
        <AntSelect.Option key={option.value}>{option.label}</AntSelect.Option>
      ))}
    </AntSelect>
  </div>
)

export default Select
