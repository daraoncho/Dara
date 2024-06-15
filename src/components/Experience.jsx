import about from "../styles/About.module.css";

const Experience = () => {
  return (
    <div id="experience_part">
      <section id="experience" className={about.full_height}>
        <div className="lg:px-5 px-4">
          <div className="container mx-auto">
            <div className="flex flex-col gap-y-5">
              {/* Experience row */}
              <div className={about.exp}>
                <h3
                  className={about.text_brand}
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  /experience
                </h3>
                <div className="grid lg:grid-cols-2 gap-10">
                  <a
                    href="https://hashtag.cim"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-delay="700"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Lead Engineer</h4>
                      <span className={about.text_brand}>
                        HashTag (Oct 2023 - Present)
                      </span>
                      <div className="mb-0">
                        <ul className={about.bulletList}>
                          <li>
                            Build, style, and ship high-quality websites, design
                            systems, and cross platform digital experiences for
                            a diverse array of clients using technologies such
                            as JavaScript, TypeScript, React, TailwindCSS,
                            NodeJS, Contentful, and more
                          </li>
                          <li>
                            Provide leadership within engineering department
                            through close collaboration, building tools to
                            improve developer experience, and mentorship
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://eksu.edu.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-delay="900"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Software Development Engineer</h4>
                      <span className={about.text_brand}>
                        Ekiti State University (Aug 2023 - Present)
                      </span>
                      <div className="mb-0">
                        <ul className={about.bulletList}>
                          <li>
                            Collaborated with other student designers and
                            engineers in the development, invention and
                            implementation Ekiti State University Departmental
                            websites and its integration into all the department
                            in the school system.
                          </li>
                          <li>
                            Built and delivered technical solutions according to
                            our tech supervisor requirements
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://tagdev.tech"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-delay="600"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Junior Software Developer</h4>
                      <span className={about.text_brand}>
                        TagDev Technologies (Jan 2024 - Jun 2024)
                      </span>
                      <div className="mb-0">
                        <ul className={about.bulletList}>
                          <li>
                            Developed and styled interactive web applications
                            for Estate Management App using React and
                            TailwindCSS
                          </li>
                          <li>
                            Collaborated and supported the engineers in the
                            integration of the Estate Management website into a
                            web mobile app
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
                  <a
                    href="https://cloudware.ng"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <div
                      className={`${about.aboutExp} ${about.bg_base} ${about.shadow_effect}`}
                    >
                      <h4>Junior Software D. Intern</h4>
                      <span className={about.text_brand}>
                        Cloudware Technologies (Apr 2022 - Dec 2022)
                      </span>
                      <div className="mb-0">
                        <ul className={about.bulletList}>
                          <li>
                            Collaborated with brilliant minds of the company in
                            the development of large-scale and impactful
                            products for clients, and governmental organisations
                          </li>
                          <li>
                            Contributed in the research and contributed in
                            educating and enlightening young minds on the beauty
                            of technology and its impact
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
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
