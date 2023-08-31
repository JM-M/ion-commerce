import useAbout from '../hooks/useAbout';
import PageLoader from './PageLoader';
import { serializeToHTML } from '../hooks/useSlateEditor';

const AboutDetails = () => {
  const { about = {}, aboutQuery } = useAbout();
  const { content } = about;

  if (aboutQuery.isLoading) return <PageLoader />;
  if (!content) return <div className='h-fit w-fit m-auto'>No data found</div>;
  const contentHTML = serializeToHTML(JSON.parse(content));

  return (
    <div
      className='pb-10'
      dangerouslySetInnerHTML={{ __html: contentHTML }}
    ></div>
  );
};

export default AboutDetails;
