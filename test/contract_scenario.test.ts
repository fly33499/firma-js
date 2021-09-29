import { expect } from 'chai';
import { FirmaSDK } from "../sdk/FirmaSDK"
import { FirmaConfig } from "../sdk/FirmaConfig"
import { FirmaUtil } from "../sdk/FirmaUtil"

describe('[Contract 시나리오 베이스 테스트]', () => {

	const donueMnemonic = "ozone unfold device pave lemon potato omit insect column wise cover hint narrow large provide kidney episode clay notable milk mention dizzy muffin crazy";
	const creatorMnemonic = "acid unlock clown truth proud garment work cup detect wrist trumpet intact protect mansion average west review hidden private shoulder adjust feature alley anchor";
	const signer1Mnemonic = "couch tonight jelly pond notice spring gold tornado cancel hover hill soft table can buyer already region bean mask cart gasp include change rent";
	const signer2Mnemonic = "frozen never essence submit moon night cement omit final guilt border draft caution zoo gorilla illegal notable whisper try name orange hollow maximum arrive";
	const signer3Mnemonic = "stock vapor planet van asthma upgrade scheme fuel cushion before brief knee kick lesson gun spatial protect danger they stem stay chunk critic cram";
	const signer4Mnemonic = "tomorrow hospital bottom lucky insane play concert casual truly certain antique airport safe envelope relax matter cute zone boring calm pudding eyebrow mouse spawn";

	const firma = new FirmaSDK(FirmaConfig.LocalDevNetConfig);;
	const contractHash = "0xtestcontract" + Math.round(+new Date() / 1000);

	// 가정: donue상 step-4까지 진행되어서 이제 계약서 발송을 남겨둔 상태 (addContractLog로만 사용)

	it('CreateContract 생성', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const creatorWallet = await firma.Wallet.fromMnemonic(creatorMnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "CreateContract";
		let ownerAddress = await creatorWallet.getAddress();
		let jsonString = "{\"totalOwner\":4}";

		// 계약생성자와 서명자가 있는데, 현재 기준에서는 서명자는 donue가 된다.
		// feegrant가 나오게 되면 달라질까?. 아니 그래도, 어쩔 수가 없다. 
		// 이 계약이 완료되어서 본인 소유가 되는 시점에는 직접 서명하는 것으로 할 예정 (이때 feegrant가 사용된다고 일단 봤다.)

		var result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress, jsonString);
		expect(result.code).equal(0);
	});

	it('AddSigner 생성 - 개별 tx를 만들어서', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);
		const signer2Wallet = await firma.Wallet.fromMnemonic(signer2Mnemonic);
		const signer3Wallet = await firma.Wallet.fromMnemonic(signer3Mnemonic);
		const signer4Wallet = await firma.Wallet.fromMnemonic(signer4Mnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "AddSigner";
		let ownerAddress1 = await signer1Wallet.getAddress();
		let ownerAddress2 = await signer2Wallet.getAddress();
		let ownerAddress3 = await signer3Wallet.getAddress();
		let ownerAddress4 = await signer4Wallet.getAddress();
		let jsonString = "";

		var result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress1, jsonString);
		expect(result.code).equal(0);

		result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress2, jsonString);
		expect(result.code).equal(0);

		result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress3, jsonString);
		expect(result.code).equal(0);

		result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress4, jsonString);
		expect(result.code).equal(0);

	});

	it('AddSigner 생성 - 하나의 tx에 몰아서', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);
		const signer2Wallet = await firma.Wallet.fromMnemonic(signer2Mnemonic);
		const signer3Wallet = await firma.Wallet.fromMnemonic(signer3Mnemonic);
		const signer4Wallet = await firma.Wallet.fromMnemonic(signer4Mnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "AddSigner";
		let ownerAddress1 = await signer1Wallet.getAddress();
		let ownerAddress2 = await signer2Wallet.getAddress();
		let ownerAddress3 = await signer3Wallet.getAddress();
		let ownerAddress4 = await signer4Wallet.getAddress();
		let jsonString = "";

		var msg1 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress1, jsonString);
		var msg2 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress2, jsonString);
		var msg3 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress3, jsonString);
		var msg4 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress4, jsonString);

		let result = await firma.Contract.signAndBroadcast(donueWallet, [msg1, msg2, msg3, msg4]);
		expect(result.code).equal(0);
	});

	it('SignContract 생성 - 하나의 tx에 몰아서', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);
		const signer2Wallet = await firma.Wallet.fromMnemonic(signer2Mnemonic);
		const signer3Wallet = await firma.Wallet.fromMnemonic(signer3Mnemonic);
		const signer4Wallet = await firma.Wallet.fromMnemonic(signer4Mnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "SignContract";
		let ownerAddress1 = await signer1Wallet.getAddress();
		let ownerAddress2 = await signer2Wallet.getAddress();
		let ownerAddress3 = await signer3Wallet.getAddress();
		let ownerAddress4 = await signer4Wallet.getAddress();
		let jsonString = "";

		var msg1 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress1, jsonString);
		var msg2 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress2, jsonString);
		var msg3 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress3, jsonString);
		var msg4 = await firma.Contract.getUnsignedTxAddContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress4, jsonString);

		let result = await firma.Contract.signAndBroadcast(donueWallet, [msg1, msg2, msg3, msg4]);
		expect(result.code).equal(0);
	});

	it('SignContract 생성 - 사용자들이 자기 시점에 개별적으로 서명', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);
		const signer2Wallet = await firma.Wallet.fromMnemonic(signer2Mnemonic);
		const signer3Wallet = await firma.Wallet.fromMnemonic(signer3Mnemonic);
		const signer4Wallet = await firma.Wallet.fromMnemonic(signer4Mnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "SignContract";
		let ownerAddress1 = await signer1Wallet.getAddress();
		let ownerAddress2 = await signer2Wallet.getAddress();
		let ownerAddress3 = await signer3Wallet.getAddress();
		let ownerAddress4 = await signer4Wallet.getAddress();
		let jsonString = "";

		var result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress1, jsonString);
		expect(result.code).equal(0);

		timeStamp = Math.round(+new Date() / 1000);;
		result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress2, jsonString);
		expect(result.code).equal(0);

		timeStamp = Math.round(+new Date() / 1000);;
		result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress3, jsonString);
		expect(result.code).equal(0);

		timeStamp = Math.round(+new Date() / 1000);;
		result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress4, jsonString);
		expect(result.code).equal(0);
	});

	it('RejectContract 생성 - 사용자들 중 일부가 서명 거절', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "RejectContract";
		let ownerAddress1 = await signer1Wallet.getAddress();
		let jsonString = "";

		var result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, ownerAddress1, jsonString);
		expect(result.code).equal(0);

	});

	it('DestroyContract 생성 - 서명 거절이 확인되어 계약 생성자가 계약 파기 요청', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const creatorWallet = await firma.Wallet.fromMnemonic(creatorMnemonic);
		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "DestroyContract";
		let creatorAddress = await creatorWallet.getAddress();
		let ownerAddress1 = await signer1Wallet.getAddress(); // 파기 당사자
		let jsonString = "{\"Notes\": \"" + "Reject Contract by " + ownerAddress1 + "\"" + "}";

		var result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, creatorAddress, jsonString);
		expect(result.code).equal(0);

	});

	it('CompleteContract 생성 - 모든 서명이 완료되어, 계약 생성자가 계약을 마무리 하는 과정', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);
		const creatorWallet = await firma.Wallet.fromMnemonic(creatorMnemonic);

		let timeStamp = Math.round(+new Date() / 1000);;
		let eventName = "CompleteContract";
		let creatorAddress = await creatorWallet.getAddress();

		let fileHash = await FirmaUtil.getFileHash("./test/sample/sample_contract.pdf");
		let jsonString = "{\"fileHash\": \"" + fileHash + "\"" + "}";

		var result = await firma.Contract.addContractLog(donueWallet, contractHash, timeStamp, eventName, creatorAddress, jsonString);
		expect(result.code).equal(0);

	});

	it('CryptoJS.AES.encrypt Test - CompleteContract 후, 실제 파일 해시를 기반으로 소유권을 설정하는 과정', async () => {

		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);
		const signer2Wallet = await firma.Wallet.fromMnemonic(signer2Mnemonic);
		const signer3Wallet = await firma.Wallet.fromMnemonic(signer3Mnemonic);
		const signer4Wallet = await firma.Wallet.fromMnemonic(signer4Mnemonic);

		let ipfsFileHash = "Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD";

		let encryptHash = signer1Wallet.encryptData(ipfsFileHash);
		let decryptHash = signer1Wallet.decryptData(encryptHash);

		expect(ipfsFileHash).equal(decryptHash);

		encryptHash = signer2Wallet.encryptData(ipfsFileHash);
		decryptHash = signer2Wallet.decryptData(encryptHash);
		expect(ipfsFileHash).equal(decryptHash);

		encryptHash = signer3Wallet.encryptData(ipfsFileHash);
		decryptHash = signer3Wallet.decryptData(encryptHash);
		expect(ipfsFileHash).equal(decryptHash);

		encryptHash = signer4Wallet.encryptData(ipfsFileHash);
		decryptHash = signer4Wallet.decryptData(encryptHash);
		expect(ipfsFileHash).equal(decryptHash);

	});

	it('createContractFile 생성 - CompleteContract 후, 실제 파일 해시를 기반으로 소유권을 설정. 랜덤해시생성', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);

		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);
		const signer2Wallet = await firma.Wallet.fromMnemonic(signer2Mnemonic);
		const signer3Wallet = await firma.Wallet.fromMnemonic(signer3Mnemonic);
		const signer4Wallet = await firma.Wallet.fromMnemonic(signer4Mnemonic);

		let ownerAddress1 = await signer1Wallet.getAddress();
		let ownerAddress2 = await signer2Wallet.getAddress();
		let ownerAddress3 = await signer3Wallet.getAddress();
		let ownerAddress4 = await signer4Wallet.getAddress();

		let timeStamp = Math.round(+new Date() / 1000);;
		let fileHash = await FirmaUtil.getFileHash("./test/sample/sample_contract.pdf") + timeStamp;

		//console.log("fileHash : " + fileHash);

		let ipfsHash = await firma.Ipfs.addJson(fileHash);

		// 계약서를 ipfs 상에 업로드 하고, ipfs hash값을 받아온다.
		// 그 값을 암호화 한다음, 개별 암호화 파일과 유저 매핑을 해서, jsonString에 담는다.
		let encryptHash1 = signer1Wallet.encryptData(ipfsHash);
		let encryptHash2 = signer2Wallet.encryptData(ipfsHash);
		let encryptHash3 = signer3Wallet.encryptData(ipfsHash);
		let encryptHash4 = signer4Wallet.encryptData(ipfsHash);

		var jsonData = {
			"storage": "ipfs",
			"encryptIpfsHash": [encryptHash1, encryptHash2, encryptHash3, encryptHash4]
		}

		let jsonString = JSON.stringify(jsonData);

		// 이후 유저는 꺼내올때, json에서 자기의 주소가 맞다면, 프라잇키로 꺼내오게 된다.
		// 딜레마는 NFT처럼 볼 것인가? 아니면 jsonString안의 정보만으로 충분한가 인데... NFT까지는 아닌 것 같다.
		// 왜냐하면 가지고 있는 주체가 본인이 맞는지 잘 모르겠어서이다. 본인만 가지기 보다, 같은 정보속에 소유권을 주장하는 것이 더나을 것으로 봤다.

		var result = await firma.Contract.createContractFile(donueWallet, fileHash, timeStamp, [ownerAddress1, ownerAddress2, ownerAddress3, ownerAddress4], jsonString);
		expect(result.code).equal(0);

		// 원본 진위 여부 (원본을 가진 경우)
		var contractFile = await firma.Contract.getContractFile(fileHash);
		expect(contractFile.fileHash).equal(fileHash);

		// 원본의 링크 주소를 획득해야 하는 경우
		let metaData = JSON.parse(contractFile.metaDataJsonString);

		let decryptHash1 = signer1Wallet.decryptData(metaData.encryptIpfsHash[0]);
		expect(decryptHash1).equal(ipfsHash);
		let decryptHash2 = signer2Wallet.decryptData(metaData.encryptIpfsHash[1]);
		expect(decryptHash2).equal(ipfsHash);
		let decryptHash3 = signer3Wallet.decryptData(metaData.encryptIpfsHash[2]);
		expect(decryptHash3).equal(ipfsHash);
		let decryptHash4 = signer4Wallet.decryptData(metaData.encryptIpfsHash[3]);
		expect(decryptHash4).equal(ipfsHash);

		//console.log("contract file url:" + firma.Ipfs.getURLFromHash(decryptHash1));
	});

	it('createContractFile 생성 - CompleteContract 후, 실제 파일 해시를 기반으로 소유권을 설정. 중복에러 시나리오', async () => {

		const donueWallet = await firma.Wallet.fromMnemonic(donueMnemonic);

		const signer1Wallet = await firma.Wallet.fromMnemonic(signer1Mnemonic);
		const signer2Wallet = await firma.Wallet.fromMnemonic(signer2Mnemonic);
		const signer3Wallet = await firma.Wallet.fromMnemonic(signer3Mnemonic);
		const signer4Wallet = await firma.Wallet.fromMnemonic(signer4Mnemonic);

		let ownerAddress1 = await signer1Wallet.getAddress();
		let ownerAddress2 = await signer2Wallet.getAddress();
		let ownerAddress3 = await signer3Wallet.getAddress();
		let ownerAddress4 = await signer4Wallet.getAddress();

		let timeStamp = Math.round(+new Date() / 1000);;
		let fileHash = await FirmaUtil.getFileHash("./test/sample/sample_contract.pdf");

		// 계약서를 ipfs 상에 업로드 하고, ipfs hash값을 받아온다.
		// 그 값을 암호화 한다음, 개별 암호화 파일과 유저 매핑을 해서, jsonString에 담는다.

		let ipfsFileHash = "Qmf412jQZiuVUtdgnB36FXFX7xg5V6KEbSJ4dpQuhkLyfD";
		let encryptHash1 = signer1Wallet.encryptData(ipfsFileHash);
		let encryptHash2 = signer2Wallet.encryptData(ipfsFileHash);
		let encryptHash3 = signer3Wallet.encryptData(ipfsFileHash);
		let encryptHash4 = signer4Wallet.encryptData(ipfsFileHash);

		var jsonData = {
			"storage": "ipfs",
			"encryptIpfsHash": [encryptHash1, encryptHash2, encryptHash3, encryptHash4]
		}

		let jsonString = JSON.stringify(jsonData);

		// 이후 유저는 꺼내올때, json에서 자기의 주소가 맞다면, 프라잇키로 꺼내오게 된다.
		// 딜레마는 NFT처럼 볼 것인가? 아니면 jsonString안의 정보만으로 충분한가 인데... NFT까지는 아닌 것 같다.
		// 왜냐하면 가지고 있는 주체가 본인이 맞는지 잘 모르겠어서이다. 본인만 가지기 보다, 같은 정보속에 소유권을 주장하는 것이 더나을 것으로 봤다.

		var result = await firma.Contract.createContractFile(donueWallet, fileHash, timeStamp, [ownerAddress1, ownerAddress2, ownerAddress3, ownerAddress4], jsonString);
		expect(result.code).not.equals(0);

		var contractFile = await firma.Contract.getContractFile(fileHash);
		expect(contractFile.fileHash).equal(fileHash);
	});
});