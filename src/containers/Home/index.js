import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Icon, Tooltip, message } from 'antd'
import Hotkeys from 'react-hot-keys'

import { Tutorial } from '..'
import * as actions from './actions'
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
        <Tutorial
          onCancel={() => {
            this.props.setIsTutorialVisible(false)
            setTimeout(() => {
              this.props.setTutorialStep(0)
            }, 500)
          }}
          onNext={() => {
            this.props.setTutorialStep(this.props.tutorialStep + 1)
          }}
          isVisible={this.props.isTutorialVisible}
          step={this.props.tutorialStep}
        />
        <Row style={{ paddingTop: '55px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '16', offset: '4' }}
            md={{ span: '12', offset: '6' }}
            lg={{ span: '6', offset: '1' }}
          >
            <h2 style={{ display: 'inline-block', marginRight: 10 }}>Računarski centar</h2>
            <Tooltip
              title={
                <div>
                  Izaberite neku od ponuđenih opcija kako biste imali pregled svih podataka ili
                  radili izmenu / brisanje.<br />
                  <br />Za ponovni prikaz tutorijala kliknite na znak pitanja u donjem desnom uglu.
                </div>
              }
            >
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
          <a
            style={{ position: 'fixed', bottom: 30, right: 70, fontSize: 30 }}
            onClick={() => {
              this.props.setIsTutorialVisible(true)
            }}
          >
            <Icon type="question-circle-o" />
          </a>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
  tutorialStep: state.tutorialStep,
  isTutorialVisible: state.isTutorialVisible,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
)
