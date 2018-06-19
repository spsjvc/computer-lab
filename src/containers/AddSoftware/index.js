import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, message } from 'antd'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input, Button, Select } from '../../components'

class AddSoftware extends Component {
  state = {
    form: {
      id: '',
      name: '',
      operatingSystem: 'Windows',
      manufacturer: '',
      website: '',
      year: '',
      price: '',
      description: '',
    },
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/software')
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
      const softwareIds = this.props.software.map(s => s.id)
      const newSoftwareId = this.state.form.id

      if (softwareIds.includes(newSoftwareId)) {
        message.error(
          `Softver sa oznakom '${newSoftwareId}' već postoji. Izaberite neku drugu oznaku.`
        )
        return
      }

      this.props.addSoftware(this.state.form)
      this.props.history.push('/software')
    }
  }

  isFormValid = () => {
    const isIdInputValid = this.idInput.isValid()
    const isNameInputValid = this.nameInput.isValid()
    const isManufacturerInputValid = this.manufacturerInput.isValid()
    const isWebsiteInputValid = this.websiteInput.isValid()
    const isYearInputValid = this.yearInput.isValid()
    const isPriceInputValid = this.priceInput.isValid()

    return (
      isIdInputValid &&
      isNameInputValid &&
      isManufacturerInputValid &&
      isWebsiteInputValid &&
      isYearInputValid &&
      isPriceInputValid
    )
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
                this.props.history.push('/software')
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
            <h2>Dodavanje softvera</h2>
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
            <Select
              label="* Operativni sistem"
              options={['Windows', 'Linux', 'Cross-platform'].map(os => ({
                value: os,
                label: os,
              }))}
              onChange={value => {
                this.handleFormInputChange('operatingSystem', value)
              }}
            />
            <Input
              required
              label="Proizvođač"
              placeholder="Unesite proizvođača"
              ref={ref => {
                this.manufacturerInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('manufacturer', value)
              }}
            />
            <Input
              required
              label="Vebsajt"
              placeholder="Unesite vebsajt"
              ref={ref => {
                this.websiteInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('website', value)
              }}
            />
            <Input
              required
              type="number"
              label="Godina izdanja"
              placeholder="Unesite godinu izdanja"
              ref={ref => {
                this.yearInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('year', value)
              }}
            />
            <Input
              required
              type="number"
              label="Cena (RSD)"
              placeholder="Unesite cenu"
              ref={ref => {
                this.priceInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('price', value)
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
              Dodaj softver (⌥ + 2)
            </Button>
          </Col>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  software: state.software,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddSoftware)
)
