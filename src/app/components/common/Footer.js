import Image from "next/image";
export default function Footer() {
  return (
    <footer className="bg-[#f4b860] py-8 px-10 flex justify-between items-center">
      {/* Left - Logo */}
      <div>
        <Image
          src="/YellowSapphireIcon.png"
          alt="Yellow Sapphire Logo"
          width={30}
          height={30}
        />
      </div>
      {/* Middle - Navigation Links */}
      <nav aria-label="Footer Navigation">
        <ul className="flex flex-col items-start border-l border-black pl-4 space-y-2">
          <li>
            <a href="#" className="text-black hover:underline">
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
      {/* Right - Copyright & Policies */}
      <div className="text-right">
        <ul className="space-y-2">
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
    </footer>
  );
}