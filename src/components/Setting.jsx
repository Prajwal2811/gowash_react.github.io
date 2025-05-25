import React from 'react';
import { Card } from 'react-bootstrap';

const Setting = () => (
  <Card>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
      <h5>
        <i className="bi bi-gear-fill"></i> Setting
      </h5>
    </div>
    {/* Password Change */}
    <div className="mb-4">
        <h6 className="fw-semibold mb-3">Change Password</h6>
        <form className="row g-3">
        <div className="col-md-4">
            <input type="password" className="form-control" placeholder="Current Password" />
        </div>
        <div className="col-md-4">
            <input type="password" className="form-control" placeholder="New Password" />
        </div>
        <div className="col-md-4">
            <input type="password" className="form-control" placeholder="Confirm Password" />
        </div>
        <div className="col-12">
            <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   className="btn btn-warning mt-2">Update Password</button>
        </div>
        </form>
    </div>

    <hr />

    {/* Notification Preferences */}
    <div>
        <h6 className="fw-semibold mb-3">Notification Preferences</h6>
        <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" id="emailNoti" defaultChecked />
        <label className="form-check-label" htmlFor="emailNoti">
            Receive email notifications
        </label>
        </div>
        <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" id="smsNoti" />
        <label className="form-check-label" htmlFor="smsNoti">
            Receive SMS updates
        </label>
        </div>
        <div className="form-check mb-2">
        <input className="form-check-input" type="checkbox" id="promoNoti" defaultChecked />
        <label className="form-check-label" htmlFor="promoNoti">
            Get promotional offers
        </label>
        </div>
        <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   className="btn btn-success mt-2">Save Preferences</button>
    </div>
    </Card.Body>
</Card>
);

export default Setting;
