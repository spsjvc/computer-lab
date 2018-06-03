import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, message } from 'antd'

import * as actions from './actions'
import { Input, Button, Switch, Select, MultiSelect } from '../../components'

class AddSubject extends Component {
  state = {
    form: {
      id: '',
      name: '',
      study: this.props.studies[0].value,
      description: '',
      groupSize: '',
      minimumLength: '',
      numberOfTerms: '',
      needsProjector: false,
      needsBoard: false,
      needsSmartBoard: false,
      operatingSystem: 'Windows',
      software: [],
    },
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
    const isDescriptionInputValid = this.descriptionInput.isValid()
    const isGroupSizeInputValid = this.groupSizeInput.isValid()
    const isMinimumLengthInputValid = this.minimumLengthInput.isValid()
    const isNumberOfTermsInputValid = this.numberOfTermsInput.isValid()

    return (
      isIdInputValid &&
      isNameInputValid &&
      isDescriptionInputValid &&
      isGroupSizeInputValid &&
      isMinimumLengthInputValid &&
      isNumberOfTermsInputValid
    )
  }

  render() {
    return (
      <Fragment>
        <Row style={{ marginTop: '50px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '16', offset: '1' }}
            md={{ span: '12', offset: '1' }}
            lg={{ span: '8', offset: '1' }}
          >
            <h1>Dodavanje predmeta</h1>
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
                console.log(value)
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
              Dodaj predmet
            </Button>
          </Col>
        </Row>
      </Fragment>
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
