import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Icon, Button, Tag, Popconfirm } from 'antd'

import * as actions from './actions'

class Subjects extends Component {
  render() {
    return (
      <Fragment>
        <Row style={{ marginTop: '50px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '22', offset: '1' }}
            md={{ span: '22', offset: '1' }}
            lg={{ span: '22', offset: '1' }}
          >
            <h1>Predmeti</h1>
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
              dataSource={this.props.subjects.map(subject => ({
                ...subject,
                key: subject.id,
              }))}
            >
              <Table.Column title="Oznaka" dataIndex="id" />
              <Table.Column title="Naziv" dataIndex="name" />
              <Table.Column
                title="Smer"
                render={row => this.props.studies.find(s => s.id === row.study).name}
              />
              <Table.Column title="Opis" dataIndex="description" />
              <Table.Column title="Veličina grupe" dataIndex="groupSize" />
              <Table.Column title="Minimalna dužina termina" dataIndex="minimumLength" />
              <Table.Column title="Broj termina" dataIndex="numberOfTerms" />
              <Table.Column
                title="Potreban projektor"
                render={row =>
                  row.needsProjector ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Potrebna tabla"
                render={row =>
                  row.needsBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Potrebna pametna tabla"
                render={row =>
                  row.needsSmartBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column title="Operativni sistem" dataIndex="operatingSystem" />
              <Table.Column
                title="Softver"
                render={row => {
                  return (
                    <Fragment>
                      {row.software.map(s => {
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
                      title="Da li ste sigurni?"
                      okText="Da"
                      cancelText="Ne"
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
