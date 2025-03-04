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
                        HashTag (Oct 2024 - March 2025)
                      </span>
                      <div className="mb-0">
                        <ul className={about.bulletList}>
                          <li>
                            Build, style, and ship high-quality websites, design
                            systems, and cross-platform digital experiences
                            using React, TypeScript, TailwindCSS, and Node.js.
                          </li>
                          <li>
                            Architected and implemented CMS platforms, REST
                            APIs, and CI/CD pipelines to fulfill business needs.
                          </li>
                          <li>
                            Collaborate with designers, product managers, and
                            engineers to transform creative concepts into
                            refined digital experiences.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </a>
                  {/* <a
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
                  </a> */}
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
                        TagDev Technologies (Jan 2024 - Jul 2024)
                      </span>
                      <div className="mb-0">
                        <ul className={about.bulletList}>
                          <li>
                            Developed an Estate Management App using React and
                            TailwindCSS, improving user engagement by 40%.
                          </li>
                          <li>
                            Designed interactive, responsive web applications
                            with a focus on user experience and performance
                            optimization.
                          </li>
                          <li>
                            Integrated web-to-mobile functionalities, enhancing
                            accessibility and cross-platform use.
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
                        Ekiti State University (Aug 2023 - Dec 2023)
                      </span>
                      <div className="mb-0">
                        <ul className={about.bulletList}>
                          <li>
                            Led a team of 5 student developers to develop and
                            implement departmental websites, increasing
                            efficiency by 25%.
                          </li>
                          <li>
                            Built student portals and academic resource
                            integrations, enhancing accessibility for thousands
                            of students.
                          </li>
                          <li>
                            Developed community tech solutions, providing free
                            website development for non-profits and small
                            businesses.
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
                            Contributed to the development of large-scale
                            software solutions for government and enterprise
                            clients.
                          </li>
                          <li>
                            Conducted technical research and mentorship
                            programs, educating new developers.
                          </li>
                          <li>
                            Assisted in projects that improved efficiency in
                            public sector technology adoption.
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
