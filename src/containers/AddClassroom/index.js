import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, Tooltip, message } from 'antd'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input, Switch, Button, MultiSelect } from '../../components'

class AddClassroom extends Component {
  state = {
    form: {
      id: '',
      description: '',
      numberOfSeats: '',
      hasProjector: false,
      hasBoard: false,
      hasSmartBoard: false,
      operatingSystems: [],
      software: [],
      layout: [
        Array(60).fill(0),
        Array(60).fill(0),
        Array(60).fill(0),
        Array(60).fill(0),
        Array(60).fill(0),
        Array(60).fill(0),
      ],
    },
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/classrooms')
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
      const classroomsIds = this.props.classrooms.map(c => c.id)
      const newClassroomId = this.state.form.id

      if (classroomsIds.includes(newClassroomId)) {
        message.error(
          `Učionica sa oznakom '${newClassroomId}' već postoji. Izaberite neku drugu oznaku.`
        )
        return
      }

      this.props.addClassroom(this.state.form)
      this.props.history.push('/classrooms')
    }
  }

  isFormValid = () => {
    const isIdInputValid = this.idInput.isValid()
    const isNumberOfSeatsInputValid = this.numberOfSeatsInput.isValid()

    return isIdInputValid && isNumberOfSeatsInputValid
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
                this.props.history.push('/classrooms')
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
            <h2 style={{ display: 'inline-block', marginRight: 10 }}>Dodavanje učionice</h2>
            <Tooltip title="Podaci koji su obavezni imaju * ispred naziva.">
              <a style={{ fontSize: 20 }}>
                <Icon type="question-circle" />
              </a>
            </Tooltip>
            <br />
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
              label="Broj radnih mesta"
              placeholder="Unesite broj radnih mesta"
              ref={ref => {
                this.numberOfSeatsInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('numberOfSeats', value)
              }}
            />
            <Switch
              label="Učionica poseduje projektor?"
              onChange={value => {
                this.handleFormInputChange('hasProjector', value)
              }}
            />
            <Switch
              label="Učionica poseduje tablu?"
              onChange={value => {
                this.handleFormInputChange('hasBoard', value)
              }}
            />
            <Switch
              label="Učionica poseduje pametnu tablu?"
              onChange={value => {
                this.handleFormInputChange('hasSmartBoard', value)
              }}
            />
            <MultiSelect
              label="Operativni sistem(i)"
              options={['Windows', 'Linux'].map(os => ({
                value: os,
                label: os,
              }))}
              onChange={value => {
                this.handleFormInputChange('operatingSystems', value)
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
              Dodaj učionicu (⌥ + 2)
            </Button>
          </Col>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  software: state.software,
  classrooms: state.classrooms,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AddClassroom)
)
