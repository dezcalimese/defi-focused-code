import { useState, useEffect } from 'react';
import getBlockchain from './ethereum.js';
import addresses from './addresses.js';
import { ethers } from 'ethers';

function App() {
  const [wallet, setWallet] = useState(undefined);
  const [dai, setDai] = useState(undefined);
  const [balanceEth, setBalanceEth] = useState(undefined);
  const [balanceDai, setBalanceDai] = useState(undefined);

  useEffect(() => {
    const init = async () => {
      const { signerAddress, wallet, dai } = await getBlockchain();
      //const balanceEth = await wallet.callStatic.getUnderlyingEthBalance();
      //const balanceDai = await wallet.getUnderlyingBalance(addresses.dai);
      setWallet(wallet);
      setDai(dai);
      //setBalanceEth(balanceEth);
      //setBalanceDai(balanceDai);
    };
    init();
  }, []);

  const depositEth = async e => {
    e.preventDefault();
    //const amount = ethers.utils.parseUnits(e.target.elements[0].value, 18);
    //const tx = await wallet.depositEth({value: amount});
    //await tx.wait();
  };

  const depositDai = async e => {
    e.preventDefault();
    //const amount = ethers.utils.parseUnits(e.target.elements[0].value, 18);
    //const recipient = e.target.elements[1].value;
    //const tx1 = await dai.approve(wallet.address, amount);
    //await tx1.wait();
    //const tx2 = await wallet.deposit(addresses.cDai, amount);
    //await tx2.wait();
  };

  const withdrawEth = async e => {
    e.preventDefault();
    //const amount = ethers.utils.parseUnits(e.target.elements[0].value, 18);
    //const tx = await wallet.withdrawEth(amount);
    //await tx.wait();
  };

  const withdrawDai = async e => {
    e.preventDefault();
    //const amount = ethers.utils.parseUnits(e.target.elements[0].value, 18);
    //const tx = await wallet.withdraw(addresses.cDai, amount);
    //await tx.wait();
  };

  if(
    typeof wallet === 'undefined'
    || typeof dai === 'undefined'
  ) {
    return 'Loading...';
  }

  return (
    <div className='container'>

      <div className='row'>
        <div className='col-sm-12'>
          <h1 className='text-center'>DeFi Wallet</h1>
          <div className="jumbotron">
            <h1 className="display-4 text-center">Automatically save your  ETH / DAI <br/>to Compound</h1>
          </div>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          <h5>ETH</h5>
          <form>
            <div className="form-group row">
              <label htmlFor="balance-eth" className="col-sm-2 col-form-label">Balance</label>
              <div className="col-sm-10">
                <input 
                  type="text" 
                  readOnly 
                  className="form-control-plaintext" 
                  id="balance-eth" 
                  value={balanceEth && balanceEth.toString()}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amount-deposit-eth" className="col-sm-2 col-form-label">Deposit</label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="amount-deposit-eth" placeholder="Amount"/>
              </div>
              <div className="col-sm-3 offset-sm-3">
                <button 
                  type="submit" 
                  className="form-control"
                  className="btn btn-primary mb-2"
                  onClick={e => depositEth(e)}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amount-withdraw-eth" className="col-sm-2 col-form-label">Withdraw</label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="amount-withdraw-eth" placeholder="Amount"/>
              </div>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="address-withdraw-eth" placeholder="Address"/>
              </div>
              <div className="col-sm-4">
                <button 
                  className="form-control"
                  className="btn btn-primary mb-2"
                  onClick={e => withdrawEth(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className='row'>
        <div className='col-sm-12'>
          <h5>DAI</h5>
          <form>
            <div className="form-group row">
              <label htmlFor="balance-dai" className="col-sm-2 col-form-label">Balance</label>
              <div className="col-sm-10">
                <input 
                  type="text" 
                  readOnly 
                  className="form-control-plaintext" 
                  id="balance-dai" 
                  value={balanceDai && balanceDai.toString()}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amount-deposit-dai" className="col-sm-2 col-form-label">Deposit</label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="amount-deposit-dai" placeholder="Amount"/>
              </div>
              <div className="col-sm-3 offset-sm-3">
                <button 
                  className="form-control"
                  className="btn btn-primary mb-2"
                  onClick={e => depositDai(e)}
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amount-withdraw-dai" className="col-sm-2 col-form-label">Withdraw</label>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="amount-withdraw-dai" placeholder="Amount"/>
              </div>
              <div className="col-sm-3">
                <input type="text" className="form-control" id="address-withdraw-dai" placeholder="Address"/>
              </div>
              <div className="col-sm-4">
                <button 
                  className="form-control"
                  className="btn btn-primary mb-2"
                  onClick={e => withdrawDai(e)}
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}

export default App;
