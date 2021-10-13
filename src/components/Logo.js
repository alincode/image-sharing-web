import { Link } from "react-router-dom";

export function Logo() {
  return (
    <Link className="navbar-brand" to="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        aria-hidden="true"
        className="mr-2"
        viewBox="0 0 24 24"
        focusable="false"
      >
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
        <circle cx="12" cy="13" r="4"></circle>
      </svg>
      Image Sharing
    </Link>
  );
}

export default Logo;
