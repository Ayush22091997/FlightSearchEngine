import React, { useEffect } from 'react';
import './App.css';
import { connect } from 'react-redux';
import SearchForm from './container/search-form/search-form';
import FlightsGrid from './components/flights-grid/flights-grid';

function App(props) {
  const { origin, destination, departureDate, returnDate } = props.filters || {};
  console.log(returnDate)
  return (
    <div className="App">
      <header className="App-header">
        <h2>Flight Search Engine</h2>
      </header>
      <section className="Main-container">
        <aside className="Search-section">
          <SearchForm></SearchForm>
        </aside>
        <section className="Results-section">
          {props.routes && <FlightsGrid
            flights={props.routes.onwards}
            returnFlights={props.routes.return}
            criteria={{ origin, destination, date: departureDate, returnDate: returnDate }}
          ></FlightsGrid>}
        </section>
      </section>

    </div>
  );
}

const mapStateToProps = (state) => ({
  flights: state.flights,
  routes: state.routes,
  filters: state.filters
})



export default connect(mapStateToProps)(App)

