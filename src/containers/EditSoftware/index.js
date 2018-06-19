import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon } from 'antd'

import * as actions from './actions'
import { Input, Button, Select } from '../../components'

class EditSoftware extends Component {
  state = {
    form: {
      id: this.props.editingSoftware.id,
      name: this.props.editingSoftware.name,
      operatingSystem: this.props.editingSoftware.operatingSystem,
      manufacturer: this.props.editingSoftware.manufacturer,
      website: this.props.editingSoftware.website,
      year: this.props.editingSoftware.year,
      price: this.props.editingSoftware.price,
      description: this.props.editingSoftware.description,
    },
  }

  componentWillMount() {
    if (this.props.editingSoftware === null) {
      this.props.history.push('/software')
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
      this.props.editSoftware(this.state.form)
      this.props.setEditingSoftware(null)
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
      <Fragment>
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
                this.props.setEditingSoftware(null)
              }}
            >
              <Icon type="arrow-left" /> Nazad
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
            <h2>Izmena softvera</h2>
            <Input
              disabled
              value={this.props.editingSoftware.id}
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
              value={this.props.editingSoftware.name}
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
              value={this.props.editingSoftware.operatingSystem}
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
              value={this.props.editingSoftware.manufacturer}
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
              value={this.props.editingSoftware.website}
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
              value={this.props.editingSoftware.year}
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
              value={this.props.editingSoftware.price}
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
              value={this.props.editingSoftware.description}
              ref={ref => {
                this.descriptionInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('description', value)
              }}
            />
            <Button type="primary" onClick={this.handleSubmit}>
              Izmeni softver
            </Button>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  software: state.software,
  editingSoftware: state.editingSoftware,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditSoftware)
)
