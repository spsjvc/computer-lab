import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, message } from 'antd'

import { Button } from '../../components'

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Row style={{ marginTop: '50px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '16', offset: '4' }}
            md={{ span: '12', offset: '6' }}
            lg={{ span: '6', offset: '9' }}
          >
            <h1>Računarski centar</h1>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/classrooms')
              }}
            >
              Učionice
            </Button>
            <Button
              type="primary"
              onClick={() => {
                if (this.props.studies.length === 0) {
                  message.error(
                    'Da biste kreirali predmet morate prethodno kreirati bar jedan smer.'
                  )
                  return
                }

                this.props.history.push('/subjects')
              }}
            >
              Predmeti
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/studies')
              }}
            >
              Smerovi
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/software')
              }}
            >
              Softver
            </Button>
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
  )(Home)
)
