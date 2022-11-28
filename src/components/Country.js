import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Link, useParams } from 'react-router-dom';
import Header from './Header';

export default function Country() {
  const [theme, setTheme] = useState('light');
  const [country, setCountry] = useState([]);
  const [borderCountry, setBorderCountry] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const {name} = useParams();
    
    useEffect(() => {
      window.scroll(0, 0);
      const fetchDataByName = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/name/${name}`
        );
        const country = await response.json()
        setCountry(country)
        setIsLoaded(true)
        country[0].borders.forEach(border => {
            return findCountry(border)
        })
        
      }
      fetchDataByName()

      const findCountry = async (border) => {
        try {
          const url = `https://restcountries.com/v2/alpha/${border}`
          const res = await fetch(url)
          const data = await res.json()
          setBorderCountry(pre => [...pre, data.name]);
        }
        catch (err) {
          console.log(err);
        }
      }
    }, [name])

    function uniqueArr(a) {
      var seen ={}
      return a.filter(item => {
        return seen.hasOwnProperty(item) ? false : (seen[item] = true)
      })
    }

  
  const handleClick = () => {
      if (theme === 'light') {
          setTheme('dark')
      }
      if (theme === 'dark') {
          setTheme('light')
      }
  }

  if (!isLoaded) {
    return (
      <Container className={`CountryDetail ${theme}`}>
      <Header theme={theme} handleClick={handleClick} />
      <Link to='/'>
        <button className='element deep-boxShadow'>
        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"></path></svg>
        <span>Back</span>
        </button>
      </Link>
      <div className='loading'>Loading...</div>
      </Container>
    )
  } else {
    return (
      <Container className={`${theme}`}>
        <Header theme={theme} handleClick={handleClick} />
        <Link className='back' to='/'>
          <button className='element deep-boxShadow'>
          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 010 .708L5.707 8l5.647 5.646a.5.5 0 01-.708.708l-6-6a.5.5 0 010-.708l6-6a.5.5 0 01.708 0z" clip-rule="evenodd"></path></svg>
          <span>Back</span>
          </button>
        </Link>
        
        <section>
          {country.map(c => (
            <div className='details' key={c.name}>
              <img className='boxShadow' src={c.flags.png} alt={c.name} />
              <article>
                <h2>{c.name}</h2>
                <div className='detailed-info'>
                <div>
                <p>Native Name: <span>{c.nativeName}</span></p>
                <p>Population: <span>{c.population.toLocaleString()}</span></p>
                <p>Region: <span>{c.region}</span></p>
                <p>Sub Region: <span>{c.subregion}</span></p>
                {c.capital ?
                (<p>Capital: <span>{c.capital}</span></p>)
                : ''
                }
                </div>
                <div>
                <p>Top Level Domain: <span>{c.topLevelDomain}</span></p>
                {c.currencies ?
                (<p>Currencies: <span>{c.currencies.map(cur => cur.name).join(', ')}</span></p>)
                : ''}
                {c.languages ?
                (<p>Languages: <span>{c.languages.map(lang => lang.name).join(', ')}</span></p>)
                : ''}
                </div>
                </div>
                {borderCountry?.length ? 
                (<div className='border-countries'>
                    <h3>Border Countries:</h3>
                    <div className='borders'>
                    {uniqueArr(borderCountry).map((border, index) => ( 
                      <Link to={`/country/${border}`} key={index}>
                      <button className='element boxShadow'>
                          {border}
                      </button>
                      </Link>
                      ))
                    }
                    </div>
                  </div>) 
                  : ''}
              </article>
            </div>
          ))}
        </section>
        
      </Container>
    )
  }

  
}

const Container = styled.div`
  padding: 5rem 0;
  .Header {
    font-size: 13px;
  }
  .loading {
    margin-left: 10%;
  }
  a {
    button {
    margin: 3.5rem 10% 4.5rem;
    height: 2.6rem;
    width: 30%;
    border: none;
    gap: 0.7rem;
  }
  }
  section {
    .details {
      margin: 10%;
      img {
        width: 100%;
      }
      article {
        padding: 2rem 0;
        h2 {
          margin-bottom: 1rem;
        }
        div {
          display: flex;
          flex-direction: column;
          margin-bottom: 2.2rem;
          gap: 0.5rem;
          p {
            font-weight: 600;
            span {
              font-weight: 300;
            }
          }
          h3 {
            font-size: 1.1rem;
            font-weight: 600;
          }
          div.borders {
            margin-top: 0.4rem;
            display: flex;
            flex-direction: row;
            align-items: center;
            flex-wrap: wrap;
            width: 100%;
            gap: 0.5rem;
            a {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 30%;
              button {
                margin: 0.2rem 0;
                width: 100%;
                height: 2rem;
                border-radius: 0.2rem;
              }
            }
            
          }

        }
      }
    }
  }

  @media (min-width: 760px) {
    .Header {
      font-size: 14px;
    }
  }

  @media (min-width: 1400px) {
    .Header {
      font-size: 15px;
    }
    .loading {
    margin-left: 5%;
    }
    a {
      button {
        margin: 6rem 5% 3rem;
        height: 2.6rem;
        width: 8%;
      }
    }
    section {
      .details {
        margin: 5%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        img {
          width: 40%;
        }
      article {
        padding: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 2rem;
        width: 50%;
        h2 {
          margin-bottom: 0;
        }
        .detailed-info {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          div {
          margin-bottom: 0;
          gap: 1rem;
          }
          div:nth-child(1) {
            width: 40%;
          }
          div:nth-child(2) {
            width: 50%;
          }
        }

        .border-countries {
          display: flex;
          flex-direction: row;
          justify-content: flex-start;
          gap: 0.5rem;
          h3 {
            width: 20%;
          }
          div.borders {
            margin-top: 0;
            width: 80%;
            gap: 0.9rem;
            a {
              width: 23%;
              button {
                margin: 0;
              }
            }
        }

        
            
          }


        
      }
    }
  }
  }
`