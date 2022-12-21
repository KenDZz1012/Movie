import * as paypal from 'paypal-rest-sdk'
paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ARyNC7vQdv3rWpCYuVaJk0zcjOr2PYz_8GfakEBSunxlw9IKnAvt01Bsg7UD9toMMnlt_TIGggPf9QI9',
    'client_secret': 'ELd2qoVFANHrFihw63J7lLY3eb6qchrrKjnryG0AZiDr-2aXyX_-Zq1Xid0ei_srSmFPtRliK3Irpzdv'
});

export default paypal