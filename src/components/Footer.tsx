import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="py-10">
      <footer>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="flex items-center space-x-2 text-slate-400">
            <p>
              Made with <span className="text-red-500">❤</span> by{" "}
              <a
                href="https://www.linkedin.com/in/a-trujillo/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Adrian Trujillo
              </a>
              . All rights reserved © 2022.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
