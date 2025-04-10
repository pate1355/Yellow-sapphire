import Image from "next/image";
export default function Footer() {
  return (
    <div className="bg-[#f4b860] py-20 px-8 md:px-10 flex flex-col md:flex-row justify-between items-center gap-8 ">
      <div>
        <Image
          src="/YellowSapphireIcon.png"
          alt="Yellow Sapphire Logo"
          width={30}
          height={30}
        />
      </div>

      <nav aria-label="Footer Navigation">
        <ul className="flex flex-col items-start border-l border-black pl-4 gap-4 md:gap-6">
          <li>
            <a href="./" className="text-black hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-black hover:underline">
              About Us
            </a>
          </li>
        </ul>
      </nav>

      <div className="text-left md:text-right">
        <ul className="flex md:flex-col items-start gap-4 md:gap-6">
          <li>
            <a href="#" className="text-black hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" className="text-black hover:underline">
              Terms & Conditions
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
