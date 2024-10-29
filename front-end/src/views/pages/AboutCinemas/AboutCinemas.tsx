import React from 'react';
import './about-cinemas.scss';

const AboutCinemas: React.FC = () => {
  return (
   <section> <section className='about-cinemas-container'>
      <h1 className='about-cinemas-title'>Våra biografer</h1>
      <p className='about-cinemas-text'>Monsterbio har två salonger där båda har laserprojektorer,
		vägg-till-vägg-biodukar och omslutande ljud från Dolby Atmos. Båda salongerna har lyxigt bekväma
		och ställbara reclinerfåtöljer på samtliga rader. Våra specialdesignade säten är ergonomiska
		och klädda i högkvalitativt material, vilket garanterar att du är bekväm under hela filmen
		– även när du hoppar till av skräck!<br/>
		<br/>
		Vår större salong är den populära 4DX-salongen som med 19 effekter tar bioupplevelsen till
		helt nya nivåer och är även utrustad med är utrustad med ett avancerat IMAX-ljudsystem som
		omger dig med skrämmande ljud och effektfulla ljudeffekter. Från det dova mummel av monster
		till de plötsliga skriken, varje ljud känns verkligt.<br/></p>
		<h2 className='about-cinemas-title-two'>Hösten 2025 öppnar vi två nya biografer: </h2>
    </section>
	<section className='about-cinemas-cinemas'>
		<article className='about-cinemas-links'>
			<a href="https://shorturl.at/JUsVh">Ullricehamn</a>
		</article>
		<article className='about-cinemas-links'>
			<a href="https://shorturl.at/gVgB9">Uddevalla</a>
		</article>
	</section>
	</section>
  );
};

export default AboutCinemas;