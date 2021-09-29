import { expect } from 'chai';
import { FirmaSDK } from "../sdk/FirmaSDK"
import { FirmaConfig } from "../sdk/FirmaConfig"

describe('[Contract Tx 테스트]', () => {

	const aliceMnemonic = "ozone unfold device pave lemon potato omit insect column wise cover hint narrow large provide kidney episode clay notable milk mention dizzy muffin crazy";
	const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);;

	it('Contract getUnsignedTxAddContractLog X 3 and signAndBroadcast', async () => {

		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);

		let contractHash = "0xsalkdjfasldkjf2";
		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "CreateContract";
		let ownerAddress = await wallet.getAddress();
		let jsonString = "{}";

		// LowLevel API는 솔직히 내부에 있는 코드로 해결이 될 것 같다. (다 할 수 있으니, 이것도 도큐먼트로 한다.)

		// 내가 제공하는 것은 그것을 더 쉽게 하기 위한 추상화된 서비스 관점이다.
		// 따라서, 도큐먼트가 2종류로 나가도 된다고 생각한다.
		// 나를 활용할 어플리케이션을 위한 것이 크다.

		// addContractLog만 여러개를 한꺼번에 보낼 수 있다고 본다. 
		// 이유는 로직과 무관하게 쌓기만 하는 것이기 때문이다.
		// 그리고 서명하는 주체가 도뉴 계정이기 때문에도 가능하다.

		var tx = await firma.Contract.getUnsignedTxAddContractLog(wallet, contractHash, timeStamp, eventName, ownerAddress, jsonString);
		var result = await firma.Contract.signAndBroadcast(wallet, [tx,tx,tx]);
		expect(result.code).equal(0);
	});

	it('Contract addContractLog', async () => {

		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);

		let contractHash = "0xsalkdjfasldkjf2";
		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "CreateContract";
		let ownerAddress = await wallet.getAddress();
		let jsonString = "{}";

		var result = await firma.Contract.addContractLog(wallet, contractHash, timeStamp, eventName, ownerAddress, jsonString, {memo: "", fee:3000, gas:200000});
		expect(result.code).equal(0);
	});

	it('Contract getUnsignedTxCreateContractFile x3 signAndBroadcast', async () => {

		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);

		let timeStamp = Math.round(+new Date() / 1000);
		let fileHash = "0xklsdjflaksjflaksjf" + timeStamp; // 렌덤생성

		let ownerAddress = await wallet.getAddress();
		let ownerList = [ownerAddress, ownerAddress];
		let jsonString = "{}";

		var tx1 = await firma.Contract.getUnsignedTxCreateContractFile(wallet, fileHash, timeStamp, ownerList, jsonString);
		var tx2 = await firma.Contract.getUnsignedTxCreateContractFile(wallet, fileHash+"a", timeStamp, ownerList, jsonString);
		var tx3 = await firma.Contract.getUnsignedTxCreateContractFile(wallet, fileHash+"b", timeStamp, ownerList, jsonString);

		// 여러개 메시지일 경우, 가스비 이슈가 해결이 안되네...

		var result = await firma.Contract.signAndBroadcast(wallet, [tx1, tx2, tx3]);
		expect(result.code).equal(0);
	});

	it('Contract createContractFile', async () => {

		const wallet = await firma.Wallet.fromMnemonic(aliceMnemonic);

		let timeStamp = Math.round(+new Date() / 1000);
		let fileHash = "0xklsdjflaksjflaksjf" + timeStamp; // 렌덤생성

		let ownerAddress = await wallet.getAddress();
		let ownerList = [ownerAddress, ownerAddress];
		let jsonString = "{}";

		var result = await firma.Contract.createContractFile(wallet, fileHash, timeStamp, ownerList, jsonString);
		expect(result.code).equal(0);
	});
});