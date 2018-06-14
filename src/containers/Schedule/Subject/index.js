import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { DragSource } from 'react-dnd'

const source = {
  beginDrag: props => ({
    subjectId: props.subject.id,
    length: parseInt(props.subject.minimumLength, 10),
  }),
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
})

class Subject extends Component {
  render() {
    const { connectDragSource, isDragging, subject } = this.props

    return connectDragSource(
      <div
        style={{
          background: subject.color,
          margin: 5,
          padding: 10,
          borderRadius: 4,
          color: 'white',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
      >
        <div style={{ fontSize: 12 }}>
          <strong>{subject.name}</strong>
          <br />
          Trajanje: {parseInt(subject.minimumLength * 45, 10)} minuta
          <br />
          <br />
          Smer: {this.props.studies.find(s => s.id == subject.study).name}
          <br />
          Veličina grupe: {subject.groupSize}
          <br />
          Projektor: {subject.needsProjector ? 'Da' : 'Ne'}
          <br />
          Tabla: {subject.board ? 'Da' : 'Ne'}
          <br />
          Pametna tabla: {subject.smartBoard ? 'Da' : 'Ne'}
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
})

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)

export default DragSource('test', source, collect)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Subject)
)
