import { FaGithub } from "react-icons/fa";
import work from "../styles/Work.module.css";
import about from "../styles/About.module.css";

const Work = () => {
  return (
    <div id="work_part">
      <div className={work.full_height}>
        <section id="work" className="lg:px-5">
          <div className="container">
            <div className="flex pb-4" data-aos="fade-up">
              <div className="lg:col-span-8">
                <h6 className={work.text_brand}>WORK</h6>
                <h1>My Recent Projects</h1>
              </div>
            </div>

            <div className="flex gap-y-4 gap-x-4">
              {/* project 1 */}
              <div className="md:col-span-6" data-aos="fade-up">
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src="" alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>Leo</h4>
                    <p className="pb-4">
                      Portfolio with various versions. Leo is one of my very
                      first portfolio project with new features and updates
                      added to it occasionally. <br />
                    </p>
                    <p>Javascript, Bootstrap, HTML / CSS</p>
                    <a
                      className={about.link_custom}
                      href="https://leooportfolio.netlify.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/Leo"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>

              {/* project 2  */}
              <div
                className="md:col-span-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src="" alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>AllInOne</h4>
                    <p className="pb-4">
                      All-In-One is a small static linktree webpage i created
                      with links to my social platforms.
                    </p>
                    <p>Javascript, HTML / CSS</p>
                    <a
                      className={about.link_custom}
                      href="https://dara-links.netlify.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/AllInOne"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-y-4 gap-x-4 mt-4">
              {/* project 3 */}
              <div className="md:col-span-6" data-aos="fade-up">
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src="" alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>Leo</h4>
                    <p className="pb-4">
                      Portfolio with various versions. Leo is one of my very
                      first portfolio project with new features and updates
                      added to it occasionally. <br />
                    </p>
                    <p>Javascript, Bootstrap, HTML / CSS</p>
                    <a
                      className={about.link_custom}
                      href="https://leooportfolio.netlify.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/Leo"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>

              {/* project 4  */}
              <div
                className="md:col-span-6"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src="" alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>AllInOne</h4>
                    <p className="pb-4">
                      All-In-One is a small static linktree webpage i created
                      with links to my social platforms.
                    </p>
                    <p>Javascript, HTML / CSS</p>
                    <a
                      className={about.link_custom}
                      href="https://dara-links.netlify.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/AllInOne"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Work;
