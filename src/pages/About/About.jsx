import React from 'react';

import './About.scss';
import people from '../../media/people.jpg';

const About = () => (
  <div className="About Page">
    <div className="Title">Про басейн</div>
    <div className="Container About__container">
      <img src={people} alt="люди" />
      <div>
        <iframe
          title="video"
          width="100%"
          height="400"
          src="https://www.youtube.com/embed/TVV1B4qLDfw"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen=""
        />
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam libero odit temporibus est, cumque eum asperiores voluptate nihil voluptas architecto quis reprehenderit ad, accusantium quae non laudantium? Obcaecati, aut?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam libero odit temporibus est, cumque eum asperiores voluptate nihil voluptas architecto quis reprehenderit ad, accusantium quae non laudantium? Obcaecati, aut?
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi veniam libero odit temporibus est, cumque eum asperiores voluptate nihil voluptas architecto quis reprehenderit ad, accusantium quae non laudantium? Obcaecati, aut?
      </div>
    </div>
  </div>
);

export default About;
