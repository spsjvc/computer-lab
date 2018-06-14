import React, { Component } from 'react'
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
          textAlign: 'center',
          borderRadius: 4,
          color: 'white',
          opacity: isDragging ? 0.5 : 1,
          cursor: 'move',
        }}
      >
        <div style={{ fontSize: 10 }}>{subject.id}</div>
        {subject.name}
        <br />
        <div style={{ fontSize: 10 }}>
          Termin od {parseInt(subject.minimumLength * 45, 10)} minuta
        </div>
      </div>
    )
  }
}

export default DragSource('test', source, collect)(Subject)
