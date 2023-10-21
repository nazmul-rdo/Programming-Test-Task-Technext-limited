import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { LaunchesContext } from '../App';

const PageNavigation = () => {
  const {
    filteredLaunches,
    currentPage,
    setCurrentPage,
    cardsPerPage,
  } = useContext(LaunchesContext);

  const totalPages = Math.ceil(filteredLaunches.length / cardsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <nav
      aria-label="Page navigation example"
      className="d-flex justify-content-center mt-4"
    >
      <ul className="pagination pagination-sm">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <Link
            onClick={() => handlePageChange(currentPage - 1)}
            className="page-link"
            to={`/${currentPage - 1}`}
            aria-label="Previous"
          >
            <span aria-hidden="true">&laquo;</span>
          </Link>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            className={`page-item ${
              currentPage === index + 1 ? 'active' : ''
            }`}
            key={index}
          >
            <Link
              className="page-link"
              to={`/${index + 1}`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Link>
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? 'disabled' : ''
          }`}
        >
          <Link
            onClick={() => handlePageChange(currentPage + 1)}
            className="page-link"
            to={`/${currentPage + 1}`}
            aria-label="Next"
          >
            <span aria-hidden="true">&raquo;</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PageNavigation;