import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, message } from 'antd'

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
      <Fragment>
        <Row style={{ marginTop: '50px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '16', offset: '1' }}
            md={{ span: '12', offset: '1' }}
            lg={{ span: '8', offset: '1' }}
          >
            <h1>Dodavanje smera</h1>
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
              Dodaj smer
            </Button>
          </Col>
        </Row>
      </Fragment>
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
