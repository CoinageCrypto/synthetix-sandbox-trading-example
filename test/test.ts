import hardhat, { ethers } from 'hardhat';

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

		const perpsMarketProxy = new ethers.Contract(
			outputs.imports.synthetixSandbox.imports.perpsMarket.contracts.PerpsMarketProxy.address,
			outputs.imports.synthetixSandbox.imports.perpsMarket.contracts.PerpsMarketProxy.abi,
			signer
		);

		const tx = await perpsMarketProxy['createAccount()']();

		const receipt = await tx.wait();
		for (const { event } of receipt.events) {
			if (event) {
				console.log('----------------------');
				console.log('From TypeScript: ');
				console.log(` - Got event ${event}`);
				console.log('----------------------');
			}
		}
	});
});
