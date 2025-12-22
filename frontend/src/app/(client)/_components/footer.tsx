import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full bg-[#18181B] mt-auto">
      <div className="w-full bg-[#EF4444] py-4 overflow-hidden">
        <div className="flex animate-scroll whitespace-nowrap">
          {[...Array(10)].map((_, i) => (
            <span
              key={i}
              className="text-white font-semibold text-lg mx-8 inline-block"
            >
              Fresh fast delivered
            </span>
          ))}
        </div>
      </div>

      <div className="w-full max-w-[1264px] mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-3">
            <div className="flex gap-3 items-center">
              <img
                src="/misc/logo.svg"
                alt="logo"
                className="w-11.5 h-[37.29px]"
              />
              <div>
                <div className="flex">
                  <h1 className="text-white text-[20px] font-semibold leading-7">
                    Nom
                  </h1>
                  <h1 className="text-[#EF4444] text-[20px] font-semibold leading-7">
                    Nom
                  </h1>
                </div>
                <h1 className="text-white text-[12px] font-normal leading-4">
                  Swift delivery
                </h1>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase">
              BUSINESS
            </h3>
            <ul className="flex flex-col gap-3 text-[#A1A1AA] text-sm">
              <li>
                <Link href="/partner" className="hover:text-white transition">
                  Become a partner
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="/delivery" className="hover:text-white transition">
                  Delivery area
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase">MENU</h3>
            <ul className="flex flex-col gap-3 text-[#A1A1AA] text-sm">
              <li>
                <Link
                  href="/appetizers"
                  className="hover:text-white transition"
                >
                  Appetizers
                </Link>
              </li>
              <li>
                <Link href="/salads" className="hover:text-white transition">
                  Salads
                </Link>
              </li>
              <li>
                <Link href="/mains" className="hover:text-white transition">
                  Mains
                </Link>
              </li>
              <li>
                <Link
                  href="/main-dishes"
                  className="hover:text-white transition"
                >
                  Main dishes
                </Link>
              </li>
              <li>
                <Link href="/desserts" className="hover:text-white transition">
                  Desserts
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <h3 className="text-white font-semibold text-sm uppercase">
              FOLLOW US
            </h3>
            <ul className="flex flex-col gap-3 text-[#A1A1AA] text-sm">
              <li>
                <Link href="/side-dish" className="hover:text-white transition">
                  Side dish
                </Link>
              </li>
              <li>
                <Link href="/search" className="hover:text-white transition">
                  Search
                </Link>
              </li>
              <li>
                <Link href="/beverages" className="hover:text-white transition">
                  Beverages
                </Link>
              </li>
              <li>
                <Link href="/fish-sea" className="hover:text-white transition">
                  Fish & Sea food
                </Link>
              </li>
            </ul>
            <div className="flex gap-4 mt-2">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#A1A1AA] hover:text-white transition"
              >
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-[#27272A]">
          <div className="flex flex-wrap gap-6 text-[#71717A] text-xs">
            <Link href="/terms" className="hover:text-white transition">
              © 2022–2025 All locations.com
            </Link>
            <Link href="/privacy" className="hover:text-white transition">
              Privacy policy
            </Link>
            <Link
              href="/terms-of-service"
              className="hover:text-white transition"
            >
              Terms of services
            </Link>
            <Link
              href="/cookie-settings"
              className="hover:text-white transition"
            >
              Cookie Settings
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
