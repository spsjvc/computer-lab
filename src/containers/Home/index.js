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
        <Row style={{ paddingTop: '55px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '16', offset: '4' }}
            md={{ span: '12', offset: '6' }}
            lg={{ span: '6', offset: '1' }}
          >
            <h2>Računarski centar</h2>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/classrooms')
              }}
            >
              Pregled učionica
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
              Pregled predmeta
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/studies')
              }}
            >
              Pregled smerova
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/software')
              }}
            >
              Pregled softvera
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/schedule')
              }}
            >
              Raspored po učionicama
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
