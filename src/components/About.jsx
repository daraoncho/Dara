import about from "../styles/About.module.css";

const About = () => {
  return (
    <div id="about_part">
      <section id="about" className={about.full_height}>
        <div className="lg:px-5 px-4">
          <div className="container mx-auto">
            <div className="flex pb-4" data-aos="fade-up">
              <div className={about.aboutCol}>
                <h6 className={about.text_brand}>ABOUT</h6>
                <h1 className={about.heading}>My Education & Experience</h1>
              </div>
            </div>

            <div className="col-span-12" data-aos="fade-up" data-aos-delay="400">
              <div className={`${about.aboutMe} ${about.shadow_effect}`}>
                <h4 className={about.text_brand}>/about me</h4>
                <p className={about.description}>
                  My name is Adebayo Oluwadarasimi. I&lsquo;m currently a final year
                  <span className="font-semibold"> Computer Science</span> major at
                  <span className={about.link_custom}>
                    <a href="https://eksu.edu.ng/"> Ekiti State University</a>
                  </span>. At the same time, I am currently working as a 
                  <span className="font-semibold"> Software Development Engineer</span> at 
                  <span className={about.link_custom}>
                    <a href="https://tagdev.tech/"> TagDev Technologies</a>
                  </span>.
                </p>
                <div>
                  <p className="mb-5">
                    Here are some of the technologies I have been working with:
                  </p>
                  <ul className={about.tech_stack}>
                    <li>
                      <span className={about.bullet} data-aos="fade-up" data-aos-delay="550">▹</span>
                      <span data-aos="fade-up" data-aos-delay="600">ReactJS</span>
                    </li>
                    <li>
                      <span className={about.bullet} data-aos="fade-up" data-aos-delay="650">▹</span>
                      <span data-aos="fade-up" data-aos-delay="700">Python</span>
                    </li>
                    <li>
                      <span className={about.bullet} data-aos="fade-up" data-aos-delay="750">▹</span>
                      <span data-aos="fade-up" data-aos-delay="800">NodeJS</span>
                    </li>
                    <li>
                      <span className={about.bullet} data-aos="fade-up" data-aos-delay="850">▹</span>
                      <span data-aos="fade-up" data-aos-delay="900">Firebase</span>
                    </li>
                    <li>
                      <span className={about.bullet} data-aos="fade-up" data-aos-delay="900">▹</span>
                      <span data-aos="fade-up" data-aos-delay="950">Javascript ES6+</span>
                    </li>
                    <li>
                      <span className={about.bullet} data-aos="fade-up" data-aos-delay="950">▹</span>
                      <span data-aos="fade-up" data-aos-delay="1000">HTML & CSS</span>
                    </li>
                  </ul>
                </div>
                <p className="mt-5">
                  Outside of work, I&lsquo;m interested in following the developments of technology. 
                  I also play a lot of video games, am a huge fan of movies, and make TikToks.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
