import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Button, Icon, Popconfirm } from 'antd'
import { uniq, truncate } from 'lodash'

import * as actions from './actions'
import { Input } from '../../components'

class Studies extends Component {
  state = {
    displayedData: this.props.studies,
    search: '',
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
      <Fragment>
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
              <Icon type="arrow-left" /> Nazad
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
              Dodaj novi smer
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
              dataSource={this.state.displayedData.map(study => ({
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
                        this.props.deleteStudy(row.id)
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
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  studies: state.studies,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Studies)
)
