import React, {useState} from 'react'
import styled from 'styled-components'

export default function Search() {
  const [input, setInput] = useState('');

  const countryName = document.querySelectorAll('.country-name');
  countryName.forEach((name) => {
    if(name.innerHTML.toLowerCase().includes(input.toLowerCase())) {
      name.parentElement.parentElement.style.display = 'block';
    } else {
      name.parentElement.parentElement.style.display = 'none';
    }
  })

  return (
    <Container>
      <div className='search-bar boxShadow element'>
        <svg className='search-icon' stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0 0 11.6 0l43.6-43.5a8.2 8.2 0 0 0 0-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z"></path></svg>
        <input 
          className='search'
          type='search' 
          name='search-form'
          id='search-form'
          placeholder='Seach for a country...' 
          value={input} 
          onChange={e => setInput(e.target.value)}
        />
      </div>
      
    </Container>
  )
}

const Container = styled.div`
  .search-bar {
    margin: 2rem 5%;
    height: 3.5rem;
    border-radius: 0.3rem;
    display: flex;
    gap: 0.7rem;
    align-items: center;
    padding: 0 2rem;
    svg {
      width: 1.4rem;
      height: 1.3rem;
    }
    input {
      width: 80%;
      height: 2rem;
      outline: transparent;
      border: none;
      letter-spacing: .8px;
      background-color: inherit;
    }
    input::placeholder {
      color: inherit;
      opacity: 0.8;
    }
  }

  @media (min-width: 1400px) {
    .search-bar {
      width: 35%;
      margin-top: 3rem;
    }
  }
  
`