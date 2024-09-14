import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
//import ScrollToTopButton from './ScrollToTopButton'; // Import the ScrollToTopButton
import ScrollToTopButton from '../components/ScrollToTopButton';

const Home = () => {
    const [foods, setFoods] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredFoods, setFilteredFoods] = useState([]);

    // Fetch food items from the API
    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/foods/get-food');
                setFoods(response.data);
                setFilteredFoods(response.data); // Set filtered foods initially to all foods
            } catch (error) {
                console.error('Error fetching food items:', error);
            }
        };

        fetchFoods();
    }, []);

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Filter foods based on search query
        if (query === '') {
            setFilteredFoods(foods);
        } else {
            const filtered = foods.filter(food =>
                food.foodTitle.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredFoods(filtered);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8">Food Items</h1>
            <div className="mb-6 flex justify-center">
                <input
                    type="text"
                    placeholder="Search by title..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full md:w-1/3 p-2.5"
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {filteredFoods.map((food) => (
                    <Link to={`/food-detail/${food._id}`} key={food._id}> {/* Add Link for navigation */}
                        <div
                            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 duration-500 ease-in-out"
                        >
                            <img src={food.img} alt={food.foodTitle} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h2 className="text-xl font-bold mb-2">{food.foodTitle}</h2>
                                <p className="text-gray-700 mb-4">{food.description}</p>
                                <p className="text-lg font-semibold text-blue-600 mb-2">${food.price}</p>
                                <p className="text-sm text-gray-500">Category: {food.category}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <ScrollToTopButton /> {/* Add the ScrollToTopButton */}
        </div>
    );
};

export default Home;



// https://chatgpt.com/share/66e52d10-4aa4-8008-942f-63860b366720