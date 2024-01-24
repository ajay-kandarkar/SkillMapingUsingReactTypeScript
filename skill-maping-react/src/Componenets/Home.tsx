import Footer from "./Footer";
import SliderImage from "./SliderImage";
export default function Home() {
  return (
    <>
      <SliderImage />
      <div className="container px-4 py-5" id="custom-cards">
        <h2 className="pb-2 border-bottom">Best Seller</h2>
        <div className="row row-cols-1 row-cols-lg-3 align-items-stretch g-4 py-5">
          <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: "url('Laptopimg3.jpg')" }}>
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Short little, best for used</h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="d-flex align-items-center me-3">
                    <small>Dell</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small>3d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: "url('Laptopimg3.jpg')" }}>
              <div className="d-flex flex-column h-100 p-5 pb-3 text-white text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Strong Easy to handle</h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="d-flex align-items-center me-3">
                    <small>Hp</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small>4d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card card-cover h-100 overflow-hidden text-white bg-dark rounded-5 shadow-lg" style={{ backgroundImage: "url(Hdimagebg.jpg)" }}>
              <div className="d-flex flex-column h-100 p-5 pb-3 text-shadow-1">
                <h2 className="pt-5 mt-5 mb-4 display-6 lh-1 fw-bold">Good battry and Good quality</h2>
                <ul className="d-flex list-unstyled mt-auto">
                  <li className="d-flex align-items-center me-3">
                    <small>Asus</small>
                  </li>
                  <li className="d-flex align-items-center">
                    <small>5d</small>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
