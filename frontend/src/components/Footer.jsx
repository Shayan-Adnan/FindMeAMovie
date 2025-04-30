import { FaGithub } from "react-icons/fa";
import {
  FaInstagram,
  FaFacebook,
  FaTiktok,
  FaYoutube,
  FaTwitter,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-gray-300 px-4 py-8 font-bebas-neue ">
      <div className="max-w-7xl mx-auto flex flex-col gap-4 text-sm">
        {/*Links & Icons */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          {/*Links of Navigation Bar*/}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start">
            {["About", "Contact"].map((item, i) => (
              <a href="#" key={i} className="hover:text-white text-sm">
                {item}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className="flex gap-4 text-gray-400 text-xl justify-center md:justify-end">
            <a
              href="https://github.com/Shayan-Adnan/FindMeAMovie"
              target="_blank"
            >
              <FaGithub className="hover:text-white cursor-pointer" />
            </a>
            <FaTwitter className="hover:text-white cursor-pointer" />
            <FaFacebook className="hover:text-white cursor-pointer" />
            <FaTiktok className="hover:text-white cursor-pointer" />
            <FaYoutube className="hover:text-white cursor-pointer" />
          </div>
        </div>

        {/* End text */}
        <p className="text-xs text-center md:text-left text-gray-400 mt-1">
          Find Me A Movie. Made by Shayan Adnan, Minhal Shah & Farrukh Iqbal.
          Film data from TMDB.
        </p>
      </div>
    </footer>
  );
}
