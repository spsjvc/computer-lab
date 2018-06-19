import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon } from 'antd'

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

  componentWillMount() {
    if (this.props.editingStudy === null) {
      this.props.history.push('/studies')
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
      this.props.setEditingStudy(this.state.form)
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
            <h2>Izmena smera</h2>
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
              Izmeni smer
            </Button>
          </Col>
        </Row>
      </Fragment>
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
