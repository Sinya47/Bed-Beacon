import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "../src/InitialScreen.css";
import logo from './logo.svg';
import App from './App';

function InitialScreen() {
  const [locationPermission, setLocationPermission] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    handleRequestLocation();
    saveOSInfo();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, handleLocationError);
    } else {
      console.log("이 브라우저는 위치 정보를 지원하지 않습니다. 다른 브라우저를 사용해주세요.");
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("사용자의 현재 위치-> 위도: " + latitude + ", 경도: " + longitude);

    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);
    setLocationPermission(true);
  };

  const handleLocationError = (error) => {
    setLocationPermission(false);
  };

  const handleRequestLocation = () => {
    getLocation();
    setLocationPermission(true);
  }

  const saveOSInfo = () => {
    const userAgent = navigator.userAgent;
    let os = "Unknown";

    if (/Windows/.test(userAgent)) {
      os = "Windows";
    } else if (/Macintosh/.test(userAgent)) {
      os = "MacOS";
    } else if (/iPhone|iPad/.test(userAgent)) {
      os = "iOS";
    } else if (/Android/.test(userAgent)) {
      os = "Android";
    } else if (/Linux/.test(userAgent)) {
      os = "Linux";
    }

    localStorage.setItem('os', os);
  };

  return (
    <div>
      {!locationPermission && <App />}
      <header className="bg-gray-800 min-h-screen flex flex-col items-center justify-center text-white text-xl">
        <div className="mb-16">
          <p className="text-8xl">Welcome to Bed-Beacon!!</p>
        </div>
        <div className="mb-16">
          <img src={logo} className="h-40 w-auto pointer-events-none animate-spin-slow" alt="logo" />
        </div>
        <p>
          위치 정보 제공에 동의하지 않을 시, 위치를 선택하는 화면으로 넘어갑니다.
        </p>
      </header>
    </div>
  );
}

export default InitialScreen;