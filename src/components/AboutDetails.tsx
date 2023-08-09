import useAbout from "../hooks/useAbout";
import PageLoader from "./PageLoader";

const AboutDetails = () => {
  const { about = {}, aboutQuery } = useAbout();
  const { text = "" } = about;

  if (aboutQuery.isLoading) return <PageLoader />;

  return <div className="mt-5 pb-10">{text}</div>;
};

export default AboutDetails;
