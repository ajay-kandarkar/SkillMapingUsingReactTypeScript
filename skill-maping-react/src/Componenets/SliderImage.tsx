function SliderImage() {
  return (
    <>              
        <div className='card'>
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              <div className="card">
              <div className="carousel-item active">
                <img src="/images/Laptopimg4.jpg" className="d-block w-100 img-fluid img-responsive" alt="hp" />
              </div>
              <div className="carousel-item">
                <img src="/images/Laptopimg2.jpg" className="d-block w-100 img-fluid img-responsive" alt="asus" />
              </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
    </>
  )
}

export default SliderImage;