import { FaGithub } from "react-icons/fa";
import work from "../styles/Work.module.css";
import about from "../styles/About.module.css";
import studyBud from "../assets/img/studyBud_bg.webp";
import meet from "../assets/img/meet_bg.webp";
import darasBG from "../assets/img/daras_bg.webp";
import csc from "../assets/img/cscTest_bg.webp";
import aioBG from "../assets/img/allInOne_bg2.webp";
import bloggy from "../assets/img/bloggy_bg.webp";

const Work = () => {
  return (
    <div id="work_part">
      <section id="work" className={work.full_height}>
        <div className="lg:px-5">
          <div className="container">
            <div className="flex pb-4" data-aos="fade-up">
              <div className="lg:col-span-8">
                <h6 className={about.text_brand}>WORK</h6>
                <h1 className={about.heading}>My Recent Projects</h1>
              </div>
            </div>

            <div className="flex flex-wrap gap-y-4 gap-x-4">
              {/* project 1 */}
              <div className={work.project_card} data-aos="fade-up">
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={studyBud} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>StudyBuddy</h4>
                    <p className="pb-4">
                      A platform and community that helps students excel in
                      their courses while still giving them an opportunity to
                      make money. <br /> <br />
                    </p>
                    <p>ReactJS, Firebase, TailwindCSS, </p>
                    <a
                      className={about.link_custom}
                      href="https://schoolbuddy.netlify.app"
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
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={meet} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>Meet</h4>
                    <p className="pb-4">
                      Meet is the first official Nigeria dating platform that
                      find and connect you with your match in just few steps.
                      Smooth and swift dynamic & interactive UI, authentication,
                      storage, chat and match systems
                    </p>
                    <p>ReactVite, NodeJS, Firebase, TailwindCSS</p>
                    <a
                      className={about.link_custom}
                      href="https://meetproto.netlify.app"
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

            <div className="flex flex-wrap gap-y-4 gap-x-4 mt-4">
              {/* project 3 */}
              <div className={work.project_card} data-aos="fade-up">
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={csc} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>EKSU Departmental Website Integration</h4>
                    <p className="pb-6">
                      An application created for Ekiti State University
                      departments with a Django back-end and React front-end;
                      that allows students to be able to access all necessary
                      information and updates about their department including
                      elections and news.
                    </p>
                    <p>Python (Django), ReactVite, TailwindCSS, MongoDB</p>
                    <a
                      className={about.link_custom}
                      href="https://csctestserver.onrender.com"
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
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={darasBG} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>Daras Collection</h4>
                    <p className="pb-4">
                      The official platform and app for the popular Nigerian
                      fashion brand “Daras Collection” with the dynamic &
                      interactive UI built with React VITE, the admin panel with
                      GraphQL & Contentful and negotiation and tracking done
                      with API
                    </p>
                    <p>ReactVite, Contentful, GraphQL</p>
                    <a
                      className={about.link_custom}
                      href="https://darascollection.com"
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
            <div className="flex flex-wrap gap-y-4 gap-x-4 mt-4">
              {/* project 5 */}
              <div className={work.project_card} data-aos="fade-up">
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={bloggy} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>Bloggy</h4>
                    <p className="pb-6">
                      A personal blog website on School-Work-Life balance <br />{" "}
                      <br />
                    </p>
                    <p>Javascript, HTML / CSS</p>
                    <a
                      className={about.link_custom}
                      href="https://dara-bloggy.netlify.app"
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

              {/* project 6  */}
              <div
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={aioBG} alt="" />
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
        </div>
      </section>
    </div>
  );
};

export default Work;
