import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { addAddress, updateAddress } from "../../api/addressApi";


function AddAddress(){

    const navigate = useNavigate();
    const location = useLocation();

    const editAddress = location.state?.address;


    const [formData,setFormData] = useState({
        fullName:"",
        phone:"",
        addressLine:"",
        city:"",
        state:"",
        country:"",
        pincode:""
    });


    useEffect(()=>{

        if(editAddress){
            setFormData(editAddress);
        }

    },[]);



    const handleChange=(e)=>{

        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });

    };



    const handleSubmit=async(e)=>{

        e.preventDefault();

        if(editAddress){

            await updateAddress(
                editAddress.id,
                formData
            );

            alert("Address updated");

        }
        else{

            await addAddress(formData);

            alert("Address added");

        }


        navigate("/address");

    };



    return(

        <div className="max-w-xl mx-auto py-8">

            <h2 className="text-3xl font-bold mb-5">
                {editAddress ? "Edit Address":"Add Address"}
            </h2>


            <form onSubmit={handleSubmit} className="space-y-3">


            {
            Object.keys(formData).map((key)=>(

                <input
                    key={key}
                    name={key}
                    value={formData[key]}
                    onChange={handleChange}
                    placeholder={key}
                    className="border p-3 w-full rounded"
                />

            ))
            }


            <button
              className="bg-blue-600 text-white px-5 py-2 rounded"
            >
                Save
            </button>


            </form>

        </div>

    );

}


export default AddAddress;