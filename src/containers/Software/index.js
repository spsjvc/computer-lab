import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'
import { Row, Col, Table, Button, Icon, Popconfirm, Tooltip } from 'antd'
import { sortBy, uniq, truncate } from 'lodash'
import Hotkeys from 'react-hot-keys'

import * as actions from './actions'
import { Input } from '../../components'

class Software extends Component {
  state = {
    displayedData: this.props.software,
    search: '',
  }

  onKeyUp = (keyName, e, handle) => {
    switch (keyName) {
      case 'alt+1':
        this.props.history.push('/')
        break
      case 'alt+2':
        this.props.history.push('/add-software')
        break
      default:
        break
    }
  }

  handleFilters = filters => {
    this.setState({
      displayedData: this.props.software.filter(software => {
        let passesFilter = true

        Object.entries(filters).forEach(([key, values]) => {
          if (values.length === 0) {
            return
          }

          if (!values.includes(`${software[key]}`)) {
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
            <h2 style={{ display: 'inline-block', marginRight: 10 }}>Softver</h2>
            <Tooltip
              title={
                <div>
                  Filtrirajte podatke po osobinama klikom na <Icon type="filter" />.<br />
                  <br /> Izmenite ili obrišite podatke klikom na <Icon type="edit" /> i{' '}
                  <Icon type="delete" />.
                </div>
              }
            >
              <a style={{ fontSize: 20 }}>
                <Icon type="question-circle" />
              </a>
            </Tooltip>
            <br />
            <Button
              type="primary"
              style={{ marginBottom: '20px' }}
              onClick={() => {
                this.props.history.push('/add-software')
              }}
            >
              <Icon type="plus-circle-o" />
              Dodaj novi softver (⌥ + 2)
            </Button>
            <br />
            <Input
              prefix={<Icon type="search" />}
              placeholder="Pretražite softver po nazivu"
              onChange={value => {
                this.setState(
                  {
                    search: value,
                  },
                  () => {
                    this.setState({
                      displayedData:
                        this.state.search === ''
                          ? this.props.software
                          : this.props.software.filter(s =>
                              s.name.toLowerCase().includes(this.state.search)
                            ),
                    })
                  }
                )
              }}
            />
            <Table
              size="small"
              dataSource={sortBy(this.state.displayedData, s => s.id).map(software => ({
                ...software,
                key: software.id,
              }))}
              locale={{ filterConfirm: 'OK', filterReset: 'Poništi', emptyText: 'Nema podataka' }}
              onChange={(pagination, filters, sorter) => {
                this.handleFilters(filters)
              }}
            >
              <Table.Column title="Oznaka" dataIndex="id" render={id => truncate(id)} />
              <Table.Column title="Naziv" dataIndex="name" render={name => truncate(name)} />
              <Table.Column
                title="Operativni sistem"
                dataIndex="operatingSystem"
                filters={['Windows', 'Linux', 'Cross-platform'].map(os => ({
                  text: os,
                  value: os,
                }))}
              />
              <Table.Column
                title="Proizvođač"
                dataIndex="manufacturer"
                filters={uniq(this.props.software.map(s => s.manufacturer)).map(s => ({
                  text: s,
                  value: s,
                }))}
                render={manufacturer => truncate(manufacturer)}
              />
              <Table.Column
                title="Vebsajt"
                dataIndex="website"
                render={website => (
                  <a target="_blank" href={website}>
                    {truncate(website)}
                  </a>
                )}
              />
              <Table.Column
                title="Godina izdanja"
                dataIndex="year"
                filters={uniq(this.props.software.map(s => s.year)).map(s => ({
                  text: s,
                  value: s,
                }))}
              />
              <Table.Column title="Cena (RSD)" dataIndex="price" />
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
                        this.props.setEditingSoftware(row)
                        this.props.history.push('/edit-software')
                      }}
                    >
                      <Icon type="edit" />
                    </Button>
                    <Popconfirm
                      title={
                        <div>
                          Da li ste sigurni da želite da obrišete ovaj softver?<br />Softver će biti
                          uklonjen sa svih predmeta i učionica.
                        </div>
                      }
                      okText="Da, obriši softver"
                      cancelText="Ne, zadrži softver"
                      onConfirm={() => {
                        this.props.deleteSoftware(row.id)

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
  software: state.software,
})

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch)

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Software)
)
