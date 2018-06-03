import React, { Component, Fragment } from 'react'
import { Row, Col } from 'antd'

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

export default Home
