import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";

export default function Card() {
  const [countries, setCountries] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const regions = [
    {
      name: 'All'
    },
    {
      name: 'Africa'
    },
    {
      name: 'Americas'
    },
    {
      name: 'Asia'
    },
    {
      name: 'Europe'
    },
    {
      name: 'Oceania'
    }
  ]

  useEffect(() => {
    fetch('https://restcountries.com/v2/all')
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setCountries(data)
      setIsLoaded(true)
    })
    .catch(err => {
      console.log(err)
      setError(err)
      setIsLoaded(true)
    })
  }, [])

   async function filterByRegion(region) {
    
    if(region === 'All') {
      try {
        const res = await fetch(`https://restcountries.com/v2/all`)
        const data = await res.json()
        setCountries(data)
      }
      catch(err) {
        console.log(err)
      }
    } else {
      try {
        const res = await fetch(`https://restcountries.com/v2/region/${region}`)
        const data = await res.json()
        setCountries(data)
      }
      catch(err) {
        console.log(err)
      }
    }
  }

  const handleFilterByRegion = (e) => {
    e.preventDefault();
    filterByRegion();
  }

  if(error) {
    return <div className='error'>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <div className='loading'>Loading...</div>
  } else {
    return (
      <Container>

      <form onSubmit={handleFilterByRegion}>
        <select 
          className='element boxShadow' 
          name='filter-by-region' 
          id='filter-by-region'
          aria-label='Filter by Region'
          value={regions.name}
          onChange={e => filterByRegion(e.target.value)}
        >
        {regions.map((region, index) => (
          <option key={index} value={region.name}>
            {region.name}
          </option>
        ))}
        </select>
      </form>

      <div className='card-container'>
  
      {countries.map((country, index) => (

        <Link to={`/country/${country.name}`} key={index}>
        <div 
          className='country-card element boxShadow' 
          key={index} 
          value={country.name} 
        >
          <img src={country.flags.png} alt='flag' />
          <section>
            <h2 className='country-name'>{country.name}</h2>
            <article>
              <p>Population: <span>{country.population.toLocaleString()}</span></p>
              <p>Region: <span className='country-region'>{country.region}</span></p>
              <p>Capital: <span>{country.capital}</span></p>
            </article>
          </section>
        </div>
        </Link> 
      ))}
      </div>
      </Container>
    )
  }
  
  
}

const Container = styled.div`
  select {
    margin: 1rem 5% 0.6rem;
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-size: 1.6rem 1.5rem;
    background-position: 90% 50%;
    height: 3.5rem;
    width: 50%;
    padding: 0.7rem 2rem;
    border: none;
    outline: transparent;
    scroll-behavior: smooth;
  }
  .country-card {
    padding: 0;
    margin: 2.5rem 12%;
    border-radius: 0.3rem;
    height: 25rem;
    cursor: pointer;
    img {
      width: 100%;
      height: 48%;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
    }
    section {
      height: 52%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 1rem;
      padding: 0.3rem 1.5rem 1.5rem;
      h2 {
        font-size: 19px;
      }
      article {
        display: flex;
        flex-direction: column;
        gap: 10px;
        p {
          font-weight: 600;
          span {
            font-weight: 300;
          }
        }
      }
    }
  }

  @media (min-width: 1400px) {
    select {
      width: 20%;
      position: absolute;
      top: 8.25rem;
      right: 0;
    }
    .card-container {
      width: 90%;
      margin: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .country-card {
        margin: 30px 0;
        width: 300px;
        height: 350px;
      }
    }
}
`