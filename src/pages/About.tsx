import PageHeader from "../components/PageHeader";
import AboutDetails from "../components/AboutDetails";

const About = () => {
  return (
    <div className="h-full flex flex-col">
      <PageHeader>About us</PageHeader>
      <div className="container flex flex-col my-auto">
        <AboutDetails />
      </div>
    </div>
  );
};

export default About;
