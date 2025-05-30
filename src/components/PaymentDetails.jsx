import React from 'react';
import { Card, Button } from 'react-bootstrap';

const PaymentDetails = () => (
  <Card>
    <Card.Body>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5><i className="bi bi-credit-card me-2"></i> Payment Details</h5>
      </div>

      <div className="row g-3 mb-3">
        <div className="col-12 col-md-6">
          <div className="border rounded p-3 bg-light">
            <h6 className="fw-semibold mb-2">Saved Payment Method</h6>
            <div className="d-flex align-items-center justify-content-between flex-wrap">
              <div className="mb-2 mb-md-0">
                <div className="fw-bold">VISA **** 1234</div>
                <small className="text-muted">Expires: 08/26</small>
              </div>
              <button className="btn btn-sm btn-outline-danger">Remove</button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="border rounded p-3 bg-light">
            <h6 className="fw-semibold mb-2">Add New Card</h6>
            <form>
              <input 
                type="text" 
                className="form-control mb-2" 
                placeholder="Card Number" 
                aria-label="Card Number"
              />
              <div className="d-flex gap-2 mb-2 flex-wrap">
                <input 
                  type="text" 
                  className="form-control flex-grow-1 min-w-50" 
                  placeholder="MM/YY" 
                  aria-label="Expiration Date"
                />
                <input 
                  type="text" 
                  className="form-control flex-grow-1 min-w-50" 
                  placeholder="CVV" 
                  aria-label="CVV"
                />
              </div>
              <button 
                style={{ backgroundColor: '#0a3758', color: '#fff' }} 
                className="btn btn-primary btn-sm w-100"
                type="submit"
              >
                Save Card
              </button>
            </form>
          </div>
        </div>
      </div>

      <hr />

      <div className="mt-4">
        <h6 className="fw-semibold mb-2">Transaction History</h6>
        <div className="table-responsive">
          <table className="table table-bordered table-sm mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>001</td>
                <td>24 May 2025</td>
                <td>₹500</td>
                <td>Credit Card</td>
                <td><span className="badge bg-success">Paid</span></td>
              </tr>
              <tr>
                <td>002</td>
                <td>22 May 2025</td>
                <td>₹250</td>
                <td>UPI</td>
                <td><span className="badge bg-success">Paid</span></td>
              </tr>
              <tr>
                <td>003</td>
                <td>19 May 2025</td>
                <td>₹300</td>
                <td>Cash</td>
                <td><span className="badge bg-secondary">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Card.Body>
  </Card>
);

export default PaymentDetails;
