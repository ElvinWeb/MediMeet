import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEOHelmet = ({ title, description, keywords }) => {
  const fullTitle = title ? `${title} | MediMeet` : "MediMeet";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
    </Helmet>
  );
};

SEOHelmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
};

export default SEOHelmet;
