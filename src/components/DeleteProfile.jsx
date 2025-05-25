import React, { useState } from 'react';
import { Card, Modal, Button } from 'react-bootstrap';

const DeleteProfile = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteProfile = () => {
    // deletion logic here
    setShowDeleteModal(false);
  };

  return (
    <Card>
      <Card.Body>
      <h5> <i className="bi bi-trash-fill"></i> Delete Profiledfdsfsd</h5>

      <p className="text-muted">
          This action will permanently delete your profile and all associated data. This cannot be undone.
      </p>

      <div className="alert alert-warning">
          Please confirm that you want to delete your profile. We’re sorry to see you go!
      </div>

      <button className="btn btn-outline-danger" onClick={() => setShowDeleteModal(true)}>
          Delete My Profile
      </button>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
          <Modal.Header closeButton>
          <Modal.Title className="text-danger">Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <p>
              Are you absolutely sure you want to delete your profile? This action cannot be undone.
          </p>
          </Modal.Body>
          <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
              Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteProfile}>
              Yes, Delete
          </Button>
          </Modal.Footer>
      </Modal>
      </Card.Body>
  </Card>
  );
};

export default DeleteProfile;
