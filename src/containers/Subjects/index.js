import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Icon, Button, Tag, Popconfirm } from 'antd'
import { uniq, truncate } from 'lodash'

import * as actions from './actions'

class Subjects extends Component {
  state = {
    displayedData: this.props.subjects,
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
                this.props.history.push('/')
              }}
            >
              <Icon type="arrow-left" /> Nazad
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
            <h2>Predmeti</h2>
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-subject')
              }}
            >
              Dodaj novi predmet
            </Button>
            <Table
              size="small"
              locale={{ filterConfirm: 'OK', filterReset: 'Poništi', emptyText: 'Nema podataka' }}
              dataSource={this.state.displayedData.map(subject => ({
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
                    <Button style={{ marginRight: '5px' }}>
                      <Icon type="edit" />
                    </Button>
                    <Popconfirm
                      title="Da li ste sigurni da želite da obrišete ovaj predmet?"
                      okText="Da, obriši predmet"
                      cancelText="Ne, zadrži predmet"
                      onConfirm={() => {
                        this.props.deleteSubject(row.id)
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
      </Fragment>
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
