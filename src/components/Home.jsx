import home from "../styles/Home.module.css";
import { IoMailOutline } from "react-icons/io5";
import Typewriter from "typewriter-effect";

const Home = () => {
  return (
    <div id="home_part">
      <section id="home" className={home.full_height}>
        <div className="lg:px-5 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1">
              <div className={home.homeCol}>
                <h1 className={home.intro} data-aos="fade-up">
                  <Typewriter
                    options={{
                      strings: [
                        'hi, <span class="' +
                          home.text_brand +
                          '">Dara</span> here.',
                      ],
                      autoStart: true,
                      loop: false,
                      html: true, // Enable HTML tags in strings
                      deleteSpeed: Infinity, // Keep the text visible after typing

                    }}
                  />
                </h1>
                <h2
                  className={home.subtitle}
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  i bring thoughts to reality sometimes.
                </h2>
                <p
                  className={home.description}
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  I&lsquo;m an aspiring software engineer
                  based in Nigeria. I&lsquo;m fascinated by large-scale
                  inventions and products that take things to the next level and
                  impact people&lsquo;s lives!.
                </p>
                <div data-aos="fade-up" data-aos-delay="1100">
                  <a
                    href="mailto:adebayooluwadarasimi1@gmail.com"
                    className={`${home.btn} ${home.btn_brand}`}
                  >
                    <IoMailOutline className="inline mr-1" />
                    Say Hi!
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

export default Home;
