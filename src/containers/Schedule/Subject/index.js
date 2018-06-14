import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DragSource } from 'react-dnd'

const source = {
  canDrag: props => {
    const { selectedClassroom, subject } = props

    const classroom = props.classrooms.find(c => c.id === selectedClassroom)

    if (subject.needsProjector && !classroom.hasProjector) {
      return false
    }

    if (subject.needsBoard && !classroom.hasBoard) {
      return false
    }

    if (subject.needsSmartBoard && !classroom.hasSmartBoard) {
      return false
    }

    if (parseInt(subject.groupSize, 10) > parseInt(classroom.numberOfSeats, 10)) {
      return false
    }

    if (subject.operatingSystem === 'Windows' && !classroom.operatingSystems.includes('Windows')) {
      return false
    }

    if (subject.operatingSystem === 'Linux' && !classroom.operatingSystems.includes('Linux')) {
      return false
    }

    let hasAllNeededSoftware = true
    for (let i = 0; i < subject.software.length; i++) {
      if (!classroom.software.includes(subject.software[i])) {
        hasAllNeededSoftware = false
        break
      }
    }

    return hasAllNeededSoftware
  },
  beginDrag: props => ({
    subjectId: props.subject.id,
    length: parseInt(props.subject.minimumLength, 10),
  }),
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  canDrag: monitor.canDrag(),
})

class Subject extends Component {
  render() {
    const { connectDragSource, isDragging, canDrag, subject } = this.props

    return connectDragSource(
      <div
        style={{
          cursor: isDragging ? 'move' : canDrag ? 'move' : 'not-allowed',
          background: subject.color,
          margin: 5,
          padding: 10,
          borderRadius: 4,
          color: 'white',
          opacity: isDragging ? 0.5 : canDrag ? 1 : 0.25,
        }}
      >
        <div style={{ fontSize: 12 }}>
          <strong>{subject.name}</strong>
          <br />
          Trajanje: {parseInt(subject.minimumLength * 45, 10)} minuta
          <br />
          <br />
          Smer: {this.props.studies.find(s => s.id === subject.study).name}
          <br />
          Veličina grupe: {subject.groupSize}
          <br />
          Projektor: {subject.needsProjector ? 'Da' : 'Ne'}
          <br />
          Tabla: {subject.needsBoard ? 'Da' : 'Ne'}
          <br />
          Pametna tabla: {subject.needsSmartBoard ? 'Da' : 'Ne'}
          <br />
          Operativni sistem: {subject.operatingSystem}
          <br />
          Softver:{' '}
          {subject.software
            .map(s => this.props.software.find(software => s === software.id).name)
            .reduce((acc, software) => `${acc}${software}, `, '')
            .slice(0, -2)}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
  software: state.software,
  classrooms: state.classrooms,
  selectedClassroom: state.selectedClassroom,
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DragSource('test', source, collect)(Subject))
