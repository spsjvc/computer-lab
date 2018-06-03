import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Icon, Button, Tag } from 'antd'

class Classrooms extends Component {
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
            <h1>Učionice</h1>
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-classroom')
              }}
            >
              Dodaj novu učionicu
            </Button>
            <Table
              size="small"
              dataSource={this.props.classrooms.map(classroom => ({
                ...classroom,
                key: classroom.id,
              }))}
            >
              <Table.Column title="Oznaka" dataIndex="id" />
              <Table.Column title="Opis" dataIndex="description" />
              <Table.Column title="Broj radnih mesta" dataIndex="numberOfSeats" />
              <Table.Column
                title="Projektor"
                render={row =>
                  row.hasProjector ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Tabla"
                render={row =>
                  row.hasBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Pametna tabla"
                render={row =>
                  row.hasSmartBoard ? <Icon type="check-circle" /> : <Icon type="close-circle" />
                }
              />
              <Table.Column
                title="Operativni sistem(i)"
                render={row => {
                  return (
                    <Fragment>{row.operatingSystems.map(os => <Tag key={os}>{os}</Tag>)}</Fragment>
                  )
                }}
              />
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
                    <Button type="danger">
                      <Icon type="delete" />
                    </Button>
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
  classrooms: state.classrooms,
  software: state.software,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Classrooms)
)
