import { expect } from 'chai';
import { FirmaSDK } from "../sdk/FirmaSDK"
import { FirmaConfig } from "../sdk/FirmaConfig"

describe('[feegrant Tx 테스트]', () => {

	const aliceMnemonic = "ozone unfold device pave lemon potato omit insect column wise cover hint narrow large provide kidney episode clay notable milk mention dizzy muffin crazy";
	const bobMnemonic = "burst torch enemy quick crime slogan trust wood hamster way armor visual common language close park leg ill ball board couch nose theory must";

	const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);

	//alice: firma1wa3u4knw74r598quvzydvca42qsmk6jrvgqn7y
	//bob: firma1skc6cpuwnqr6m3ee68pdhwl29qwx2r98kxnn0u

	it('feegrant GrantPeriodicAllowance tx', async () => {

		const aliceWallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const bobWallet = await firma.Wallet.fromMnemonic(bobMnemonic);

		const spendLimit = 200000;
		const expirationDate = new Date();
		expirationDate.setMinutes(expirationDate.getMinutes() + 2);

		let periodicAllowanceData = {
			// basicSpendLimit: undefined,
			// basicExpiration: undefined,
			periodSeconds: 30,
			periodSpendLimit: 2000,
			periodCanSpend: 10000,
			periodReset: expirationDate
		};

		var result = await firma.FeeGrant.GrantPeriodicAllowance(aliceWallet, await bobWallet.getAddress(), periodicAllowanceData);

		expect(result.code).to.equal(0);
	});

	it('feegrant RevokeAllowanec tx1', async () => {

		const alicewallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const bobWallet = await firma.Wallet.fromMnemonic(bobMnemonic);

		var result = await firma.FeeGrant.RevokeAllowance(alicewallet, await bobWallet.getAddress());
		//console.log(result);

		expect(result.code).to.equal(0);
	});


	it('feegrant GrantBasicAllowance tx', async () => {

		const aliceWallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const bobWallet = await firma.Wallet.fromMnemonic(bobMnemonic);

		// BasicAllowance 금액을 적어놓는 것과, 금액을 적지 않는 것에 따라 행위가 다르다.
		// 일단 다시 정리
		// 금액과 기간모두 적으면 제대로 동작.
		// 안 적으면 모두 무한대 급 (금액도 무한대가능, 기간도 무한대가능)

		var expirationDate = new Date();
		expirationDate.setMonth(12);

		var spendLimit = 200000;

		//var result = await firma.FeeGrant.GrantBasicAllowance(aliceWallet, await bobWallet.getAddress(), {spendLimit : spendLimit, expiration : expirationDate});
		//var result = await firma.FeeGrant.GrantBasicAllowance(aliceWallet, await bobWallet.getAddress(), {expiration : expirationDate});
		//var result = await firma.FeeGrant.GrantBasicAllowance(aliceWallet, await bobWallet.getAddress(), {spendLimit : spendLimit});
		var result = await firma.FeeGrant.GrantBasicAllowance(aliceWallet, await bobWallet.getAddress());

		expect(result.code).to.equal(0);
	});

	it('feegrant send tx', async () => {

		const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);

		const alicewallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const bobWallet = await firma.Wallet.fromMnemonic(bobMnemonic);
		const amount = 1;

		var result = await firma.Bank.send(bobWallet, await alicewallet.getAddress(), amount, { feeGranter: await alicewallet.getAddress() });
		// console.log(result);

		expect(result.code).to.equal(0);
	});


	it('feegrant RevokeAllowance tx', async () => {

		const alicewallet = await firma.Wallet.fromMnemonic(aliceMnemonic);
		const bobWallet = await firma.Wallet.fromMnemonic(bobMnemonic);

		var result = await firma.FeeGrant.RevokeAllowance(alicewallet, await bobWallet.getAddress());
		//console.log(result);

		expect(result.code).to.equal(0);
	});
});