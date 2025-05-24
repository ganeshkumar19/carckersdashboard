import React from 'react';
import { Row, Col } from 'react-bootstrap';
import '../assets/styles/orderboxstyles.css'


const formatDate = (date) => {
    if (!date) return 'N/A';  // Handle missing dates
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString();  // Convert to a readable date format
};

// Format the time to a readable format in the local time zone
const formatTime = (date) => {
    if (!date) return 'N/A';  // Handle missing times
    const dateObj = new Date(date);
    return dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });  // 12-hour format without seconds
};



const OrderBox = ({ order }) => {
    const { orderId, userName, userAddress, userMobile, cartTotal, items, createdAt } = order;

    return (
        <Row className="orderInformationContainer justify-content-center align-items-center my-2">
            <Row className="m-0 p-0 d-flex flex-column flex-md-row align-items-center justify-content-center odRow my-2">
                <Col
                    xs={12}
                    md={6}
                    className="d-flex align-items-center justify-content-between text-center flex-md-column align-items-md-start text-md-start py-2 m-0 p-0"
                >
                    <p className="m-0 p-0 orderInfoText">
                        <span className="spanInfoText">Order Id: </span>
                        {orderId}
                    </p>
                    <p className="m-0 p-0 orderInfoText">
                        <span className="spanInfoText">UserName: </span>
                        {userName}
                    </p>
                </Col>
                <Col
                    xs={12}
                    md={6}
                    className="d-flex flex-column align-items-center justify-content-between text-center flex-md-column align-items-md-end text-md-end py-2 m-0 p-0"
                >
                    <p className="m-0 p-0 orderInfoText">
                        <span className="spanInfoText">Address: </span>
                        {userAddress}
                    </p>
                    <p className="m-0 p-0 orderInfoText">
                        <span className="spanInfoText">Mobile: </span>
                        {userMobile}
                    </p>
                </Col>
                <Row className="m-0 p-0 d-flex justify-content-between align-items-center py-2 m-0 p-0">
                <Col xs={6} className="text-start m-0 p-0">
                    <p className="m-0 p-0 orderInfoText">
                        <span className="spanInfoText">Date: </span>
                        {formatDate(createdAt)}
                    </p> {/* Display formatted date */}
                </Col>
                <Col xs={6} className="text-end m-0 p-0">
                    <p className="m-0 p-0 orderInfoText">
                        <span className="spanInfoText">Time: </span>
                        {formatTime(createdAt)}
                    </p> {/* Display formatted time */}
                </Col>
            </Row>
            </Row>

            {/* Map over the items in each order */}
            {items.map((item, index) => (
                <Row
                    className="m-0 p-0 mb-3"
                    key={item.id || index}  // Using 'id' from item or fallback to index
                    style={{ borderBottom: '2px solid #000', padding: '2px 0' }}
                >
                    <Col xs={10} className="m-0 p-0">
                        <h6 className="pcName">{item.name}</h6>
                        <p className="pcSizeQty">
                            Qty: {item.quantity}
                        </p>
                    </Col>
                    <Col xs={2} className="text-end m-0 p-0">
                        <h6 className="pcPrice">₹{item.discountPrice}</h6>
                    </Col>
                </Row>
            ))}

            {/* Conditionally display shipping charges if cartTotal is less than 3000 */}
            {cartTotal < 3000 && (
                <Row className="m-0 p-0 mb-3">
                    <Col xs={10} className="m-0 p-0">
                        <h6 className="pcName">Shipping Charges</h6>
                    </Col>
                    <Col xs={2} className="text-end m-0 p-0">
                        <h6 className="pcPrice">₹100</h6>
                    </Col>
                </Row>
            )}

            {/* Display Cart Total */}
            <Row className="m-0 p-0 mb-3">
                <Col xs={10} className="m-0 p-0">
                    <h6 className="pcName">Total</h6>
                </Col>
                <Col xs={2} className="text-end m-0 p-0">
                    <h6 className="pcPrice">₹{cartTotal}</h6>
                </Col>
            </Row>
        </Row>
    );
};

export default OrderBox;
