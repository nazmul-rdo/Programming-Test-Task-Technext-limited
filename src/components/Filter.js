import React, { useContext } from 'react'

import { FaSearch } from "react-icons/fa";
import { LaunchesContext } from '../App';

const Filter = () => {

  const {
    showUpcomingOnly,
    handleCheckboxChange,
    searchQuery,
    setSearchQuery,
    launchStatusFilter,
    setLaunchStatusFilter,
    launchDateFilter,
    handleLaunchDateFilterChange } = useContext(LaunchesContext);


  return (
    <div>

      <div className="d-flex justify-content-end m-4">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            checked={showUpcomingOnly}
            onChange={handleCheckboxChange}
          />
          <label className="form-check-label" for="flexCheckDefault">
            Show upcoming only
          </label>
        </div>
      </div>

      <div className="row justify-content-between">
        <div className="col-12 col-sm-6 col-md-4">
          <div className="input-group">
            <input
              type="text"
              className="form-control d-flex align-items-center flex-fill search-input"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />                <button type="submit" className="btn btn-primary">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-md-6">
          <div className="row">
            <div className="col-12 col-md-6">
              <select
                className="form-select"
                aria-label="Default select example"
                value={launchStatusFilter}
                onChange={(e) => setLaunchStatusFilter(e.target.value)}
              >
                <option value="" selected={launchStatusFilter === ''}>By Launch Status</option>
                <option value="failure" selected={launchStatusFilter === 'failure'}>
                  Failure
                </option>
                <option value="success" selected={launchStatusFilter === 'success'}>
                  Success
                </option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <select
                className="form-select"
                aria-label="Default select example"
                value={launchDateFilter}
                onChange={handleLaunchDateFilterChange}
              >
                <option value="">By Launch Date</option>
                <option value="last-week">Last Week</option>
                <option value="last-month">Last Month</option>
                <option value="last-year">Last Year</option>
              </select>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Filter