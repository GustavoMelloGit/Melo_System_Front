import useAuth from './domain/auth/hooks/useAuth'

function App(): JSX.Element {
  const { signOut } = useAuth()
  return (
    <div className='App'>
      <header className='App-header'>
        <p className='bg-red-600'>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn Rea
        </a>
        <button onClick={signOut}>Logout</button>
      </header>
    </div>
  )
}

export default App
