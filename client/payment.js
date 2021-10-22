var transactionGun = Gun(['https://iris.cx/gun', 'https://gun-manhattan.herokuapp.com/gun'])
        window.addEventListener('load', async () => {
          if (window.ethereum) {
            window.web3 = new Web3(ethereum);
            try {
              await ethereum.enable();
              initPayButton()
            } catch (err) {
              $('#status').html('User denied account access', err)
            }
          } else if (window.web3) {
            window.web3 = new Web3(web3.currentProvider)
            initPayButton()
          } else {
            $('#status').html('No Metamask (or other Web3 Provider) installed')
          }
        })
    
        const initPayButton = () => {
          $('.pay-button').click(() => {
            // paymentAddress is where funds will be send to
            const paymentAddress = '0x192c96bfee59158441f26101b2db1af3b07feb40'
            const amountEth = 1
    
            const pub = "tUCnBoOeXEDdvic8fHRRm2i-8abZdwvd6OZDjoK48N0.e3BFQBIfncU6J0AByxnjO9XmuWxuIQ_nb0a37lf9st0"
            const product_name = "pop"
            const product_price = 0.001
            var rand_int = Math.floor((Math.random() * 999999999) + 1);
    
    
    
    
            web3.eth.sendTransaction({
              to: paymentAddress,
              value: web3.toWei(amountEth, 'ether')
            }, (err, transactionId) => {
              if  (err) {
                console.log('Payment failed', err)
                $('#status').html('Payment failed')
                var transaction = {
                  name: product_name,
                  id: rand_int,
                  price: product_price,
                  status:"Failed"
                }
                transactionGun.get(pub).get("transactions").get(rand_int).put(transaction)
              } else {
                console.log('Payment successful', transactionId)
                $('#status').html('Payment successful')
    
                var transaction = {
                  name: product_name,
                  id: rand_int,
                  price: product_price,
                  status:"Successful"
                }
                transactionGun.get(pub).get("transactions").get(rand_int).put(transaction)
              }
            })
          })
        }
    
        function check(){
          const pub = "tUCnBoOeXEDdvic8fHRRm2i-8abZdwvd6OZDjoK48N0.e3BFQBIfncU6J0AByxnjO9XmuWxuIQ_nb0a37lf9st0"
          transactionGun.get(pub).get("transactions").map(v => {console.log(v.id)})
        }