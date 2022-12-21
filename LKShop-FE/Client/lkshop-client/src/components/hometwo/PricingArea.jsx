import React, { useState } from 'react'
import { useEffect } from 'react'
import { getListBundle } from '../../helpers/app-backend/bundle-backend-helper'

const PricingArea = () => {
  const [filter, setrFilter] = useState({})
  const [listBundle, setListBundle] = useState([])
  const fetchListBundle = async () => {
    await getListBundle(filter).then(res => {
      setListBundle(res.data)
    })
  }

  useEffect(() => {
    fetchListBundle()
  })

  return (
    <section className="pricing-area pricing-bg" style={{ backgroundImage: 'url("img/bg/pricing_bg.jpg")' }}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="section-title title-style-three text-center mb-70">
              <span className="sub-title">our pricing plans</span>
              <h2 className="title">Our Pricing Strategy</h2>
            </div>
          </div>
        </div>
        <div className="pricing-box-wrap">

          <div className="row justify-content-center">
            {
              listBundle.map(item => (
                <div className="col-lg-4 col-md-6 col-sm-8">
                  <div className="pricing-box-item mb-30">
                    <div className="pricing-top">
                      <h6>{item.BundleName}</h6>
                      <div className="price">
                        <h3>{item.Price}</h3>
                        <span>Monthly</span>
                      </div>
                    </div>
                    <div className="pricing-list">
                      <ul>
                        <li className="quality"><i className="fas fa-check" /> Video quality <span>Good</span></li>
                        <li><i className="fas fa-check" /> Resolution <span>480p</span></li>
                        <li><i className="fas fa-check" /> Screens you can watch <span>1</span></li>
                        <li><i className="fas fa-check" /> Cancel anytime</li>
                      </ul>
                    </div>
                    <div className="pricing-btn">
                      <a href="/#" className="btn">Buy Now</a>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  )
}

export default PricingArea