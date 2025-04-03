import Image from "next/image";

const companies = [
  {
    name: "Instagram",
    logo: "https://cdn.brandfetch.io/instagram.com/w/60/h/60/theme/light/symbol?c=1idS9I3BEiXg9luR6HD",
    jobs: 8,
  },
  {
    name: "Tesla",
    logo: "https://cdn.brandfetch.io/tesla.com/w/60/h/60?c=1idS9I3BEiXg9luR6HD",
    jobs: 18,
  },
  {
    name: "McDonald's",
    logo: "https://cdn.brandfetch.io/mcdonalds.com/w/60/h/60?c=1idS9I3BEiXg9luR6HD",
    jobs: 12,
  },
  {
    name: "Apple",
    logo: "https://cdn.brandfetch.io/apple.com/w/60/h/60?c=1idS9I3BEiXg9luR6HD",
    jobs: 9,
  },
];

const TopCompanies = () => {
  return (
    <div className="bg-[#fef6e4] py-10">
      <h2 className="text-center text-3xl text-black font-bold mb-6">
        Top Company
      </h2>
      <div className="flex justify-center gap-6 flex-wrap">
        {companies.map((company, index) => (
          <div
            key={index}
            className="bg-white p-14 rounded-2xl shadow-md flex flex-col items-center w-60 text-center"
          >
            <img
              src={company.logo}
              alt={company.name + " Icon"}
              width={60}
              height={60}
            />
            <h3 className="text-xl font-semibold text-black mt-2">
              {company.name}
            </h3>
            <p className="bg-black text-white px-4 py-1 rounded-lg mt-2">
              {company.jobs} open jobs
            </p>
            <button
              onClick={() => console.log("Apply Now")}
              className="mt-3 bg-[#FFBD59] text-black font-semibold px-4 py-2 rounded-lg"
            >
              APPLY NOW
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCompanies;