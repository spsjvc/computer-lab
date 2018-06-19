import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Button, Icon, Popconfirm, message } from 'antd'
import { sortBy, uniq, truncate } from 'lodash'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input } from '../../components'

class Studies extends Component {
  state = {
    displayedData: this.props.studies,
    search: '',
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/')
        break
      case 'alt+2':
        this.props.history.push('/add-study')
        break
      default:
        break
    }
  }

  handleFilters = filters => {
    this.setState({
      displayedData: this.props.studies.filter(study => {
        let passesFilter = true

        Object.entries(filters).forEach(([key, values]) => {
          if (values.length === 0) {
            return
          }

          if (!values.includes(`${study[key]}`)) {
            passesFilter = false
          }
        })

        return passesFilter
      }),
    })
  }

  render() {
    return (
      <Hotkeys keyName="alt+1,alt+2" onKeyUp={this.onKeyUp}>
        <Row style={{ paddingTop: '20px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '22', offset: '1' }}
            md={{ span: '22', offset: '1' }}
            lg={{ span: '22', offset: '1' }}
          >
            <a
              onClick={e => {
                e.preventDefault()
                this.props.history.push('/')
              }}
            >
              <Icon type="arrow-left" /> Nazad (⌥ + 1)
            </a>
          </Col>
        </Row>
        <Row style={{ marginTop: '15px' }}>
          <Col
            xs={{ span: '22', offset: '1' }}
            sm={{ span: '22', offset: '1' }}
            md={{ span: '22', offset: '1' }}
            lg={{ span: '22', offset: '1' }}
          >
            <h2>Smerovi</h2>
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-study')
              }}
            >
              <Icon type="plus-circle-o" />
              Dodaj novi smer (⌥ + 2)
            </Button>
            <br />
            <Input
              prefix={<Icon type="search" />}
              placeholder="Pretražite smerove po nazivu"
              onChange={value => {
                this.setState(
                  {
                    search: value,
                  },
                  () => {
                    this.setState({
                      displayedData:
                        this.state.search === ''
                          ? this.props.studies
                          : this.props.studies.filter(s =>
                              s.name.toLowerCase().includes(this.state.search)
                            ),
                    })
                  }
                )
              }}
            />
            <Table
              size="small"
              locale={{ filterConfirm: 'OK', filterReset: 'Poništi', emptyText: 'Nema podataka' }}
              dataSource={sortBy(this.state.displayedData, s => s.id).map(study => ({
                ...study,
                key: study.id,
              }))}
              onChange={(pagination, filters, sorter) => {
                this.handleFilters(filters)
              }}
            >
              <Table.Column title="Oznaka" dataIndex="id" />
              <Table.Column title="Naziv" dataIndex="name" />
              <Table.Column
                title="Datum uvođenja"
                dataIndex="date"
                filters={uniq(this.props.studies.map(s => s.date)).map(s => ({
                  text: s,
                  value: s,
                }))}
              />
              <Table.Column
                title="Opis"
                dataIndex="description"
                render={description => truncate(description)}
              />
              <Table.Column
                title=""
                render={row => (
                  <Fragment>
                    <Button
                      style={{ marginRight: '5px' }}
                      onClick={() => {
                        this.props.setEditingStudy(row)
                        this.props.history.push('/edit-study')
                      }}
                    >
                      <Icon type="edit" />
                    </Button>
                    <Popconfirm
                      title="Da li ste sigurni da želite da obrišete ovaj smer?"
                      okText="Da, obriši smer"
                      cancelText="Ne, zadrži smer"
                      onConfirm={() => {
                        if (this.props.subjects.filter(s => s.study === row.id)) {
                          message.error(
                            'Nije moguće obrisati smer jer na njemu postoje predmeti. Obrišite ili izmenite predmete i pokušajte ponovo.'
                          )
                          return
                        }

                        this.props.deleteStudy(row.id)

                        this.setState({
                          displayedData: this.state.displayedData.filter(s => s.id !== row.id),
                        })
                      }}
                    >
                      <Button type="danger">
                        <Icon type="delete" />
                      </Button>
                    </Popconfirm>
                  </Fragment>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Hotkeys>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
  subjects: state.subjects,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Studies)
)
