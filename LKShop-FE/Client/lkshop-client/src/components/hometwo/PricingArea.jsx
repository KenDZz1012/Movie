import React, { useState } from 'react'
import { useEffect } from 'react'
import { Link, useHistory } from "react-router-dom";
import { getListBundle } from '../../helpers/app-backend/bundle-backend-helper'
import { payment } from '../../helpers/app-backend/pay-backend-helper'
const PricingArea = () => {
  const history = useHistory()
  const [filter, setrFilter] = useState({})
  const [listBundle, setListBundle] = useState([])

  const fetchListBundle = async () => {
    await getListBundle(filter).then(res => {
      setListBundle(res.data)
    })
  }

  const onClickBuy = async (bundle) => {
    const dataPay = {
      BundleId: bundle._id,
      BundleName: bundle.BundleName,
      Price: bundle.Price,
      ClientId: JSON.parse(localStorage.getItem("LKCLientInfo"))._id
    }
    await payment(dataPay).then(res =>
      window.location.replace(res)
      // console.log(res)
    )
  }


  useEffect(() => {
    fetchListBundle()
  }, [])

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
                        <h3>{item.Price}$</h3>
                        <span>Monthly</span>
                      </div>
                    </div>
                    <div className="pricing-list">
                      <ul>
                        {item.Description.split(',').map(elem => (
                          <li className="quality"><i className="fas fa-check" /> {elem}</li>

                        ))}
                      </ul>
                    </div>
                    <div className="pricing-btn">
                      <a onClick={() => { onClickBuy(item) }} className="btn">Buy Now</a>
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