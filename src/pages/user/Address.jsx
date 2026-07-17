import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAddresses, deleteAddress } from "../../api/addressApi";
import { placeOrder } from "../../api/orderApi";

function Address() {

  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);


  useEffect(() => {
    loadAddresses();
  }, []);


  const loadAddresses = async () => {
    try {
      const data = await getAddresses();
      setAddresses(data);
    } catch (error) {
      console.error(error);
    }
  };


  const handleDelete = async (id) => {

    if (!window.confirm("Delete this address?")) return;

    try {

      await deleteAddress(id);

      if(selectedAddress?.id === id){
        setSelectedAddress(null);
      }

      loadAddresses();

    } catch(error){

      console.error(error);
      alert("Failed to delete address");

    }

  };


  const handleEdit = (address) => {

    navigate("/add-address",{
      state:{
        address
      }
    });

  };


  const handlePlaceOrder = async () => {

    if(!selectedAddress){

      alert("Please select delivery address");
      return;

    }


    try{

      await placeOrder(selectedAddress.id);

      alert("Order placed successfully");

      navigate("/orders");


    }catch(error){

      console.error(error);
      alert("Failed to place order");

    }

  };


  return (

    <div className="container mx-auto max-w-4xl py-8">


      <h2 className="text-3xl font-bold mb-6">
        Delivery Address
      </h2>



      {
        addresses.length === 0 ?

        (
          <div className="bg-gray-100 border rounded p-4">

            No address found.

          </div>
        )

        :

        (

          addresses.map((address)=>(


            <div
              key={address.id}
              className={`border rounded-lg p-4 mb-4 transition
              
              ${
                selectedAddress?.id === address.id
                ?
                "border-blue-600 bg-blue-50"
                :
                ""
              }

              `}
            >


              <div className="flex gap-3">


                <input

                  type="radio"

                  checked={
                    selectedAddress?.id === address.id
                  }

                  onChange={()=>
                    setSelectedAddress(address)
                  }

                />



                <div className="flex-1">


                  <h4 className="font-bold text-lg">

                    {address.fullName}

                  </h4>



                  <p>
                    {address.phone}
                  </p>


                  <p>
                    {address.addressLine}
                  </p>


                  <p>
                    {address.city}, {address.state}
                  </p>


                  <p>
                    {address.country} - {address.pincode}
                  </p>




                  <div className="mt-3 flex gap-3">


                    <button

                      onClick={()=>
                        handleEdit(address)
                      }

                      className="bg-yellow-500 text-white px-3 py-1 rounded"

                    >

                      Edit

                    </button>



                    <button

                      onClick={()=>
                        handleDelete(address.id)
                      }

                      className="bg-red-600 text-white px-3 py-1 rounded"

                    >

                      Delete

                    </button>



                  </div>


                </div>


              </div>


            </div>


          ))

        )

      }




      <button

        onClick={()=>
          navigate("/add-address")
        }

        className="bg-blue-600 text-white px-5 py-2 rounded mt-4"

      >

        + Add New Address

      </button>





      {/* Place Order Button */}

      <div className="mt-6">


        <button

          onClick={handlePlaceOrder}

          disabled={!selectedAddress}

          className="
          bg-green-600 
          text-white 
          px-6 
          py-3 
          rounded
          disabled:bg-gray-400
          "

        >

          Place Order

        </button>


      </div>




    </div>

  );

}


export default Address;