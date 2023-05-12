import photo from '../assets/photo.jpg';


function Home() {
  return (
    <div>
      <div>
        
        <h1 className='header'>BIENVENUE</h1>
        <h3  className='intro'>
          Découvrez une expérience d&apos;achat unique, où qualité et
          satisfaction se rencontrent.
        </h3>
        <h3 className='promo'>Des promotions toute l&apos;année</h3>
        <br /> <br />
        <br />
        <br />
        <br />
      </div>
      <div className='home'>
        <img className='img-home' src={photo} alt='photo' />
        <img className='img-home' src={photo} alt='photo' />
        <img className='img-home' src={photo} alt='photo' />
      </div>
    </div>
  );
}

export default Home;
