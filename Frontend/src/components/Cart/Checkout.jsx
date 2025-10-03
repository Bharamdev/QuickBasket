import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/slices/checkoutSlice";

// const cart = {
//   products: [
//         {
//             name:"T-Shirt",
//             size:"M",
//             color:"Red",
//             price:150,
//             image:"https://picsum.photos/200?random=1",
//         },
//         {
//             name:"Jeans",
//             size:"L",
//             color:"Blue",
//             price:75,
//             image:"https://picsum.photos/200?random=2",
//         }
//     ],
//     totalPrice: 215,
// };




const Checkout = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {cart, loading, error} = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);

  const [checkoutId, setCheckoutId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [finalizeError, setFinalizeError] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [finalizing, setFinalizing] = useState(false);
  const [paying, setPaying] = useState(false);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address:"",
    city:"",
    postalCode:"",
    country:"",
    phone:"",
  });

  // Ensure cart is loaded before proceeding
  useEffect(() => {
    if(!cart || !cart.products || cart.products.length === 0){
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();
    // setCheckoutId(123);
    if(cart && cart.products.length > 0){
      const res = await dispatch(
        createCheckout({
        checkoutItems: cart.products,
        shippingAddress,
  paymentMethod: "Razorpay",
        totalPrice: cart.totalPrice,
        })
      );
      if(res.payload && res.payload._id){
        setCheckoutId(res.payload._id) // Set checkout ID if checkout was successful
      }
    }
  };   

  const handlePaymentSuccess= async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        { paymentStatus: "paid", paymentDetails: details},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      // Finalize checkout and get orderId
      const finalizeRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      if(finalizeRes.data && finalizeRes.data._id){
        setOrderId(finalizeRes.data._id);
      }
      navigate("/order-confirmation");
    } catch (error) {
      console.error(error);
    }
  };

  // const handleFinalizeCheckout = async(checkoutId) => {
  //   try {
  //     const response = await axios.post(
  //       `${
  //         import.meta.env.VITE_BACKEND.URL
  //       }/api/checkout/${checkoutId}/finalize`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("userToken")}`,
  //         },
  //       }
  //     );
  //     navigate("/oder-confirmation");

  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  if(loading) return <p>Loading cart ...</p>;
  if(error) return <p>Error: {error}</p>;
  if(!cart || !cart.products || cart.products.length===0){
    return <p>Your cart is empty</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter">
      {/* Left Section */}
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6">Checkout</h2>
        <form onSubmit={handleCreateCheckout} >
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" 
            value={user ? user.email : ""}
            className="w-full p-2 border rounded bg-gray-50"
            disabled
            />
          </div>
          <h3 className="text-lg mb-4">Delivery</h3>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="blcok text-gray-700">First Name</label>
              <input type="text" 
              value={shippingAddress.firstName}
              onChange={(e)=> 
              setShippingAddress({...shippingAddress,firstName: e.target.value})}
              className="w-full p-2 border rounded"
              required
              />
            </div>
            <div>
              <label className="blcok text-gray-700">Last Name</label>
              <input type="text" 
              value={shippingAddress.lastName}
              onChange={(e)=> 
              setShippingAddress({...shippingAddress,lastName: e.target.value})}
              className="w-full p-2 border rounded"
              required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Address</label>
            <input type="text" 
              value={shippingAddress.address}
              onChange={(e)=> 
              setShippingAddress({...shippingAddress,address: e.target.value})}
              className="w-full p-2 border rounded"
              required
              /> 
          </div>
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="blcok text-gray-700">City</label>
              <input type="text" 
              value={shippingAddress.city}
              onChange={(e)=> 
              setShippingAddress({...shippingAddress,city: e.target.value})}
              className="w-full p-2 border rounded"
              required
              />
            </div>
            <div>
              <label className="blcok text-gray-700">Postal Code</label>
              <input type="text" 
              value={shippingAddress.postalCode}
              onChange={(e)=> 
              setShippingAddress({...shippingAddress,postalCode: e.target.value})}
              className="w-full p-2 border rounded"
              required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Country</label>
            <input type="text" 
              value={shippingAddress.country}
              onChange={(e)=> 
              setShippingAddress({...shippingAddress,country: e.target.value})}
              className="w-full p-2 border rounded"
              required
              /> 
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Phone</label>
            <input type="tel" 
              value={shippingAddress.phone}
              onChange={(e)=> 
              setShippingAddress({...shippingAddress,phone: e.target.value})}
              className="w-full p-2 border rounded"
              required
              /> 
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button type="submit" className="w-full bg-black text-white py-3 rounded">
                  Continue to payment</button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Razorpay</h3>
                {finalizeError && (
                  <p className="text-red-600 mb-2">{finalizeError}</p>
                )}
                {paymentError && (
                  <p className="text-red-600 mb-2">{paymentError}</p>
                )}
                <button
                  type="button"
                  className={`w-full bg-blue-600 text-white py-3 rounded ${finalizing || paying ? 'opacity-50 cursor-not-allowed' : ''}`}
                  disabled={finalizing || paying}
                  onClick={async () => {
                    setFinalizeError("");
                    setPaymentError("");
                    setFinalizing(true);
                    let id = orderId;
                    try {
                      // Step 1: Mark checkout as paid if not already
                      const payRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`, {
                        method: 'PUT',
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ paymentStatus: "paid", paymentDetails: { method: "Razorpay" } })
                      });
                      const payData = await payRes.json();
                      if (!payRes.ok || !payData.isPaid) {
                        setFinalizeError(payData.message || "Failed to mark checkout as paid. Please try again.");
                        setFinalizing(false);
                        return;
                      }
                      // Step 2: Finalize checkout and get orderId
                      const finalizeRes = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`, {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
                          'Content-Type': 'application/json',
                        },
                      });
                      const finalizeData = await finalizeRes.json();
                      if (!finalizeRes.ok || !finalizeData._id) {
                        setFinalizeError(finalizeData.message || "Failed to finalize checkout. Please ensure you have paid and try again.");
                        setFinalizing(false);
                        return;
                      }
                      id = finalizeData._id;
                      setOrderId(id);
                    } catch (err) {
                      setFinalizeError("Error finalizing checkout. Please try again.");
                      setFinalizing(false);
                      return;
                    }
                    setFinalizing(false);
                    // Debug log for orderId
                    console.log('Order ID for payment:', id);
                    // Validate orderId before payment API call
                    if (!id || typeof id !== 'string' || id.length !== 24) {
                      setPaymentError("Order ID is invalid. Cannot initiate payment.");
                      return;
                    }
                    setPaying(true);
                    try {
                      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/payment/${id}`, {
                        method: 'POST',
                        headers: {
                          'Authorization': `Bearer ${localStorage.getItem("userToken")}`,
                          'Content-Type': 'application/json',
                        },
                      });
                      const data = await response.json();
                      if (response.ok && data.payment_link_url) {
                        window.location.href = data.payment_link_url;
                      } else {
                        setPaymentError(data.message || "Failed to create payment link. Please try again.");
                      }
                    } catch (err) {
                      setPaymentError("Payment initiation failed. Please try again.");
                    }
                    setPaying(false);
                  }}
                >{finalizing ? "Finalizing..." : paying ? "Redirecting..." : "Pay Now"}</button>
              </div>
            )}
          </div>
        </form>
      </div>
      {/* Right Section */}
      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4">
          {cart.products.map((product, index) => (
            <div
            key={index} 
            className="flex items-start justify-between py-2 border-b">
              <div className="flex items-start">
                <img src={product.image} alt={product.name} 
                className="w-20 h-24 object-cover mr-4"/>
                <div>
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500">Size:{product.size}</p>
                  <p className="text-gray-500">Color: {product.color}</p>
                </div>
              </div>
              <p className="text-xl">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center text-lg mb-4">
          <p>subtotal</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className="flex justify-between items-center text-lg">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between items-center text-lg mt-4 border-t pt-4">
          <p>Total</p>
          <p>${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

export default Checkout
