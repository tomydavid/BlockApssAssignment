let api =  require('./blockchain_api'),
    web3 = api.web3;
    LotteryContract = api.LotteryContract,

exports.main = (req, res) => {


    LotteryContract.methods.get_remaining_tickets().call()
        .then(remaining_tickets => {

            bought = !!req.query.bought;

            console.log('hello yes these are the remaining tickets' + remaining_tickets);
                let choose = remaining_tickets == 1

                res.render('index', {
                    title: 'Main',
                    layout: 'main',
                    tickets: remaining_tickets,
                    choose: choose
                });


        })
};



exports.buy_ticket = (req,res,next) =>{

    LotteryContract.methods.buy_ticket().send({from: web3.eth.defaultAccount}, (error, transactionHash) => {
        if(!error){
            console.log('hi yes i bought a ticket'+transactionHash);
            res.redirect('/?bought=true')
        }else{
            console.log(error)
        }
    });
};



exports.choose = (req,res,next)=>{

    LotteryContract.methods.buy_ticket().send({from: web3.eth.defaultAccount}, (error, transactionHash) => {
        if(!error){
            console.log('hi yes i bought a ticket'+transactionHash);
            LotteryContract.methods.get_winner()
                .call()
                .then(winner => {
                    console.log('hello yes this is the winner' + JSON.stringify(winner[0]));
                    res.render('index', {
                        title: 'Main',
                        layout: 'main',
                        winner: winner[0],
                    });

                })
        }else{
            console.log(error)
        }
    });


}

exports.get_addresses = (req,res,next) =>{
    LotteryContract.methods.get_addresses()
        .call()
        .then(addresses => {

            console.log('hi yes these are the addresses'+addresses);
            res.render('index', {
                title: 'Main',
                layout: 'main',
                addresses : addresses
            });

        })

        .catch(error => console.log(error))
};
