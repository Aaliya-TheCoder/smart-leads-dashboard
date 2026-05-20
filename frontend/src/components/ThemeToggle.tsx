const ThemeToggle = () => {

  const toggleTheme = () => {

    document.documentElement
      .classList.toggle("dark");
  };

  return (

    <button
      onClick={toggleTheme}

      className="bg-gray-800 text-white px-4 py-2 rounded"
    >
      Toggle Dark Mode
    </button>
  );
};

export default ThemeToggle;