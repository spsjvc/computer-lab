import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Button } from 'antd'

class Studies extends Component {
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
            <h1>Smerovi</h1>
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-study')
              }}
            >
              Dodaj novi smer
            </Button>
            <Table
              dataSource={this.props.studies.map(study => ({
                ...study,
                key: study.id,
              }))}
              size="small"
            >
              <Table.Column title="Oznaka" dataIndex="id" />
              <Table.Column title="Naziv" dataIndex="name" />
              <Table.Column title="Datum uvođenja" dataIndex="date" />
              <Table.Column title="Opis" dataIndex="description" />
            </Table>
          </Col>
        </Row>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Studies)
)
