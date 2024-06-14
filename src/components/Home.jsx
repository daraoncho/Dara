import home from "../styles/Home.module.css";
import { IoMailOutline } from "react-icons/io5";

const Home = () => {
  return (
    <div id="home_part">
      <div className={home.full_height}>
        <section id="home" className="lg:px-5">
          <div className="container">
            <div className="grid grid-cols-1">
              <div className={home.homeCol}>
                <h1 className={home.intro} data-aos="fade-up">
                  hi,
                  <span className={home.text_brand}>Dara </span>here.
                </h1>
                <h2 data-aos="fade-up" data-aos-delay="200">
                  i create iconic stuffs sometimes.
                </h2>
                <p data-aos="fade-up" data-aos-delay="300">
                  I&lsquo;m an aspiring software engineer and game developer
                  based in Nigeria. I have great interest in full-stack
                  development, game development, Artificial Intelligence, and
                  everything in-between.
                </p>
                <div data-aos="fade-up" data-aos-delay="600">
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
        </section>
      </div>
    </div>
  );
};

export default Home;
