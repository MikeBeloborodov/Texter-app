import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function WrongPass({showWrongPassModal, setShowWrongPassModal, title, problem}) {
  
    const handleClose = () => setShowWrongPassModal(false)
  
    return (
        <Modal show={showWrongPassModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{problem}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
    )
  }