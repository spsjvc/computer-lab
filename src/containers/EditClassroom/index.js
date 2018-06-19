import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon } from 'antd'

import * as actions from './actions'
import { Input, Switch, Button, MultiSelect } from '../../components'

class EditClassroom extends Component {
  state = {
    form: {
      id: this.props.editingClassroom.id,
      description: this.props.editingClassroom.description,
      numberOfSeats: this.props.editingClassroom.numberOfSeats,
      hasProjector: this.props.editingClassroom.hasProjector,
      hasBoard: this.props.editingClassroom.hasBoard,
      hasSmartBoard: this.props.editingClassroom.hasSmartBoard,
      operatingSystems: this.props.editingClassroom.operatingSystems,
      software: this.props.editingClassroom.software,
      layout: this.props.editingClassroom.layout,
    },
  }

  componentWillMount() {
    if (this.props.editingClassroom === null) {
      this.props.history.push('/classrooms')
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
      this.props.editClassroom(this.state.form)
      this.props.setEditingClassroom(null)
      this.props.history.push('/classrooms')
    }
  }

  isFormValid = () => {
    const isIdInputValid = this.idInput.isValid()
    const isDescriptionInputValid = this.descriptionInput.isValid()
    const isNumberOfSeatsInputValid = this.numberOfSeatsInput.isValid()

    return isIdInputValid && isDescriptionInputValid && isNumberOfSeatsInputValid
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
                this.props.setEditingClassroom(null)
                this.props.history.push('/classrooms')
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
            <h2>Izmena učionice</h2>
            <Input
              disabled
              label="Oznaka"
              placeholder="Unesite oznaku"
              value={this.props.editingClassroom.id}
              ref={ref => {
                this.idInput = ref
              }}
              onChange={value => {
                this.handleFormInputChange('id', value)
              }}
            />
            <Input
              label="Opis"
              placeholder="Unesite opis"
              value={this.props.editingClassroom.description}
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
              value={this.props.editingClassroom.numberOfSeats}
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
              value={this.props.editingClassroom.hasProjector}
              onChange={value => {
                this.handleFormInputChange('hasProjector', value)
              }}
            />
            <Switch
              label="Učionica poseduje tablu?"
              value={this.props.editingClassroom.hasBoard}
              onChange={value => {
                this.handleFormInputChange('hasBoard', value)
              }}
            />
            <Switch
              label="Učionica poseduje pametnu tablu?"
              value={this.props.editingClassroom.hasSmartBoard}
              onChange={value => {
                this.handleFormInputChange('hasSmartBoard', value)
              }}
            />
            <MultiSelect
              label="Operativni sistem(i)"
              value={this.props.editingClassroom.operatingSystems}
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
              value={this.props.editingClassroom.software}
              options={this.props.software.map(software => ({
                value: software.id,
                label: software.name,
              }))}
              onChange={value => {
                this.handleFormInputChange('software', value)
              }}
            />
            <Button type="primary" onClick={this.handleSubmit}>
              Izmeni učionicu
            </Button>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  software: state.software,
  classrooms: state.classrooms,
  editingClassroom: state.editingClassroom,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(EditClassroom)
)
