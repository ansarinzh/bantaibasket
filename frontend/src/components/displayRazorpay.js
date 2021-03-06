import { loadScript } from '../App.js';
import { orderId } from '../screens/OrderScreen';

const __DEV__ = document.domain === "bantaibasket.com"

async function displayRazorpay(){
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')
    if(!res){
      alert('Razorpay SDK Failed')
      return
    }

    const data = await fetch('/razorpay',{ method:'POST' }).then((t) => t.json() );
    console.log(data);

    const options = {
      key: __DEV__ ? 'rzp_test_uTNWssCDLr4dDM' : 'rzp_live_mJjejLztXul8W1' ,
      amount: data.amount.toString(),
      currency: data.currency,
      order_id: data.id,
      name: "Hyperl Technologies",
      description: "Pay your bill..!!",
      image: "https://logos-download.com/wp-content/uploads/2016/09/React_logo_logotype_emblem.png",
      handler : function (response){
        let pid = response.razorpay_payment_id;
        let oid = response.razorpay_order_id;
        let sig = response.razorpay_signature;
        const dat = fetch('/api/orders/'+ orderId +'/pay/', { method:'PUT' }).then((t) => t.json() );
        console.log(dat);
      },

      // prefill: {
      //     "name": "T Kapsi",
      //     "email": "abc@x.xm",
      //     "contact": "9099999900"
      // },
      theme: {
          "color": "rgb(218, 102, 241)"
      }
  };

  const paymentObj = new window.Razorpay(options);
  paymentObj.open()
  }

  export default displayRazorpay;