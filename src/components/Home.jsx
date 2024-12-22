import About from "../pages/About";
import Banner from "../pages/Banner";
import Services from "../pages/Services";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";



const Home = () => {
    return (
        <>
            <Banner />
            <About />
            <Services />
            <Gallery />
            <Contact />
            {/*
            <Blogs />
            <Team />
            <Events/>
            <br /><br /> */}
        </>
    );
}

export default Home;