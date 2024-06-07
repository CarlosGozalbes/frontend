import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "../../components/AppAppBar";
import { Box, Divider } from "@mui/material";
import { useState, useEffect } from "react";
import images from "../../data/images";
import "./style.css";

const handleScroll = () => {
  const scrollPos = window.scrollY;
  const slider = document.querySelector(".slider");
  const initialTransform = `translate3d(-50%,-50%,0) rotateX(0deg) rotateY(0deg) rotateZ(-120deg) `;
  const zOffset = scrollPos * 0.5;
  slider.style.transform = `${initialTransform} translateY(${zOffset}px)`;
};

const handleMouseOver = (e) => {
  e.currentTarget.style.transform =
    "rotateX(20deg) rotateY(-10deg) rotateZ(122deg) translateX(300px)";
  e.currentTarget.style.filter = "brightness(1)";
  e.currentTarget.querySelector(".overlay-text").style.opacity = "1";
};
const handleMouseOut = (e) => {
  e.currentTarget.style.transform =
    "rotateX(20deg) rotateY(-10deg) rotateZ(122deg) translateX(0px)";
  e.currentTarget.style.filter = "brightness(0.5)";
  e.currentTarget.querySelector(".overlay-text").style.opacity = "0";
};
function AboutUsPage() {
  const [mode, setMode] = useState("light");

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    document.documentElement.classList.add("htmlbody");
    document.body.classList.add("htmlbody");

    return () => {
      document.documentElement.classList.remove("htmlbody");
      document.body.classList.remove("htmlbody");
      window.removeEventListener("scroll", handleScroll)
    };
    
  }, []);
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AppAppBar mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Divider />
        <Box className="about-us-container" style={{ flex: "1" }} padding={100}>
          <div className="slider">
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img1.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img2.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img3.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img4.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img5.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img6.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img1.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img2.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img3.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img4.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img5.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img6.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img1.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img2.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img3.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
            <div
              className="card"
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <img
                style={{ objectFit: "cover", width: "400px", height: "400px" }}
                src="/imgs/carousel/img4.jpg"
                alt=""
              />
              <div className="overlay-text">
                <h4 style={{ margin: "5px" }}>hola</h4>
                <p style={{ fontSize: "14px", margin: "0 5px 0 5px" }}>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Cumque laudantium a tempore consequatur labore
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default AboutUsPage;
