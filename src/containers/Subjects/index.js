import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Icon, Button, Tooltip, Tag, Popconfirm } from 'antd'
import { sortBy, uniq, truncate } from 'lodash'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input } from '../../components'

class Subjects extends Component {
  state = {
    displayedData: this.props.subjects,
    search: '',
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/')
        break
      case 'alt+2':
        this.props.history.push('/add-subject')
        break
      default:
        break
    }
  }

  handleFilters = filters => {
    this.setState({
      displayedData: this.props.subjects.filter(subject => {
        let passesFilter = true

        Object.entries(filters).forEach(([key, values]) => {
          if (values.length === 0) {
            return
          }

          if (key === 'software') {
            let passesSoftwareFilter = false
            values.forEach(softwareId => {
              if (subject.software.includes(softwareId)) {
                passesSoftwareFilter = true
              }
            })

            if (passesFilter) {
              passesFilter = passesSoftwareFilter
            }

            return
          }

          if (!values.includes(`${subject[key]}`)) {
            passesFilter = false
          }
        })

        return passesFilter
      }),
    })
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
                this.props.history.push('/')
              }}
            >
              <Icon type="arrow-left" /> Nazad (⌥ + 1)
            </a>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '22', offset: '1' }}
            md={{ span: '22', offset: '1' }}
            lg={{ span: '22', offset: '1' }}
          >
            <h2 style={{ display: 'inline-block', marginRight: 10 }}>Predmeti</h2>
            <Tooltip
              title={
                <div>
                  Filtrirajte podatke po osobinama klikom na <Icon type="filter" />.<br />
                  <br /> Izmenite ili obrišite podatke klikom na <Icon type="edit" /> i{' '}
                  <Icon type="delete" />.
                </div>
              }
            >
              <a style={{ fontSize: 20 }}>
                <Icon type="question-circle" />
              </a>
            </Tooltip>
            <br />
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-subject')
              }}
            >
              <Icon type="plus-circle-o" />
              Dodaj novi predmet (⌥ + 2)
            </Button>
            <br />
            <Input
              prefix={<Icon type="search" />}
              placeholder="Pretražite predmete po nazivu"
              onChange={value => {
                this.setState(
                  {
                    search: value,
                  },
                  () => {
                    this.setState({
                      displayedData:
                        this.state.search === ''
                          ? this.props.subjects
                          : this.props.subjects.filter(s =>
                              s.name.toLowerCase().includes(this.state.search)
                            ),
                    })
                  }
                )
              }}
            />
            <Table
              size="small"
              locale={{ filterConfirm: 'OK', filterReset: 'Poništi', emptyText: 'Nema podataka' }}
              dataSource={sortBy(this.state.displayedData, s => s.id).map(subject => ({
                ...subject,
                key: subject.id,
              }))}
              onChange={(pagination, filters, sorter) => {
                this.handleFilters(filters)
              }}
            >
              <Table.Column title="Oznaka" dataIndex="id" />
              <Table.Column title="Naziv" dataIndex="name" />
              <Table.Column
                title="Smer"
                dataIndex="study"
                filters={this.props.studies.map(s => ({
                  text: s.name,
                  value: s.id,
                }))}
                render={study => truncate(this.props.studies.find(s => s.id === study).name)}
              />
              <Table.Column
                title="Opis"
                dataIndex="description"
                render={description => truncate(description)}
              />
              <Table.Column
                title="Veličina grupe"
                dataIndex="groupSize"
                filters={uniq(this.props.subjects.map(s => s.groupSize)).map(s => ({
                  text: s,
                  value: s,
                }))}
              />
              <Table.Column title="Minimalna dužina termina" dataIndex="minimumLength" />
              <Table.Column title="Broj termina" dataIndex="numberOfTerms" />
              <Table.Column
                title="Potreban projektor"
                dataIndex="needsProjector"
                filters={[{ text: 'Da', value: true }, { text: 'Ne', value: false }]}
                render={needsProjector =>
                  needsProjector ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Potrebna tabla"
                dataIndex="needsBoard"
                filters={[{ text: 'Da', value: true }, { text: 'Ne', value: false }]}
                render={needsBoard =>
                  needsBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Potrebna pametna tabla"
                dataIndex="needsSmartBoard"
                filters={[{ text: 'Da', value: true }, { text: 'Ne', value: false }]}
                render={needsSmartBoard =>
                  needsSmartBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Operativni sistem"
                dataIndex="operatingSystem"
                filters={['Windows', 'Linux', 'Svejedno'].map(os => ({ text: os, value: os }))}
              />
              <Table.Column
                title="Softver"
                dataIndex="software"
                filters={this.props.software.map(s => ({
                  text: s.name,
                  value: s.id,
                }))}
                render={software => {
                  return (
                    <Fragment>
                      {software.map(s => {
                        const software = this.props.software.find(sft => sft.id === s)
                        return <Tag key={software.id}>{software.name}</Tag>
                      })}
                    </Fragment>
                  )
                }}
              />
              <Table.Column
                title=""
                render={row => (
                  <Fragment>
                    <Popconfirm
                      title={
                        <div>
                          Da li ste sigurni da želite da izmenite ovaj predmet?
                          <br />
                          Nakon izmene morate ponovo da rasporedite termine.
                        </div>
                      }
                      okText="Da, izmeni predmet"
                      cancelText="Ne, zadrži predmet"
                      onConfirm={() => {
                        this.props.setEditingSubject(row)
                        this.props.history.push('/edit-subject')
                      }}
                    >
                      <Button style={{ marginRight: '5px' }}>
                        <Icon type="edit" />
                      </Button>
                    </Popconfirm>
                    <Popconfirm
                      title="Da li ste sigurni da želite da obrišete ovaj predmet?"
                      okText="Da, obriši predmet"
                      cancelText="Ne, zadrži predmet"
                      onConfirm={() => {
                        this.props.deleteSubject(row.id)
                        this.props.clearSubjectSchedule(row.id)

                        this.setState({
                          displayedData: this.state.displayedData.filter(s => s.id !== row.id),
                        })
                      }}
                    >
                      <Button type="danger">
                        <Icon type="delete" />
                      </Button>
                    </Popconfirm>
                  </Fragment>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.subjects,
  studies: state.studies,
  software: state.software,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Subjects)
)
