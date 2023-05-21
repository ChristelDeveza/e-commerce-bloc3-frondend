import { useContext, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import '../css/Login.css';

function Login() {
  const { setIsOnline } = useContext(UserContext);
  const [password, setPassword] = useState('');
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  // Function login
  function handleSubmit(e) {
    e.preventDefault();
    // if user and password exist in database
    if (user && password) {
      axios
        .post('http://localhost:8080/login', {
          username: user,
          password,
        })
        .then((res) => {
          setIsOnline(res.data);
          localStorage.setItem('user', JSON.stringify(res.data));
        })
        .then(() => {
          navigate('/create', { replace: true });
        })
        // If error
        .catch((err) => {
          console.error(err);
        });
    } else {
      // If fields are empty
      Swal.fire(
        'Erreur de connexion',
        'Pour vous connecter, merci de renseigner votre identifiant et votre mot de passe',
        'error'
      );
    }
  }
  return (
    <div className='login'>
      <section>
        <h1 className='title-login'>ME CONNECTER</h1>
        <form onSubmit={handleSubmit} className='login-form'>
          <div className='login-box'>
            <label htmlFor='email'>E-mail :</label>

            <input
              className='login-input'
              type='text'
              id='email'
              autoComplete='off'
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
            />
            <label htmlFor='password'>Mot de passe :</label>
            <input
              className='login-input'
              type='password'
              id='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <button className='login-button' type='button' onClick={handleSubmit}>
            CONNEXION
          </button>
        </form>
      </section>
    </div>
  );
}

export default Login;
