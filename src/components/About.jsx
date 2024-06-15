import about from "../styles/About.module.css";

const About = () => {
  return (
    <div id="about_part">
      <section id="about" className={about.full_height}>
        <div className="lg:px-5">
          <div className="container">
            <div className="flex pb-4" data-aos="fade-up">
              <div className={about.aboutCol}>
                <h6 className={about.text_brand}>ABOUT</h6>
                <h1>My Education & Experience</h1>
              </div>
            </div>

            <div
              className="col-span-12"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div
                className={`${about.aboutMe} ${about.bg_base} ${about.shadow_effect}`}
              >
                <h4 className={about.text_brand}>/about me</h4>
                <p className="leading-relaxed mb-4">
                  My name is Adebayo Oluwadarasimi. I&lsquo;m currently a
                  <span className="font-semibold"> Computer Science</span> major
                  at
                  <span className={about.link_custom}>
                    <a href="https://eksu.edu.ng/"> Ekiti State University</a>
                  </span>
                  . I have great passion for building and creating things that
                  will take the world to the next level.
                </p>
                <p>
                  Here are some of the technologies i have been working with:
                  <ul className={about.tech_stack}>
                    <li>
                      <span
                        className="text-[#4abba7] pr-[5px]"
                        data-aos="fade-up"
                        data-aos-delay="550"
                      >
                        ▹
                      </span>
                      <span data-aos="fade-up" data-aos-delay="600">
                        Javascript ES6+
                      </span>
                    </li>
                    <li>
                      <span
                        className="text-[#4abba7] pr-[5px]"
                        data-aos="fade-up"
                        data-aos-delay="650"
                      >
                        ▹
                      </span>
                      <span data-aos="fade-up" data-aos-delay="700">
                        Python
                      </span>
                    </li>
                    <li>
                      <span
                        className="text-[#4abba7] pr-[5px]"
                        data-aos="fade-up"
                        data-aos-delay="750"
                      >
                        ▹
                      </span>
                      <span data-aos="fade-up" data-aos-delay="800">
                        Sass
                      </span>
                    </li>
                    <li>
                      <span
                        className="text-[#4abba7] pr-[5px]"
                        data-aos="fade-up"
                        data-aos-delay="900"
                      >
                        ▹
                      </span>
                      <span data-aos="fade-up" data-aos-delay="900">
                        HTML & CSS
                      </span>
                    </li>
                  </ul>
                </p>
                <p>
                  Outside of work, I&lsquo;m a huge fan of movies and I also
                  play a lot of video games.
                </p>
              </div>
            </div>

            {/* Experience row */}
            {/* <div className="flex gap-y-5">
              
              <div className={about.exp}>
                <h3
                  className={about.text_brand}
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  /experience
                </h3>

                <div className="flex gap-x-4 gap-y-4">
                  <div
                    className="lg:col-span-6"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Software Development Intern</h4>
                      <span className={about.text_brand}>
                        Cloudware Technologies (Jun 2022 - Present)
                      </span>
                      <p className="mb-0">
                        I&lsquo;m currently working as an intern at
                        <span className={about.link_custom}>
                          <a href="https://cloudware.ng/">
                            Cloudware Technologies
                          </a>
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                  <div
                    className="lg:col-span-6"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Software Development Intern</h4>
                      <span className={about.text_brand}>
                        Cloudware Technologies (Jun 2022 - Present)
                      </span>
                      <p className="mb-0">
                        I&lsquo;m currently working as an intern at
                        <span className={about.link_custom}>
                          <a href="https://cloudware.ng/">
                            Cloudware Technologies
                          </a>
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-4 gap-y-4 mt-4">
                  <div
                    className="lg:col-span-6"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Software Development Intern</h4>
                      <span className={about.text_brand}>
                        Cloudware Technologies (Jun 2022 - Present)
                      </span>
                      <p className="mb-0">
                        I&lsquo;m currently working as an intern at
                        <span className={about.link_custom}>
                          <a href="https://cloudware.ng/">
                            Cloudware Technologies
                          </a>
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                  <div
                    className="lg:col-span-6"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Software Development Intern</h4>
                      <span className={about.text_brand}>
                        Cloudware Technologies (Jun 2022 - Present)
                      </span>
                      <p className="mb-0">
                        I&lsquo;m currently working as an intern at
                        <span className={about.link_custom}>
                          <a href="https://cloudware.ng/">
                            Cloudware Technologies
                          </a>
                        </span>
                        .
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
