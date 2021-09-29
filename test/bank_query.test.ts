import { expect } from 'chai';
import { FirmaSDK } from "../sdk/FirmaSDK"
import { FirmaConfig } from "../sdk/FirmaConfig"

describe('[bank test]', () => {

	const aliceMnemonic = "ozone unfold device pave lemon potato omit insect column wise cover hint narrow large provide kidney episode clay notable milk mention dizzy muffin crazy";
	const targetMnemonic = "burst torch enemy quick crime slogan trust wood hamster way armor visual common language close park leg ill ball board couch nose theory must";

	// bob3
	const feegrant = "cosmos1asvnux3xy0h04pk4c2855cfq3389slll7f7fp8";

	const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);;

	it('생성된 적 없는 유저의 getBalance() ', async () => {

		const wallet = await firma.Wallet.newWallet();

		var result = await firma.Bank.getBalance(await wallet.getAddress());
		expect(result).to.be.equal("0");

		var result2 = await firma.Bank.getBalance(await wallet.getAddress());
		expect(result2).to.be.equal("0");
	});

});