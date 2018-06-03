import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Button } from 'antd'

class Software extends Component {
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
            <h1>Softver</h1>
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-software')
              }}
            >
              Dodaj novi softver
            </Button>
            <Table
              size="small"
              dataSource={this.props.software.map(software => ({
                ...software,
                key: software.id,
              }))}
            >
              <Table.Column title="Oznaka" dataIndex="id" />
              <Table.Column title="Naziv" dataIndex="name" />
              <Table.Column title="Operativni sistem" dataIndex="operatingSystem" />
              <Table.Column title="Proizvođač" dataIndex="manufacturer" />
              <Table.Column title="Vebsajt" dataIndex="website" />
              <Table.Column title="Godina izdanja" dataIndex="year" />
              <Table.Column title="Cena (RSD)" dataIndex="price" />
              <Table.Column title="Opis" dataIndex="description" />
            </Table>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  software: state.software,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Software)
)
