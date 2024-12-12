import React, { useState, useEffect } from "react";
import { FiX, FiSettings, FiInfo } from "react-icons/fi";
import Cookies from "js-cookie";
import Link from "next/link";

interface Preferences {
  noodzakelijk: boolean;
  analytici: boolean;
  marketing: boolean;
  personalisatie: boolean;
}

const CookieSettings = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    noodzakelijk: true,
    analytici: false,
    marketing: false,
    personalisatie: false,
  });

  useEffect(() => {
    const cookiePreferences = Cookies.get("cookie-preferences");
    if (!cookiePreferences) {
      setIsOpen(true);
    }
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if ((e.target as HTMLDivElement).classList.contains("overlay")) {
      setIsOpen(false);
    }
  };

  const handlePreferenceChange = (key: keyof Preferences) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSavePreferences = () => {
    Cookies.set("cookie-preferences", JSON.stringify(preferences));
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 overlay flex items-center justify-center z-50 transition-opacity duration-300 mt-12"
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-settings-title"
    >
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 transform transition-transform duration-300 scale-100 animate-fade-in">
        <div className="flex justify-between items-center mb-4">
          <h2
            id="cookie-settings-title"
            className="text-xl font-semibold text-gray-800"
          >
            Cookie-instellingen
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close cookie settings"
          >
            <FiX size={24} />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            Wij gebruiken cookies om uw browse-ervaring te verbeteren en ons
            verkeer te analyseren. Selecteer hieronder uw voorkeuren.
          </p>

          <div className="space-y-4">
            {Object.entries(preferences).map(([key, value]) => (
              <div
                key={key}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <FiSettings className="text-gray-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800 capitalize">
                      {key}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {key === "noodzakelijk"
                        ? "Vereist voor basisfunctionaliteit"
                        : `${key} cookies inschakelen`}
                    </p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={value}
                    onChange={() =>
                      key !== "noodzakelijk" &&
                      handlePreferenceChange(key as keyof Preferences)
                    }
                    disabled={key === "noodzakelijk"}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <button
            onClick={handleSavePreferences}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Voorkeuren opslaan
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Alle weigeren
          </button>
          <div className="flex justify-center items-center text-sm text-gray-500 hover:text-gray-700 transition-colors cursor-pointer">
            <FiInfo className="mr-1" />
            <Link href={"/cookies"}>
              <span>Meer informatie over cookies</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookieSettings;
