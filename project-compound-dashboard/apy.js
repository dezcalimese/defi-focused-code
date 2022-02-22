import Compound from '@compound-finance/compound-js';
import { cToken } from '@compound-finance/compound-js/dist/nodejs/api';

const provider = 'https://mainnet.infura.io/v3/1185f4d548234765ad296d48da05cacc';

const comptroller = Compound.util.getAddress(Compound.Comptroller);
const opf = Compound.util.getAddress(Compound.PriceFeed);

const cTokenDecimals = 8;
const blocksPerDay = 4 * 60 * 24;
const daysPerYear = 365;
const ethMantissa = Math.pow(10, 18);

async function calculateSupplyApy(cToken) {
   const supplyRatePerBlock = await Compound.eth.read(
      cToken,
      'function supplyRatePerBlock() returns(uint)',
      [],
      { provider }
   );

   return (Math.pow((supplyRatePerBlock / ethMantissa* blocksPerDay) + 1, daysPerYear - 1) -1);
}

async function calculateCompApy(cToken, ticker, underlyingDecimals) {
   let compSpeed = await Compound.eth.read(
      comptroller,
      'function compSpeeds(address cToken) public view returns(uint)',
      [ cToken ],
      { provider }
   );

   let compPrice = await Compound.eth.read(
      opf,
      'function price(string memory symbol) external view returns(uint)',
      [ Compound.COMP ],
      { provider }
   );

   let underlyingPrice = await Compound.eth.read(
      opf,
      'function price(string memory symbol) external view returns(uint)',
      [ ticker ],
      { provider }
   );

   let totalSupply = await Compound.eth.read(
      cToken,
      'function totalSupply() public view returns(uint)',
      [],
      { provider }
   );

   let exchangeRate = await Compound.eth.read(
      cToken,
      'function exchangeRateCurrent() public returns(uint)',
      [],
      { provider }
   );

   compSpeed = compSpeed / 1e18;
   compPrice = compPrice / 1e6;
   underlyingPrice = underlyingPrice / 1e6;
   exchangeRate = +exchangeRate.toString() / ethMantissa;
   totalSupply = (+totalSupply.toString() * exchangeRate * underlyingPrice / Math.pow(10, underlyingDecimals));
   const compPerDay = compSpeed * blocksPerDay;

   return 100 * (compPrice * compPerDay / totalSupply) * 365
}

async function calculateApy(cToken, ticker) {
   const underlyingDecimals = Compound.decimals[cToken.slice(1, 10)];
   const cTokenAddress = Compound.util.getAddress(cToken);
   const [supplyApy, compApy] = await Promise.all([
      calculateSupplyApy(cTokenAddress),
      calculateCompApy(cTokenAddress, ticker, underlyingDecimals)
   ]);
   return {ticker, supplyApy, compApy};
}

export default calculateApy;