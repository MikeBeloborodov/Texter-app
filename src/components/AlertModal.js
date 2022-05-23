import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function AlertModal({showAlertModal, setAlertModal}) {
  
    function handleClose(){
      setAlertModal(oldValues => {
                        return {
                          ...oldValues,
                          "show": false
                        }
    })
    }
    return (
        <Modal show={showAlertModal.show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{showAlertModal.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{showAlertModal.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }