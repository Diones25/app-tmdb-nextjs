const LogoFooter = "/assets/logo_footer.png";

const Footer = () => {
  return (
    <>
      <div className="bg-[#03658B] text-white mt-4">
        <div className="container">
          <div className="flex flex-col sm:flex-row items-center py-6 text-center">

            <div className="w-60 mb-3">
              <img className='' src={LogoFooter} alt="Logo" />
            </div>

            <div className="m-auto">              
              <span className='' >©Copyright {new Date().getFullYear()} Todos os direitos reservados.</span>                            
            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default Footer
