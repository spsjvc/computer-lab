import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon } from 'antd'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input, Button, Switch, Select, MultiSelect } from '../../components'

class EditSubject extends Component {
  state = {
    form: {
      id: this.props.editingSubject.id,
      name: this.props.editingSubject.name,
      study: this.props.editingSubject.study,
      description: this.props.editingSubject.description,
      groupSize: this.props.editingSubject.groupSize,
      minimumLength: this.props.editingSubject.minimumLength,
      numberOfTerms: this.props.editingSubject.numberOfTerms,
      numberOfTermsRemaining: this.props.editingSubject.numberOfTermsRemaining,
      needsProjector: this.props.editingSubject.needsProjector,
      needsBoard: this.props.editingSubject.needsBoard,
      needsSmartBoard: this.props.editingSubject.needsSmartBoard,
      operatingSystem: this.props.editingSubject.operatingSystem,
      software: this.props.editingSubject.software,
      color: this.props.editingSubject.color,
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
      this.props.editSubject({
        ...this.state.form,
        numberOfTermsRemaining: parseInt(this.state.form.numberOfTerms, 10),
      })
      this.props.history.push('/subjects')
      this.props.setEditingSubject(null)
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
                this.props.setEditingSubject(null)
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
            <h2>Izmena predmeta</h2>
            <Input
              disabled
              label="Oznaka"
              value={this.props.editingSubject.id}
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
              value={this.props.editingSubject.name}
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
              value={this.props.editingSubject.study}
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
              value={this.props.editingSubject.description}
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
              value={this.props.editingSubject.groupSize}
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
              value={this.props.editingSubject.minimumLength}
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
              value={this.props.editingSubject.numberOfTerms}
              ref={ref => {
                this.numberOfTermsInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('numberOfTerms', value)
              }}
            />
            <Switch
              label="Zahteva projektor?"
              value={this.props.editingSubject.needsProjector}
              onChange={value => {
                this.handleFormInputChange('needsProjector', value)
              }}
            />
            <Switch
              label="Zahteva tablu?"
              value={this.props.editingSubject.needsBoard}
              onChange={value => {
                this.handleFormInputChange('needsBoard', value)
              }}
            />
            <Switch
              label="Zahteva pametnu tablu?"
              value={this.props.editingSubject.needsSmartBoard}
              onChange={value => {
                this.handleFormInputChange('needsSmartBoard', value)
              }}
            />
            <Select
              label="* Operativni sistem"
              value={this.props.editingSubject.operatingSystem}
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
              value={this.props.editingSubject.software}
              options={this.props.software.map(software => ({
                value: software.id,
                label: software.name,
              }))}
              onChange={value => {
                this.handleFormInputChange('software', value)
              }}
            />
            <Button type="primary" onClick={this.handleSubmit}>
              Izmeni predmet (⌥ + 2)
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
  editingSubject: state.editingSubject,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditSubject)
)
