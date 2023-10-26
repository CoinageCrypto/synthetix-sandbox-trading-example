import hardhat, { ethers } from 'hardhat';
import PerpsMarketProxy from '../deployments/perpsMarket/PerpsMarketProxy.json';
import { ContractReceipt } from 'ethers';

let cannonBuildResult: any;
const cannonBuild = async () => {
	if (!cannonBuildResult) {
		cannonBuildResult = await hardhat.run('cannon:build');
	}

	return cannonBuildResult;
};

describe('Synthetix v3', async () => {
	it('Should be able to create an account via PerpsMarketProxy from a contract', async () => {
		const { signers, outputs } = await cannonBuild();
		const [signer] = signers;

		const Test = await ethers.getContractFactory('Test', signer);
		const test = await Test.deploy();
		await test.deployed();

		const tx = await test.test(
			outputs.imports.synthetixSandbox.imports.perpsMarket.contracts.PerpsMarketProxy.address
		);

		console.log(await tx.wait());
	});

	it('Should be able to create an account via PerpsMarketProxy from TypeScript', async () => {
		const { signers, outputs } = await cannonBuild();
		const [signer] = signers;

		const iface = new ethers.utils.Interface([
			'function createAccount() external returns (uint128 accountId)',
		]);

		const tx = await signer.sendTransaction({
			to: outputs.imports.synthetixSandbox.imports.perpsMarket.contracts.PerpsMarketProxy.address,
			data: iface.encodeFunctionData('createAccount'),
		});

		console.log(await tx.wait());
	});
});
