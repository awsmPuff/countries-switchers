import React, { useState } from 'react'
import Search from './Search'
import Card from './Card'
import Header from './Header'
import styled from 'styled-components'


export default function Homepage() {
    const [theme, setTheme] = useState('light');

    const changeMode = () => {
        if (theme === 'light') {
            setTheme('dark')
        }
        if (theme === 'dark') {
            setTheme('light')
        }
    }
 
  return (
    <Container className={`App ${theme}`}>
      <Header theme={theme} handleClick={changeMode} />
      <div className={`container ${theme}`}>
        <Search />
        <Card />
      </div>
    </Container>
  )
}

const Container = styled.div`
  .container {
    width: 100%;
    padding: 6.25rem 0 5rem;
  }
  
`