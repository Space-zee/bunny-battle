import { appConfig } from '../configs/app.config';
import { Contract, ethers, Signer } from 'ethers';
// import abi from '../../../abi/battleship.json';

export const getBattleshipContract = (signer: Signer): Contract => {
  return new ethers.Contract(appConfig.battleshipAddress, [], signer);
};
