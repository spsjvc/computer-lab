import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, Tooltip, message } from 'antd'
import Hotkeys from 'react-hot-keys'

import { Button } from '../../components'

class Home extends Component {
  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/classrooms')
        break
      case 'alt+2':
        this.props.history.push('/subjects')
        break
      case 'alt+3':
        this.props.history.push('/studies')
        break
      case 'alt+4':
        this.props.history.push('/software')
        break
      case 'alt+5':
        this.props.history.push('/schedule')
        break
      default:
        break
    }
  }

  render() {
    return (
      <Hotkeys keyName="alt+1,alt+2,alt+3,alt+4,alt+5" onKeyUp={this.onKeyUp}>
        <Row style={{ paddingTop: '55px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '16', offset: '4' }}
            md={{ span: '12', offset: '6' }}
            lg={{ span: '6', offset: '1' }}
          >
            <h2 style={{ display: 'inline-block', marginRight: 10 }}>Računarski centar</h2>
            <Tooltip title="Izaberite neku od ponuđenih opcija kako biste imali pregled svih podataka ili radili izmenu / brisanje.">
              <a style={{ fontSize: 20 }}>
                <Icon type="question-circle" />
              </a>
            </Tooltip>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/classrooms')
              }}
            >
              Učionice (⌥ + 1)
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
              Predmeti (⌥ + 2)
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/studies')
              }}
            >
              Smerovi (⌥ + 3)
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/software')
              }}
            >
              Softver (⌥ + 4)
            </Button>
            <Button
              type="primary"
              onClick={() => {
                this.props.history.push('/schedule')
              }}
            >
              Raspored po učionicama (⌥ + 5)
            </Button>
          </Col>
        </Row>
      </Hotkeys>
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
