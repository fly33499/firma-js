import { expect } from 'chai';
import { FirmaSDK } from "../sdk/FirmaSDK"
import { FirmaConfig } from "../sdk/FirmaConfig"

describe('[wallet 테스트]', () => {

	const aliceMnemonic = "ozone unfold device pave lemon potato omit insect column wise cover hint narrow large provide kidney episode clay notable milk mention dizzy muffin crazy";
	const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);;

	it('니모닉으로 생성된 지갑의 니모닉과 동일한지', async () => {
		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		expect(wallet.getMnemonic()).to.equal(aliceMnemonic);
	});

	it('privatekey로 생성된 유저의 키가 동일한지 확인', async () => {

		const privateKey = "0x15bc0d2e445ef5b13f9d3c6d227f21524fd05d5afda713d1aff1ecc8db49a62d";

		const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);;
		const privateKeyFromWallet = (await firma.Wallet.fromPrivateKey(privateKey)).getPrivateKey();

		expect(privateKeyFromWallet).to.equal(privateKey);
	});
});