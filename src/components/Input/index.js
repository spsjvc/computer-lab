import React, { Component, Fragment } from 'react'
import { Form, Input as AntInput } from 'antd'

class Input extends Component {
  state = {
    value: '',
    error: '',
  }

  static defaultProps = {
    required: false,
  }

  componentWillMount() {
    const { value } = this.props

    if (value !== undefined) {
      this.setState({
        value,
      })
    }
  }

  handleChange = event => {
    const { onChange } = this.props

    const value = event.target.value

    this.setState(
      {
        value,
      },
      () => {
        this.validate()
        onChange(value)
      }
    )
  }

  validate = () => {
    const { required } = this.props
    const { value } = this.state

    if (required) {
      this.setState({
        error: value === '' ? 'Polje je obavezno.' : '',
      })
    }

    return value !== ''
  }

  isValid = () => this.validate()

  render() {
    const { prefix, type, label, placeholder, required, value, disabled } = this.props
    const { error } = this.state

    return (
      <Fragment>
        <label style={{ fontWeight: '500' }}>
          {required ? '*' : ''} {label}
        </label>
        <Form.Item hasFeedback help={error} validateStatus={error === '' ? '' : 'error'}>
          <AntInput
            prefix={prefix}
            type={type}
            error={error}
            disabled={disabled}
            defaultValue={value}
            placeholder={placeholder}
            onChange={this.handleChange}
          />
        </Form.Item>
      </Fragment>
    )
  }
}

export default Input
