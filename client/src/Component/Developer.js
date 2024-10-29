// import React from 'react';
// import '../style/developer.css';
// import yitbarek from '../image/yitbarek.png'
// const Developer = () => {
//   const developers = [
//     {
//       name: 'Telaynew Ambachew',
//       role: 'Frontend Developer',
//       description: 'Telaynew specializes in creating responsive web designs using React and CSS.',
//       email: 'telaynewambachew@gmail.com',
//     },
//     {
//       name: 'Yitbarek Mezgeb',
//       role: 'System Designer',
//       description: 'Yitbarek specializes in creating responsive web designer.',
//       email: 'telaynewambachew@gmail.com',
//       image: <img src={yitbarek} alt='yitbarek image' />,
//     },
//     {
//       name: 'Kalkidan Teferi',
//       role: 'Assistant system designer',
//       description: 'Kalkidan specializes in creating responsive web designer',
//       email: 'telaynewambachew@gmail.com',
//     },
//     {
//       name: 'Amare Nibret',
//       role: 'Backend Developer and System Administrator',
//       description: 'Amare works on building robust backend services with Node.js and MongoDB.',
//       email: 'amarenibret292@gmail.com',
//     },
//     {
//       name: 'Adoniyas Seid',
//       role: 'Full Stack Developer',
//       description: 'Adoniyas is experienced in both frontend and backend development with MERN stack.',
//       email: 'muprog4@gmail.com',
//     },
//   ];

//   return (
//     <div className="developer-container">
//       <h1 className="developer-title">Meet Our Development Team</h1>
//       <div className="developer-list">
//         {developers.map((developer, index) => (
//           <div key={index} className="developer-card">
//             <h2 className="developer-name">{developer.name}</h2>
//             <h3 className="developer-role">{developer.role}</h3>
//             <p className="developer-description">{developer.description}</p>
//             <p className="developer-email">Contact: <a href={`mailto:${developer.email}`}>{developer.email}</a></p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Developer;

import React from 'react';
import '../style/developer.css';
import yitbarek from '../image/yitbarek.png'
import telaynew from '../image/telaynew.png'
import kalkidan from '../image/kalkidan.jpg'
import amare from '../image/amare.png'
import adoniyas from '../image/adoniyas.jpg'
const Developer = () => {
  return (
    <div className="developer-container">
      <h1 className="developer-title">Meet Our Development Team</h1>
      <div className="developer-list">
        {/* Developer 1 */}
        <div className="developer-card">
        <div className='programer-img'>
        <img src={telaynew} alt="Telaynew Ambachew profile" className="developer-image" />
        </div>
          <h2 className="developer-name">Telaynew Ambachew</h2>
          <h3 className="developer-role">Frontend Developer</h3>
          <p className="developer-description">Telaynew specializes in creating responsive web designs using React and CSS.</p>
          <p className="developer-email">Mailto: <a href="mailto:telaynewambachew@gmail.com">telaynewambachew@gmail.com</a></p>
          <p className="developer-email"> Tel: +251963391736</p>
        </div>

        {/* Developer 2 */}
        <div className="developer-card">
        <div className='programer-img'>
          <img src={yitbarek} alt="Yitbarek Mezgeb profile" className="developer-image" />
          </div>
          <h2 className="developer-name">Yitbarek Mezgeb</h2>
          <h3 className="developer-role">System Designer</h3>
          <p className="developer-description">Yitbarek specializes in creating responsive web designer.</p>
          <p className="developer-email">Mailto: <a href="mailto:yitbarekmezgeb@gmail.com">yitbarekmezgeb@gmail.com</a></p>
          <p className="developer-email"> Tel: +251962840288</p>
        </div>

        {/* Developer 3 */}
        <div className="developer-card">
        <div className='programer-img'>
          <img src={kalkidan} alt="Kalkidan Teferi profile" className="developer-image" />
          </div>
          <h2 className="developer-name">Kalkidan Teferi</h2>
          <h3 className="developer-role">System Designer</h3>
          <p className="developer-description">Kalkidan specializes in creating responsive web designer.</p>
          <p className="developer-email">Mailto: <a href="mailto:kalkidanteferi@gmail.com">kalkidanteferi@gmail.com</a></p>
          <p className="developer-email"> Tel: +251948845532</p>
        </div>

        {/* Developer 4 */}
        <div className="developer-card">
          <div className='programer-img'>
          <img src={amare} alt="Amare Nibret profile" className="developer-image" />
          </div>
          <h2 className="developer-name">Amare Nibret</h2>
          <h3 className="developer-role">Backend Developer and System Administrator</h3>
          <p className="developer-description">Amare works on building robust backend services with Node.js and MongoDB.</p>
          <p className="developer-email">Mailto: <a href="mailto:amarenibret292@gmail.com">amarenibret292@gmail.com</a></p>
          <p className="developer-email"> Tel: +251942865826</p>
        </div>

        {/* Developer 5 */}
        <div className="developer-card">
        <div className='programer-img'>
          <img src={adoniyas} alt="Adoniyas Seid profile" className="developer-image" />
          </div>
          <h2 className="developer-name">Adoniyas Seid</h2>
          <h3 className="developer-role">Full Stack Developer</h3>
          <p className="developer-description">Adoniyas is experienced in both frontend and backend development with MERN stack.</p>
          <p className="developer-email">Mailto: <a href="mailto:muprog4@gmail.com">muprog4@gmail.com</a></p>
          <p className="developer-email"> Tel: +251989130478</p>
        </div>
      </div>
    </div>
  );
};

export default Developer;
