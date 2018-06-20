import React, { Component, Fragment } from 'react'
import { Modal, Button } from 'antd'

const steps = [
  {
    image: 'create.gif',
    description: 'Jednostavno kreirajte podatke...',
  },
  {
    image: 'edit-and-delete.gif',
    description: '...ili ih menjajte i brišite.',
  },
  {
    image: 'schedule.gif',
    description: 'Kreirajte raspored prevlačenjem predmeta na odgovarajuće termine.',
  },
  {
    image: 'shortcuts.gif',
    description: 'Koristite sistem prečica za bržu navigaciju po aplikaciji.',
  },
  {
    description:
      'Spremni ste za korišćenje aplikacije računarskog centra! Možete u svakom trenutku ponovo pogledati ovaj tutorijal klikom na znak pitanja u donjem desnom uglu na početnoj stranici.',
  },
]

class Tutorial extends Component {
  handleClick = () => {}

  render() {
    const { onCancel, onNext, isVisible, step } = this.props

    return (
      <Modal
        width="700px"
        title="Računarski centar"
        closable={false}
        visible={isVisible}
        footer={
          <Fragment>
            {step === steps.length - 1 ? null : <Button onClick={onCancel}>Ugasi tutorijal</Button>}
            <Button
              onClick={() => {
                step === steps.length - 1 ? onCancel() : onNext()
              }}
              type="primary"
            >
              {step === steps.length - 1 ? 'Završi tutorijal' : 'Sledeći korak'}
            </Button>
          </Fragment>
        }
      >
        <div style={{ textAlign: 'center' }}>
          {step === steps.length - 1 ? null : (
            <Fragment>
              <img
                alt={steps[step].image}
                style={{ width: '600px', border: '1px solid darkgrey', borderRadius: 5 }}
                src={steps[step].image}
              />
              <br />
              <br />
            </Fragment>
          )}
          <h4>{steps[step].description}</h4>
        </div>
      </Modal>
    )
  }
}

export default Tutorial
