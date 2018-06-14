import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DropTarget } from 'react-dnd'
import { Tooltip } from 'antd'
import moment from 'moment'

import * as actions from '../actions'

const target = {
  canDrop: (props, monitor, component) => {
    const { x, y } = props
    const item = monitor.getItem()

    const classroom = props.classrooms.find(c => c.id === props.classroom.id)

    // if class is longer than available hours
    if (y + item.length * 3 > classroom.layout[0].length) {
      return false
    }

    // classes need to have a break between them
    if (y - 1 > 0 && classroom.layout[x][y - 1] !== 0) {
      return false
    }

    if (classroom.layout[x][y + item.length * 3] !== 0) {
      return classroom.layout[x][y + item.length * 3] === undefined
    }

    let canDropHere = true
    for (let i = y; i < y + item.length * 3; i++) {
      if (classroom.layout[x][i] !== 0) {
        canDropHere = false
        break
      }
    }

    return canDropHere
  },
  drop: (props, monitor, component) => {
    const item = monitor.getItem()

    props.occupyTerm({
      classroomId: props.classroom.id,
      subjectId: item.subjectId,
      length: item.length,
      coordinates: {
        x: props.x,
        y: props.y,
      },
    })
  },
}

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
})

const Rectangle = ({ classroom, x, y, isOver, canDrop, color, unoccupyTerm }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <div
      style={{
        cursor: classroom.layout[x][y] === 0 ? '' : 'help',
        background: classroom.layout[x][y] === 0 ? '#fafafa' : color,
        color: classroom.layout[x][y] === 0 ? '#fafafa' : 'white',
        margin: 1,
        borderRadius: 2,
        height: 10,
        fontSize: 8,
        paddingRight: 5,
        fontWeight: 'bold',
        textAlign: 'right',
      }}
    >
      {classroom.layout[x][y] === 0 ? (
        '-'
      ) : (
        <a
          style={{ fontSize: 8, color: '#f5222d' }}
          onClick={() => {
            unoccupyTerm({ x, y, classroomId: classroom.id })
          }}
        >
          X
        </a>
      )}
    </div>
    {isOver ? (
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '100%',
          zIndex: 1,
          opacity: 0.75,
          borderRadius: 2,
          backgroundColor: canDrop ? '#1890ff' : '#f5222d',
        }}
      />
    ) : null}
  </div>
)

class TimetableField extends Component {
  render() {
    const { x, y, connectDropTarget, isOver, canDrop, classroom, unoccupyTerm } = this.props

    const subjectId = classroom.layout[x][y]

    let subject
    if (subjectId !== 0) {
      subject = this.props.subjects.find(s => s.id === subjectId)
    }

    let termStartY = y
    while (classroom.layout[x][termStartY - 1] === subjectId) {
      termStartY--
    }

    let termEndY = y
    while (classroom.layout[x][termEndY + 1] === subjectId) {
      termEndY++
    }

    return connectDropTarget(
      classroom.layout[x][y] === 0 ? (
        <div>
          <Rectangle
            classroom={classroom}
            x={x}
            y={y}
            isOver={isOver}
            canDrop={canDrop}
            color={subject ? subject.color : null}
          />
        </div>
      ) : (
        <div>
          <Tooltip
            title={
              <div style={{ textAlign: 'center' }}>
                {subject.id}
                <br />
                {subject.name}
                <br />
                {moment('2018-01-01 07:00')
                  .add(termStartY * 15, 'minutes')
                  .format('HH:mm')}h -{' '}
                {moment('2018-01-01 07:00')
                  .add((termEndY + 1) * 15, 'minutes')
                  .format('HH:mm')}h
              </div>
            }
          >
            <div>
              <Rectangle
                unoccupyTerm={unoccupyTerm}
                classroom={classroom}
                x={x}
                y={y}
                isOver={isOver}
                canDrop={canDrop}
                color={subject ? subject.color : null}
              />
            </div>
          </Tooltip>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  subjects: state.subjects,
  classrooms: state.classrooms,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropTarget('test', target, collect)(TimetableField))
