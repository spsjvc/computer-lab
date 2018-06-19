import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, message } from 'antd'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input, Button, DatePicker } from '../../components'

class AddStudy extends Component {
  state = {
    form: {
      id: '',
      name: '',
      date: '',
      description: '',
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
      const studiesIds = this.props.studies.map(s => s.id)
      const newStudyId = this.state.form.id

      if (studiesIds.includes(newStudyId)) {
        message.error(`Smer sa oznakom '${newStudyId}' već postoji. Izaberite neku drugu oznaku.`)
        return
      }

      this.props.addStudy(this.state.form)
      this.props.history.push('/studies')
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
            <h2>Dodavanje smera</h2>
            <Input
              required
              label="Oznaka"
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
              onChange={value => {
                this.handleFormInputChange('date', value)
              }}
            />
            <Input
              label="Opis"
              placeholder="Unesite opis (opciono)"
              ref={ref => {
                this.descriptionInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('description', value)
              }}
            />
            <Button type="primary" onClick={this.handleSubmit}>
              Dodaj smer (⌥ + 2)
            </Button>
          </Col>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddStudy)
)
