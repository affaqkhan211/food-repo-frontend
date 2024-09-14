import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const FoodDetail = () => {
    const { id } = useParams(); // Get the food ID from the URL
    const [food, setFood] = useState(null);
    const [showModal, setShowModal] = useState(false); // State to toggle modal visibility
    const [updatedFood, setUpdatedFood] = useState({
        foodTitle: '',
        description: '',
        img: '',
        price: '',
        category: ''
    });


    useEffect(() => {
        const fetchFoodDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/foods/food-detail/${id}`);
                setFood(response.data);
                setUpdatedFood(response.data); // Set the updated food data with the fetched data
            } catch (error) {
                console.log(error);
            }
        };

        fetchFoodDetail();
    }, [id]);

    const navigate = useNavigate()
    // Function to handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedFood((prevFood) => ({
            ...prevFood,
            [name]: value
        }));
    };

    // Function to handle the update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/foods/update-food/${id}`, updatedFood);
            alert('Food item updated successfully');
            setShowModal(false); // Close modal after successful update
            navigate('/'); // Redirect to the home page or desired page
        } catch (error) {
            console.log(error);
        }
    };

    // Function to delete the food item
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this food item?')) {
            try {
                await axios.delete(`http://localhost:8000/api/foods/delete-food/${id}`);
                alert('Food item deleted successfully');
                navigate('/'); // Redirect to the home page after deletion
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {food && (
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <img src={food.img} alt={food.foodTitle} className="w-full h-96 object-cover" />
                    <div className="p-6">
                        <h1 className="text-3xl font-bold mb-4">{food.foodTitle}</h1>
                        <p className="text-gray-700 mb-4">{food.description}</p>
                        <p className="text-lg font-semibold text-blue-600 mb-2">Price: ${food.price}</p>
                        <p className="text-sm text-gray-500">Category: {food.category}</p>

                        {/* Buttons for Update and Delete */}
                        <div className="mt-6 flex space-x-4">
                            <button
                                onClick={() => setShowModal(true)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for Update */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Update Food Item</h2>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Title</label>
                                <input
                                    type="text"
                                    name="foodTitle"
                                    value={updatedFood.foodTitle}
                                    onChange={handleInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={updatedFood.description}
                                    onChange={handleInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                <input
                                    type="text"
                                    name="category"
                                    value={updatedFood.category}
                                    onChange={handleInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Image URL</label>
                                <input
                                    type="text"
                                    name="img"
                                    value={updatedFood.img}
                                    onChange={handleInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="mb-5">
                                <label className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    value={updatedFood.price}
                                    onChange={handleInputChange}
                                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                                    required
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FoodDetail;
