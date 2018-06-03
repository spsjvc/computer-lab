import React from 'react'
import { Switch as AntSwitch } from 'antd'

const Switch = ({ label, onChange }) => (
  <div style={{ marginBottom: '27.5px' }}>
    <div style={{ marginBottom: '2.5px' }}>
      <label style={{ fontWeight: '500', display: 'block' }}>{label}</label>
    </div>
    <AntSwitch onChange={onChange} />
  </div>
)

export default Switch
