import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, message } from 'antd'
import randomColor from 'randomcolor'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input, Button, Switch, Select, MultiSelect } from '../../components'

class AddSubject extends Component {
  state = {
    form: {
      id: '',
      name: '',
      study: this.props.studies[0].id,
      description: '',
      groupSize: '',
      minimumLength: '',
      numberOfTerms: '',
      numberOfTermsRemaining: '',
      needsProjector: false,
      needsBoard: false,
      needsSmartBoard: false,
      operatingSystem: 'Windows',
      software: [],
      color: randomColor({ hue: 'green' }),
    },
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/subjects')
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
      const subjectsIds = this.props.subjects.map(s => s.id)
      const newSubjectId = this.state.form.id

      if (subjectsIds.includes(newSubjectId)) {
        message.error(
          `Predmet sa oznakom '${newSubjectId}' već postoji. Izaberite neku drugu oznaku.`
        )
        return
      }

      this.props.addSubject(this.state.form)
      this.props.history.push('/subjects')
    }
  }

  isFormValid = () => {
    const isIdInputValid = this.idInput.isValid()
    const isNameInputValid = this.nameInput.isValid()
    const isGroupSizeInputValid = this.groupSizeInput.isValid()
    const isMinimumLengthInputValid = this.minimumLengthInput.isValid()
    const isNumberOfTermsInputValid = this.numberOfTermsInput.isValid()

    return (
      isIdInputValid &&
      isNameInputValid &&
      isGroupSizeInputValid &&
      isMinimumLengthInputValid &&
      isNumberOfTermsInputValid
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
                this.props.history.push('/subjects')
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
            <h2>Dodavanje predmeta</h2>
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
              label="* Smer"
              options={this.props.studies.map(study => ({
                value: study.id,
                label: study.name,
              }))}
              onChange={value => {
                this.handleFormInputChange('study', value)
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
            <Input
              required
              type="number"
              label="Veličina grupe"
              placeholder="Unesite veličinu grupe"
              ref={ref => {
                this.groupSizeInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('groupSize', value)
              }}
            />
            <Input
              required
              type="number"
              label="Minimalna dužina termina"
              placeholder="Unesite minimalnu dužinu termina"
              ref={ref => {
                this.minimumLengthInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('minimumLength', value)
              }}
            />
            <Input
              required
              type="number"
              label="Broj termina"
              placeholder="Unesite broj termina"
              ref={ref => {
                this.numberOfTermsInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('numberOfTerms', value)
                this.handleFormInputChange('numberOfTermsRemaining', parseInt(value, 10))
              }}
            />
            <Switch
              label="Zahteva projektor?"
              onChange={value => {
                this.handleFormInputChange('needsProjector', value)
              }}
            />
            <Switch
              label="Zahteva tablu?"
              onChange={value => {
                this.handleFormInputChange('needsBoard', value)
              }}
            />
            <Switch
              label="Zahteva pametnu tablu?"
              onChange={value => {
                this.handleFormInputChange('needsSmartBoard', value)
              }}
            />
            <Select
              label="* Operativni sistem"
              options={['Windows', 'Linux', 'Svejedno'].map(os => ({
                value: os,
                label: os,
              }))}
              onChange={value => {
                this.handleFormInputChange('operatingSystem', value)
              }}
            />
            <MultiSelect
              label="Softver"
              options={this.props.software.map(software => ({
                value: software.id,
                label: software.name,
              }))}
              onChange={value => {
                this.handleFormInputChange('software', value)
              }}
            />
            <Button type="primary" onClick={this.handleSubmit}>
              Dodaj predmet (⌥ + 2)
            </Button>
          </Col>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
  subjects: state.subjects,
  software: state.software,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddSubject)
)
