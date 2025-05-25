import React from 'react';
import { Card } from 'react-bootstrap';

const AlterationService = () => (
   <Card>
      <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
          <h5><i className="bi bi-tools"></i> Alteration Service Request</h5>
          </div>
          
          <p className="text-muted mb-4">
          Request clothing alterations such as hemming, fitting, or repair.
          </p>

          <form>
          <div className="mb-3">
              <label className="form-label fw-semibold">Alteration Type</label>
              <select className="form-select">
              <option value="">Select Alteration</option>
              <option>Length Adjustment</option>
              <option>Sleeve Alteration</option>
              <option>Waist Fitting</option>
              <option>Button/Zipper Repair</option>
              <option>Patchwork</option>
              </select>
          </div>

          <div className="mb-3">
              <label className="form-label fw-semibold">Garment Type</label>
              <select className="form-select">
              <option value="">Select Garment</option>
              <option>Shirt</option>
              <option>Pants</option>
              <option>Dress</option>
              <option>Jacket</option>
              <option>Other</option>
              </select>
          </div>

          <div className="row">
              <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Preferred Pickup Date</label>
              <input type="date" className="form-control" />
              </div>
              <div className="mb-3 col-md-6">
              <label className="form-label fw-semibold">Preferred Time</label>
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
              <label className="form-label fw-semibold">Additional Instructions</label>
              <textarea className="form-control" rows="3" placeholder="Describe your alteration needs..." />
          </div>

          <div className="text-end">
              <button style={{ backgroundColor:  '#0a3758', color: '#fff' }}   type="submit" className="btn btn-primary px-4">
              Submit Request
              </button>
          </div>
          </form>
      </Card.Body>
    </Card>
);

export default AlterationService;
