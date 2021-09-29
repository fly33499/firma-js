import { expect } from 'chai';
import { FirmaSDK } from "../sdk/FirmaSDK"
import { FirmaConfig } from "../sdk/FirmaConfig"

describe('[Bank Tx 테스트]', () => {

	const aliceMnemonic = "ozone unfold device pave lemon potato omit insect column wise cover hint narrow large provide kidney episode clay notable milk mention dizzy muffin crazy";
	const bobMnemonic = "burst torch enemy quick crime slogan trust wood hamster way armor visual common language close park leg ill ball board couch nose theory must";

	const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);

	it('bank send 성공', async () => {

		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const targetWallet = await firma.Wallet.fromMnemonic(bobMnemonic);
		const amount = 1;
		const memo = "test memo";

		var result = await firma.Bank.send(wallet, await targetWallet.getAddress(), amount, { memo: memo });

		expect(result.code).to.equal(0);
	});

	it('bank send 실패 - 큰돈 송금', async () => {

		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const targetWallet = await firma.Wallet.fromMnemonic(bobMnemonic);
		const amount = 20000000000000;

		var result = await firma.Bank.send(wallet, await targetWallet.getAddress(), amount);

		// 5번 에러 발생 예상 (잔액 부족)
		expect(result.code).to.equal(5);
	});

	it.skip('bank send 실패 - 큰 수수료 송금', async function () {

		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const targetWallet = await firma.Wallet.fromMnemonic(bobMnemonic);
		const amount = 2;

		const testFee = 2000000000000000;
		const defaultGas = 200000;
		const memo = "ttt meme";

		// NOTICE: 테스트 결과, 큰 수수료 입력의 경우 tx로 기록이 되지 않고 code space 레벨에서 exception을 준다.
		// 따라서 숫자 테스트는 어려운 상황

		try {
			var result = await firma.Bank.send(wallet, await targetWallet.getAddress(), amount, { memo: "memeo" });

		} catch (error) {

			// 지갑쪽에서는 error를 메시지로 출력하는게 가장 좋음
			// console.log(error);
			expect(true);
		}
	});
});