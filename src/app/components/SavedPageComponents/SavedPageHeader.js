import Navbar from "../common/Navbar";

function SavedPageHeader() {
  return (
    <>
      <header className="p-3 bg-[url(/bannerBG4.jpg)] bg-cover">
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col justify-center items-center py-8 gap-6">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <h1 className="text-3xl md:text-5xl  font-bold text-[#FFBD59] transition-all duration-300">
              Saved Jobs
            </h1>
          </div>
        </section>
      </header>
    </>
  );
}

export default SavedPageHeader;
