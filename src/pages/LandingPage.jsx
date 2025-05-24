import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { getAccessToken } from "../../firebaseConfig";
import { Container,Row, Col } from 'react-bootstrap';
import OrderBox from '../components/OrderBox';

const LandingPage = () => {
    const [orders, setOrders] = useState([]);  // State to store orders
    const [loading, setLoading] = useState(true);  // State to track loading status
    const [error, setError] = useState(null);  // State to track error status

    const fetchCartData = async () => {
        try {
            const accessToken = await getAccessToken();
            console.log("Access Token:", accessToken);

            const response = await axios.get(`https://us-central1-splashpyro-115e8.cloudfunctions.net/api/carts`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,  // Pass the token in the Authorization header
                },
            });

            let apiData = response.data;
            console.log('API data:', apiData);

            // Sort the orders by orderId in descending order
            apiData = apiData.sort((a, b) => b.orderId - a.orderId);

            setOrders(apiData);  // Set the sorted orders to state
            setLoading(false);  // Set loading to false after data is loaded
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('There was an issue fetching your orders. Please refresh the page and try again.');
            setLoading(false);  // Set loading to false even if there is an error
        }
    };

    useEffect(() => {
        fetchCartData(); // Initial fetch
    }, []);

    return (
        <Container fluid>
            <Row className='justify-content-center my-5'>
                <Col xs={12} className='d-flex justify-content-center align-items-center'>
                    <p className='m-0 p-0 LodText'>List Of Orders</p>
                </Col>
            </Row>

            {loading && (
                <Row className='justify-content-center my-5'>
                    <Col xs={12} className='d-flex justify-content-center align-items-center'>
                        <p className='m-0 p-0 sucessText'>Your orders are loading, please wait...</p>
                    </Col>
                </Row>
            )}

            {error && (
                 <Row className='justify-content-center my-5'>
                    <Col xs={12} className='d-flex justify-content-center align-items-center'>
                        <p className='errorText'>{error}</p>
                    </Col>
                </Row>
            )}

            {!loading && !error && orders.length === 0 && (
                <Row className='justify-content-center my-5'>
                    <Col xs={12} className='d-flex justify-content-center align-items-center'>
                        <p className='m-0 p-0 noOrdersText'>No Orders Placed Yet</p>
                    </Col>
                </Row>
            )}

            {!loading && !error && orders.length > 0 && (
                <>
                    {/* Map over the orders and pass them to OrderBox */}
                    {orders.map((order) => (
                        <Row key={order.orderId} className="justify-content-center my-4">
                            <OrderBox order={order} />
                        </Row>
                    ))}
                </>
            )}
        </Container>
    );
};

export default LandingPage;

