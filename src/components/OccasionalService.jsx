import React from 'react';
import { Card } from 'react-bootstrap';

const OccasionalService = () => (
  <Card>
    <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5><i className="bi bi-calendar-event"></i> Occasional Service Request</h5>
        </div>

          <p className="text-muted mb-4">
          Book special services for festivals, weddings, parties and more.
          </p>

          <form>
          <div className="mb-3">
              <label className="form-label fw-semibold">Occasion Type</label>
              <select className="form-select">
              <option value="">Select Occasion</option>
              <option>Wedding</option>
              <option>Festival</option>
              <option>Birthday</option>
              <option>House Party</option>
              <option>Other</option>
              </select>
          </div>

          <div className="row">
              <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Preferred Date</label>
              <input type="date" className="form-control" />
              </div>
              <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Preferred Time Slot</label>
              <select className="form-select">
                  <option value="">Select Time</option>
                  <option value="8am-10am">8am - 10am</option>
                  <option value="10am-12pm">10am - 12pm</option>
                  <option value="12pm-2pm">12pm - 2pm</option>
                  <option value="2pm-4pm">2pm - 4pm</option>
                  <option value="4pm-6pm">4pm - 6pm</option>
              </select>
              </div>
          </div>

          <div className="mb-3">
              <label className="form-label fw-semibold">Additional Notes</label>
              <textarea className="form-control" rows="3" placeholder="Any specific instructions or requests?" />
          </div>

          <div className="text-end">
              <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   type="submit" className="btn btn-primary px-4">
              Request Service
              </button>
          </div>
          </form>
    </Card.Body>
</Card>
);

export default OccasionalService;
