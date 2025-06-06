import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const SEOHelmet = ({ title, description, keywords }) => {
  const fullTitle = title ? `${title}` : "MediMeet";

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' https://res.cloudinary.com data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://res.cloudinary.com;" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      <meta httpEquiv="Set-Cookie" content="SameSite=Strict; Secure" />
    </Helmet>
  );
};

SEOHelmet.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
};

export default SEOHelmet;
