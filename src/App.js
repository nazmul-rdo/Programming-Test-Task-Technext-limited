
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Cards from './components/Card';
import TopBar from './components/TopBar';
import Filter from './components/Filter';
import PageNavigation from './components/PageNavigation';
import Footer from './components/Footer';

export const LaunchesContext = createContext();

function App() {

  const [launches, setLaunches] = useState([]);
  const [launchDateFilter, setLaunchDateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [launchStatusFilter, setLaunchStatusFilter] = useState('');
  const [showUpcomingOnly, setShowUpcomingOnly] = useState(false);
  const cardsPerPage = 9;

  useEffect(() => {
    const fetchLaunches = async () => {
      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches');
        const data = await response.json();
        setLaunches(data);
      } catch (error) {
        console.log('Error fetching SpaceX launches:', error);
      }
    };

    fetchLaunches();
  }, []);

  const handleLaunchDateFilterChange = (event) => {
    setLaunchDateFilter(event.target.value);
    setCurrentPage(1);
  };

  const handleCheckboxChange = (event) => {
    setShowUpcomingOnly(event.target.checked);
  };

  const filterLaunchesByDate = (launches, launchDateFilter,) => {
    if (!launchDateFilter && launchDateFilter === '') {
      return launches;
    }
    const currentDate = new Date();
    let fromDate;

    if (launchDateFilter === 'last-week') {
      fromDate = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
    } else if (launchDateFilter === 'last-month') {
      fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, currentDate.getDate());
    } else if (launchDateFilter === 'last-year') {
      fromDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), currentDate.getDate());
    }
    return launches.filter((launch) => new Date(launch.launch_date_utc) >= fromDate);
  };

  const filteredLaunches = filterLaunchesByDate(launches, launchDateFilter)
    .filter((launch) => launch.rocket.rocket_name.toLowerCase().includes(searchQuery.toLowerCase()))

    .filter((launch) => {
      if (launchStatusFilter === '') {
        return true;
      } else if (launchStatusFilter === 'failure') {
        return launch.launch_success === false && (!showUpcomingOnly || launch.upcoming);
      } else if (launchStatusFilter === 'success') {
        return launch.launch_success === true && (!showUpcomingOnly || launch.upcoming);
      } else {
        return false;
      }
    })
    .filter((launch) => showUpcomingOnly ? launch.upcoming : true);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = filteredLaunches.slice(indexOfFirstCard, indexOfLastCard);

  return (
    <BrowserRouter>

      <div className="container">

        <LaunchesContext.Provider value={{
          filteredLaunches,
          cardsPerPage,
          currentCards,
          currentPage,
          setCurrentPage,
          handleCheckboxChange,
          showUpcomingOnly,
          searchQuery,
          setSearchQuery,
          launchStatusFilter,
          setLaunchStatusFilter,
          launchDateFilter,
          handleLaunchDateFilterChange
        }}>

          <TopBar />
          <Filter />

          <Routes>
            <Route path='/' element={<Cards />} />
            <Route path='/:page' element={<Cards />} />
          </Routes>

          <PageNavigation />
          <Footer />
        </LaunchesContext.Provider>
      </div>

    </BrowserRouter>
  );
}

export default App;
