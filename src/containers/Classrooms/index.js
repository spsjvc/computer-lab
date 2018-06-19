import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Icon, Button, Tag, Popconfirm } from 'antd'
import { sortBy, truncate } from 'lodash'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input } from '../../components'

class Classrooms extends Component {
  state = {
    displayedData: this.props.classrooms,
    search: '',
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/')
        break
      case 'alt+2':
        this.props.history.push('/add-classroom')
        break
      default:
        break
    }
  }

  handleFilters = filters => {
    this.setState({
      displayedData: this.props.classrooms.filter(classroom => {
        let passesFilter = true

        Object.entries(filters).forEach(([key, values]) => {
          if (values.length === 0) {
            return
          }

          if (key === 'software') {
            let passesSoftwareFilter = false
            values.forEach(softwareId => {
              if (classroom.software.includes(softwareId)) {
                passesSoftwareFilter = true
              }
            })

            if (passesFilter) {
              passesFilter = passesSoftwareFilter
            }

            return
          }

          if (!values.includes(`${classroom[key]}`)) {
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
            <h2>Učionice</h2>
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-classroom')
              }}
            >
              <Icon type="plus-circle-o" />
              Dodaj novu učionicu (⌥ + 2)
            </Button>
            <br />
            <Input
              prefix={<Icon type="search" />}
              placeholder="Pretražite učionice po opisu"
              onChange={value => {
                this.setState(
                  {
                    search: value,
                  },
                  () => {
                    this.setState({
                      displayedData:
                        this.state.search === ''
                          ? this.props.classrooms
                          : this.props.classrooms.filter(s =>
                              s.description.toLowerCase().includes(this.state.search)
                            ),
                    })
                  }
                )
              }}
            />
            <Table
              size="small"
              dataSource={sortBy(this.state.displayedData, c => c.id).map(classroom => ({
                ...classroom,
                key: classroom.id,
              }))}
              locale={{ filterConfirm: 'OK', filterReset: 'Poništi', emptyText: 'Nema podataka' }}
              onChange={(pagination, filters, sorter) => {
                this.handleFilters(filters)
              }}
            >
              <Table.Column title="Oznaka" dataIndex="id" />
              <Table.Column
                title="Opis"
                dataIndex="description"
                render={description => truncate(description)}
              />
              <Table.Column
                title="Broj radnih mesta"
                dataIndex="numberOfSeats"
                filters={this.props.classrooms.map(classroom => ({
                  text: classroom.numberOfSeats,
                  value: classroom.numberOfSeats,
                }))}
              />
              <Table.Column
                title="Projektor"
                dataIndex="hasProjector"
                filters={[{ text: 'Da', value: true }, { text: 'Ne', value: false }]}
                render={hasProjector =>
                  hasProjector ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Tabla"
                dataIndex="hasBoard"
                filters={[{ text: 'Da', value: true }, { text: 'Ne', value: false }]}
                render={hasBoard =>
                  hasBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Pametna tabla"
                dataIndex="hasSmartBoard"
                filters={[{ text: 'Da', value: true }, { text: 'Ne', value: false }]}
                render={hasSmartBoard =>
                  hasSmartBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Operativni sistem(i)"
                dataIndex="operatingSystems"
                filters={['Windows', 'Linux'].map(os => ({ text: os, value: os }))}
                render={operatingSystems => {
                  return (
                    <Fragment>
                      {operatingSystems.map(os => <Tag key={os}>{truncate(os)}</Tag>)}
                    </Fragment>
                  )
                }}
              />
              <Table.Column
                title="Softver"
                dataIndex="software"
                filters={this.props.software.map(software => ({
                  text: software.name,
                  value: software.id,
                }))}
                render={software => {
                  return (
                    <Fragment>
                      {software.map(s => {
                        const software = this.props.software.find(sft => sft.id === s)
                        return <Tag key={software.id}>{truncate(software.name)}</Tag>
                      })}
                    </Fragment>
                  )
                }}
              />
              <Table.Column
                title=""
                render={row => (
                  <Fragment>
                    <Button
                      style={{ marginRight: '5px' }}
                      onClick={() => {
                        this.props.setEditingClassroom(row)
                        this.props.history.push('/edit-classroom')
                      }}
                    >
                      <Icon type="edit" />
                    </Button>
                    <Popconfirm
                      title={
                        <div>
                          Da li ste sigurni da želite da obrišete ovu učionicu?
                          <br />
                          Nakon brisanja morate ponovo da rasporedite termine.
                        </div>
                      }
                      okText="Da, obriši učionicu"
                      cancelText="Ne, zadrži učionicu"
                      onConfirm={() => {
                        this.props.deleteClassroom(row.id)

                        this.setState({
                          displayedData: this.state.displayedData.filter(c => c.id !== row.id),
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
  classrooms: state.classrooms,
  software: state.software,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Classrooms)
)
