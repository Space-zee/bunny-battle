import { appConfig } from '../configs/app.config';
import { Contract, ethers } from 'ethers';
// import abi from '../../../abi/battleship.json';

export const getBattleshipContract = (provider: ethers.providers.BaseProvider): Contract => {
  return new ethers.Contract(appConfig.battleshipAddress, [], provider);
};
