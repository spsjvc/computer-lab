import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import { Row, Col, List, Tabs, Tooltip, Icon } from 'antd'
import moment from 'moment'
import { sortBy } from 'lodash'

import * as actions from './actions'

import Subject from './Subject'
import TimetableField from './TimetableField'

const workingDays = [
  { label: 'Ponedeljak', value: 'monday' },
  { label: 'Utorak', value: 'tuesday' },
  { label: 'Sreda', value: 'wednesday' },
  { label: 'Četvrtak', value: 'thursday' },
  { label: 'Petak', value: 'friday' },
  { label: 'Subota', value: 'saturday' },
]

const startMoment = moment('2018-01-01 07:00')
const endMoment = moment('2018-01-01 22')
const duration = moment.duration(endMoment.diff(startMoment))

class Schedule extends Component {
  render() {
    const distanceBetweenMoments = 15
    const minutesDuration = duration.asMinutes() / distanceBetweenMoments

    return (
      <React.Fragment>
        <Row style={{ paddingTop: '40px' }}>
          <Col
            xs={{ span: '3', offset: '1' }}
            sm={{ span: '3', offset: '1' }}
            md={{ span: '3', offset: '1' }}
            lg={{ span: '3', offset: '1' }}
          >
            <div style={{ fontSize: 12 }}>
              Predmeti za raspoređivanje:<br />
              <br />
            </div>
            <div style={{ height: 'calc(100vh - 120px)', overflow: 'auto' }}>
              <List
                dataSource={sortBy(this.props.subjects, subject => subject.id)}
                renderItem={subject =>
                  [...Array(subject.numberOfTermsRemaining).keys()].map(term => (
                    <Subject subject={subject} />
                  ))
                }
              />
            </div>
          </Col>
          <Col
            xs={{ span: '18', offset: '1' }}
            sm={{ span: '18', offset: '1' }}
            md={{ span: '18', offset: '1' }}
            lg={{ span: '18', offset: '1' }}
          >
            <Tabs
              type="card"
              onChange={value => {
                this.props.selectClassroom(value)
              }}
            >
              {sortBy(this.props.classrooms, classroom => classroom.id).map(classroom => (
                <Tabs.TabPane key={classroom.id} tab={`Učionica ${classroom.id}`}>
                  <React.Fragment>
                    <div
                      style={{
                        textAlign: 'center',
                        width: `${5}%`,
                        display: 'inline-block',
                      }}
                    >
                      <Tooltip
                        title={
                          <div>
                            <strong>Učionica {classroom.id}</strong>
                            <br />
                            <br />
                            Broj radnih mesta: {classroom.numberOfSeats}
                            <br />
                            Projektor: {classroom.hasProjector ? 'Da' : 'Ne'}
                            <br />
                            Tabla: {classroom.hasBoard ? 'Da' : 'Ne'}
                            <br />
                            Pametna tabla: {classroom.hasSmartBoard ? 'Da' : 'Ne'}
                            <br />
                            Operativni sistem:{' '}
                            {classroom.operatingSystems
                              .reduce((acc, os) => `${acc}${os}, `, '')
                              .slice(0, -2)}
                            <br />
                            Softver:{' '}
                            {classroom.software
                              .map(
                                s => this.props.software.find(software => s === software.id).name
                              )
                              .reduce((acc, software) => `${acc}${software}, `, '')
                              .slice(0, -2)}
                            <br />
                          </div>
                        }
                      >
                        <a style={{ fontSize: 20 }}>
                          <Icon type="info-circle" />
                        </a>
                      </Tooltip>
                      {[...Array(minutesDuration).keys()].map((minute, index) => (
                        <div
                          key={index}
                          style={{
                            margin: 1,
                            height: 11,
                            fontSize: 10,
                            textAlign: 'center',
                          }}
                        >
                          {moment('2018-01-01 07:00')
                            .add(minute * distanceBetweenMoments, 'minutes')
                            .format('HH:mm')}h
                        </div>
                      ))}
                    </div>

                    {workingDays.map((day, dayIndex) => (
                      <div key={dayIndex} style={{ width: `${95 / 6}%`, display: 'inline-block' }}>
                        <div style={{ textAlign: 'center', marginBottom: 10 }}>{day.label}</div>
                        {[...Array(minutesDuration).keys()].map((minute, index) => (
                          <TimetableField
                            key={`${dayIndex}-${index}`}
                            classroom={classroom}
                            x={dayIndex}
                            y={index}
                          />
                        ))}
                      </div>
                    ))}
                  </React.Fragment>
                </Tabs.TabPane>
              ))}
            </Tabs>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  classrooms: state.classrooms,
  software: state.software,
  subjects: state.subjects,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  DragDropContext(HTML5Backend)(
    connect(
      mapStateToProps,
      mapDispatchToProps
    )(Schedule)
  )
)
