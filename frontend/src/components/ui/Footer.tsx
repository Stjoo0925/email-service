import React from "react";

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.018c0 4.425 2.865 8.178 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.607.069-.607 1.003.071 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.111-4.555-4.938 0-1.091.39-1.984 1.029-2.682-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026a9.564 9.564 0 0 1 2.5-.336c.849.004 1.705.115 2.5.337 1.909-1.296 2.748-1.026 2.748-1.026.545 1.376.202 2.393.1 2.646.64.698 1.028 1.59 1.028 2.682 0 3.837-2.338 4.682-4.566 4.931.359.31.678.923.678 1.861 0 1.344-.012 2.427-.012 2.756 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.018C22 6.484 17.523 2 12 2Z"
      clipRule="evenodd"
    />
  </svg>
);

const Footer: React.FC = () => {
  return (
    <footer className="mt-4 lg:w-1/2 flex items-center justify-between text-white text-sm font-bold">
      <span>
        Copyright © {new Date().getFullYear()}. stjoo0925 all rights reserved.
      </span>
      <a
        href="https://github.com/stjoo0925/email-service"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:text-gray-200"
        aria-label="GitHub Repository"
      >
        <GithubIcon />
      </a>
    </footer>
  );
};

export default Footer;
