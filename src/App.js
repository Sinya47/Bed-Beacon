import React, { useState } from 'react';
import { BrowserRouter as Route, Switch, Link, useNavigate } from 'react-router-dom';
import districtsByCity from './districtsByCity';
import "../src/App.css"

function App() {
  const [city, setCity] = useState('');
  const [district, setDistrict] = useState('');
  const navigate = useNavigate();

  const handleCityChange = (e) => {
    const selectedCity = e.target.value;
    setCity(selectedCity);
    setDistrict('');
  };

  const handleDistrictChange = (e) => {
    setDistrict(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('selectedCity', city);
    localStorage.setItem('selectDistrict', district);
    navigate('/search');
  };

  return (
    <div className='container mx-auto mt-8'>
      <form onSubmit={handleSubmit} className='max-x-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='city'>시 선택</label>
          <select id='city'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-done focus:shadow-outline' value={city} onChange={handleCityChange}>
            <option value="">시를 선택하세요</option>
            <option value="서울">서울</option>
            <option value="경기">경기</option>
            <option value="인천">인천</option>
          </select>
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='district'>구/시 선택</label>
          <select id='district'
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-done focus:shadow-outline' value={district} onChange={handleDistrictChange}>
            <option value="">구/시를 선택하세요</option>
            { }
            {city && districtsByCity[city].map((districtName, index) => (<option key={index} value={districtName}>{districtName}</option>))}
          </select>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' type='submit'>
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;