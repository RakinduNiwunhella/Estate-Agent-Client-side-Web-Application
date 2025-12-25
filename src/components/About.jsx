import "./About.css";

const About = () => {
  return (
    <section className="about">
      <p className="about-tag">ABOUT US</p>
      <h2 className="about-title">Why Choose Premier Properties</h2>

      <p className="about-desc">
        For over three decades, we've been helping people find their dream
        homes across London. Our commitment to excellence and personalized
        service sets us apart.
      </p>

      <div className="about-cards">
        <div className="about-card">
          <div className="icon-circle">

                                                          <span className="material-symbols-outlined">military_tech</span>

          </div>
          <h4>Award Winning</h4>
          <p>
            Recognized as London's leading estate agency with multiple
            industry awards.
          </p>
        </div>

        <div className="about-card">
          <div className="icon-circle">
                                              <span className="material-symbols-outlined">group</span>

          </div>
          <h4>Expert Team</h4>
          <p>
            Our dedicated professionals bring decades of combined real
            estate expertise.
          </p>
        </div>

        <div className="about-card">
          <div className="icon-circle">
                                  <span className="material-symbols-outlined">trending_up</span>

          </div>
          <h4>Market Leaders</h4>
          <p>
            Consistently achieving the highest sale prices and fastest
            transactions.
          </p>
        </div>

        <div className="about-card">
          <div className="icon-circle">
                      <span className="material-symbols-outlined">shield</span>

          </div>
          <h4>Trusted Service</h4>
          <p>
            Transparent processes and honest advice you can rely on every
            step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;