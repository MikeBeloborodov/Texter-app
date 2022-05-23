import React from 'react'
import { Button, Modal } from 'react-bootstrap'

export default function ProblemModal({showProblemModal, setProblemModal, title, problem}) {
  
    const handleClose = () => setProblemModal(false)
  
    return (
        <Modal show={showProblemModal} onHide={handleClose}>
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