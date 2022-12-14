import React from 'react'
import styled from 'styled-components'

export default function Header({theme, handleClick}) {
  return (
    <Container className={`element boxShadow ${theme}`}>
          <h1>Where in the world?</h1>
          <div className='mode' onClick={handleClick}>
            {
              theme === 'light' ? 
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path fillRule="nonzero" d="M10 7a7 7 0 0 0 12 4.9v.1c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2h.1A6.979 6.979 0 0 0 10 7zm-6 5a8 8 0 0 0 15.062 3.762A9 9 0 0 1 8.238 4.938 7.999 7.999 0 0 0 4 12z"></path></g></svg>
              :
              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><g><path fill="none" d="M0 0h24v24H0z"></path><path d="M11.38 2.019a7.5 7.5 0 1 0 10.6 10.6C21.662 17.854 17.316 22 12.001 22 6.477 22 2 17.523 2 12c0-5.315 4.146-9.661 9.38-9.981z"></path></g></svg>
            }
            <p>{theme === 'light' ? 'Light Mode' : 'Dark Mode'}</p>
          </div>
    </Container>
  )
}

const Container = styled.div`
    position: fixed;  
    top: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 5%;
    width: 100%;
    h1 {
      font-size: 1.3rem;
      font-weight: 800;
    }
    .mode {
      display: flex;
      align-items: center;
      gap: 0.7rem;
      cursor: pointer;
    }
`