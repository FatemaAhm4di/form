import RegisterForm from './components/RegisterForm';

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#506172',
      padding: '1rem'
    }}>
      <RegisterForm />
    </div>
  );
}

export default App;