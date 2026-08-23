import Link from "@/components/SafeLink";
const Logo = "/assets/logo.png";

function Navbar() {
  return (
    <>
      <div className="bg-[#03658B] py-5">
        <div className="container">
          <Link href={"/"}>
            <img src={Logo} alt="Logo" />          
          </Link>
        </div>
      </div>
    </>
  )
}

export default Navbar
