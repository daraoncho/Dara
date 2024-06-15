import about from "../styles/About.module.css";

const Experience = () => {
  return (
    <div id="experience_part">
      <section id="experience" className={about.full_height}>
        <div className="lg:px-5">
          <div className="container">
            <div className="flex gap-y-5">
              {/* Experience row */}
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Experience;
