import React from 'react'
import { Button as AntButton } from 'antd'

const Button = ({ tabIndex, type, onClick, children, maxWidth }) => (
  <div style={{ marginBottom: '27.5px', width: maxWidth ? maxWidth : '100%' }}>
    <AntButton tabIndex={tabIndex} type={type} onClick={onClick} style={{ width: '100%' }}>
      {children}
    </AntButton>
  </div>
)

export default Button
