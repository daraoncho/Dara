import { FaGithub } from "react-icons/fa";
import work from "../styles/Work.module.css";
import about from "../styles/About.module.css";
import studyBud from "../assets/img/studyBuddy_bg.webp";
import meet from "../assets/img/meet_bg.webp";
import darasBG from "../assets/img/daras_bg.webp";
import csc from "../assets/img/cscTest_bg.webp";
import aioBG from "../assets/img/allInOne_bg2.webp";
import bloggy from "../assets/img/bloggy_bg.webp";
import cashludo from "../assets/img/cashludo-bg.png";
import aqg from "../assets/img/aqg-bg.png";
import snapstalgia from "../assets/img/snapstalgia.jpg";
import wordrush from "../assets/img/wordrush.png";

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

            <div className="flex flex-wrap gap-y-6 gap-x-6">
              {/* project 1 */}
              <div
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="400"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={studyBud} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>StudyBuddy</h4>
                    <p className="pb-4">
                      A platform and community with over 2500+ students that
                      helps students excel in their courses while still giving
                      them an opportunity to make money. <br /> <br />
                    </p>
                    <p>Node.js(Express.js), ReactVITE, Firebase, LLM </p>
                    <a
                      className={about.link_custom}
                      href="https://gostudybuddy.com"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/StudyBuddy"
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
                data-aos-delay="400"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={cashludo} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <br />
                    <br />
                    <h4>CashLudo</h4>
                    <p className="pb-6">
                      Having currently over 1000+ players, Play your favorite
                      Ludo game in an exciting and engaging new format with
                      friends, and other real players from all over! <br />{" "}
                      <br />
                    </p>
                    <p>Socket IO, NodeJS, ReactNative, ReactVITE</p>
                    <a
                      className={about.link_custom}
                      href="https://cashludo.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/CashLudo_"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-y-6 gap-x-6">
              {/* project 3 */}
              <div
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img
                      className="rounded-[16px]"
                      src={snapstalgia}
                      alt="snapstalgia project image"
                    />
                  </div>
                  <div className={work.card_custom_content}>
                    <h4>Snapstalgia</h4>
                    <p className="pb-4">
                      A fun, interactive web app that simulates the nostalgic
                      experience of a retro photo booth. Users can either take 3
                      photos using their device camera or upload 3 existing
                      photos to create a vintage-style photo strip. The app
                      merges the images and optional text into a single
                      downloadable image, stylized with vintage effects.
                    </p>
                    <p>Node.js, React.js, Firebase, TailwindCSS</p>
                    <a
                      className={about.link_custom}
                      href="https://snapstalgia.netlify.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/Snapstalgia_"
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
                data-aos-delay="700"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={wordrush} alt="wordrush project image" />
                  </div>
                  <div className={work.card_custom_content}>
                    <br />

                    <h4>WordRush</h4>
                    <p className="pb-4">
                      Childhood Nostalgia &quot;Name - Animals - Places - Foods -
                      Things&quot; Game.
                      <br />
                      Play live with friends as a random letter is chosen and
                      you race against the clock to fill in categories. Unique
                      answers earn more points, so bring your A-game and your
                      A-words!
                    </p>
                    <p>NodeJS(Express.js), ReactVITE, Firebase</p>
                    <a
                      className={about.link_custom}
                      href="https://word-rush-game.netlify.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/WordRush_"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-y-6 gap-x-6">
              {/* project 5 */}
              <div
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="600"
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
                      Meet is a Nigeria dating platform that allows you to find
                      and connect you with your match in just few steps. Smooth
                      and swift dynamic & interactive UI, authentication,
                      storage, chat and match systems
                    </p>
                    <p>Node.js, React.js, Firebase, TailwindCSS</p>
                    <a
                      className={about.link_custom}
                      href="https://meetproto.netlify.app"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/Meet"
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
                data-aos-delay="700"
              >
                <div
                  className={`${work.card_custom} ${about.bg_base} ${about.shadow_effect}`}
                >
                  <div className={work.card_custom_image}>
                    <img className="rounded-[16px]" src={aqg} alt="" />
                  </div>
                  <div className={work.card_custom_content}>
                    <br />

                    <h4>Automated Questions Generation (AQG)</h4>
                    <p className="pb-4">
                      An Automated Questions Generator for transforming your
                      notes into Interactive Questions. Its usage of Large
                      Language Models (LLMs) to automatically generate
                      assessment questions from raw educational content such as
                      lecture notes, textbooks, or transcripts.
                      <br />
                      <br />
                      <br />
                    </p>
                    <p>Python</p>
                    <a
                      className={about.link_custom}
                      href="https://automated-questions-generation-llm.onrender.com"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/Automated-Questions-Generation-LLM_"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-y-6 gap-x-6 mt-4">
              {/* project 3 */}
              <div
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="400"
              >
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
                      href="https://github.com/Eksu-CSC"
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
                data-aos-delay="700"
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
                    <p>ReactVite, Sanity, GraphQL</p>
                    <a
                      className={about.link_custom}
                      href="https://darascollection.com"
                    >
                      Check out
                    </a>
                    <a
                      className={`${work.card_footer} ${about.shadow_effect}`}
                      href="https://github.com/daraoncho/DarasCollection"
                    >
                      <FaGithub className={work.external_link} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-y-6 gap-x-6 mt-4">
              {/* project 5 */}
              <div
                className={work.project_card}
                data-aos="fade-up"
                data-aos-delay="400"
              >
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
                      href="https://github.com/daraoncho/Bloggy"
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
                data-aos-delay="700"
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
                    <p>ReactJS, Framer Motion</p>
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
