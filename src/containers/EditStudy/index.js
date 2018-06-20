import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, Tooltip } from 'antd'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input, Button, DatePicker } from '../../components'

class EditStudy extends Component {
  state = {
    form: {
      id: this.props.editingStudy.id,
      name: this.props.editingStudy.name,
      date: this.props.editingStudy.date,
      description: this.props.editingStudy.description,
    },
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/studies')
        break
      case 'alt+2':
        this.handleSubmit()
        break
      default:
        break
    }
  }

  handleFormInputChange = (field, value) => {
    this.setState({
      form: {
        ...this.state.form,
        [field]: value,
      },
    })
  }

  handleSubmit = () => {
    if (this.isFormValid()) {
      this.props.editStudy(this.state.form)
      this.props.history.push('/studies')
      this.props.setEditingStudy(this.state.form)
    }
  }

  isFormValid = () => {
    const isIdInputValid = this.idInput.isValid()
    const isNameInputValid = this.nameInput.isValid()

    return isIdInputValid && isNameInputValid
  }

  render() {
    return (
      <Hotkeys keyName="alt+1,alt+2" onKeyUp={this.onKeyUp}>
        <Row style={{ paddingTop: '20px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '22', offset: '1' }}
            md={{ span: '22', offset: '1' }}
            lg={{ span: '22', offset: '1' }}
          >
            <a
              onClick={e => {
                e.preventDefault()
                this.props.setEditingStudy(null)
                this.props.history.push('/studies')
              }}
            >
              <Icon type="arrow-left" /> Nazad (⌥ + 1)
            </a>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '16', offset: '1' }}
            md={{ span: '12', offset: '1' }}
            lg={{ span: '8', offset: '1' }}
          >
            <h2 style={{ display: 'inline-block', marginRight: 10 }}>Izmena smera</h2>
            <Tooltip title="Podaci koji su obavezni imaju * ispred naziva.">
              <a style={{ fontSize: 20 }}>
                <Icon type="question-circle" />
              </a>
            </Tooltip>
            <br />
            <Input
              disabled
              label="Oznaka"
              value={this.props.editingStudy.id}
              placeholder="Unesite oznaku"
              ref={ref => {
                this.idInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('id', value)
              }}
            />
            <Input
              required
              label="Naziv"
              value={this.props.editingStudy.name}
              placeholder="Unesite naziv"
              ref={ref => {
                this.nameInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('name', value)
              }}
            />
            <DatePicker
              label="Datum uvođenja"
              value={this.props.editingStudy.date}
              onChange={value => {
                this.handleFormInputChange('date', value)
              }}
            />
            <Input
              label="Opis"
              value={this.props.editingStudy.description}
              placeholder="Unesite opis (opciono)"
              ref={ref => {
                this.descriptionInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('description', value)
              }}
            />
            <Button type="primary" onClick={this.handleSubmit}>
              Izmeni smer (⌥ + 2)
            </Button>
          </Col>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
  editingStudy: state.editingStudy,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditStudy)
)
