const Work = () => {
  return (
    <div>
      <section id="work">
        <div>
          <div data-aos="fade-up">
            <div>
              <h6>WORK</h6>
              <h1>My Recent Projects</h1>
            </div>
          </div>

          <div>
            {/* project 1 */}
            <div data-aos="fade-up">
              <div>
                <div>
                  <img src="" alt="" />
                </div>
                <div>
                  <h4>Leo</h4>
                  <p>
                    Portfolio with various versions. Leo is one of my very first
                    portfolio project with new features and updates added to it
                    occasionally. <br />
                  </p>
                  <p>Javascript, Bootstrap, HTML / CSS</p>
                  <a href="https://leooportfolio.netlify.app">Check out</a>
                  <a href="https://github.com/daraoncho/Leo"></a>
                </div>
              </div>
            </div>

            {/* project 2  */}
            <div data-aos="fade-up" data-aos-delay="300">
              <div>
                <div>
                  <img src="" alt="" />
                </div>
                <div>
                  <h4>AllInOne</h4>
                  <p>
                    All-In-One is a small static linktree webpage i created with
                    links to my social platforms.
                  </p>
                  <p>HTML / CSS</p>
                  <a href="https://dara-links.netlify.app">Check out</a>
                  <a href="https://github.com/daraoncho/AllInOne"></a>
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
